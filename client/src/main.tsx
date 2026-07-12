import { createRoot } from "react-dom/client";
import { MockAuthProvider } from "./lib/mock-auth";
import { AuthContextProvider } from "./features/context/auth-context";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { store } from "./features/store/store";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <MockAuthProvider>
    <AuthContextProvider>
      <Provider store={store}>
        <GoogleOAuthProvider
          clientId={import.meta.env.VITE_APP_GOOGLE_OAUTH_CLIENT_ID}
        >
          <App />
        </GoogleOAuthProvider>
      </Provider>
    </AuthContextProvider>
  </MockAuthProvider>,
);
