import { createContext, useContext, useState, ReactNode } from "react";
import { MOCK_USER } from "./mock-data";

interface AuthState {
  isSignedIn: boolean;
  user: typeof MOCK_USER | null;
  signIn: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthState>({
  isSignedIn: false,
  user: null,
  signIn: () => {},
  signOut: () => {},
});

export function MockAuthProvider({ children }: { children: ReactNode }) {
  const [isSignedIn, setIsSignedIn] = useState(false);

  function signIn() { setIsSignedIn(true); }
  function signOut() { setIsSignedIn(false); }

  return (
    <AuthContext.Provider value={{ isSignedIn, user: isSignedIn ? MOCK_USER : null, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
