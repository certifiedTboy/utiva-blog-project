import { createContext, useContext, useState } from "react";
import dummyProfile from "@/assets/dummy-profile.png";
import type { User } from "@/lib/types";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  checkUserIsAuthenticated: (userData: User) => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  checkUserIsAuthenticated: () => {},
});

export const AuthContextProvider = ({ children }: React.PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const checkUserIsAuthenticated = (userData: User) => {
    if (localStorage.getItem("isAuthenticated")) {
      setIsAuthenticated(true);
      setUser({ ...userData, picture: userData?.picture || dummyProfile });
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const value = {
    isAuthenticated,
    user,
    checkUserIsAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
