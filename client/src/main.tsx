import { createRoot } from "react-dom/client";
import { MockAuthProvider } from "./lib/mock-auth";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <MockAuthProvider>
    <App />
  </MockAuthProvider>
);
