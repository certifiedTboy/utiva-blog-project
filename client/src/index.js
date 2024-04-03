import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { store } from "./store/store";

import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));

let GOOGLE_CLIENT_ID;

if (process.env.NODE_ENV === "development") {
  GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_DEV_OAUTH_CLIENT_ID;
} else {
  GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_PROD_OAUTH_CLIENT_ID;
}

root.render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
