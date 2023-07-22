import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import AboutPage from "../../pages/AboutPage";
import ErrorPage from "../../pages/ErrorPage";
import AllBlogPage from "../../pages/AllBlogPage";
import AuthPage from "../../pages/AuthPage";
import ProfilePage from "../../pages/ProfilePage";
import Login from "../auth/Login";
import Register from "../auth/Register";
import SetPassword from "../auth/SetPassword";

const GeneralRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<ErrorPage />} />
      <Route path="/" element={<Navigate to="/home" replace={true} />} exact />
      <Route path="/home" element={<HomePage />} />
      <Route path="/get-started" element={<AuthPage />}>
        <Route path="sign-up" element={<Register />} />
        <Route path="sign-in" element={<Login />} />
        <Route
          path="auth/account/verify/:verificationData"
          element={<SetPassword />}
        />
      </Route>

      <Route path="/about" element={<AboutPage />} />
      <Route path="/blogs" element={<AllBlogPage />} />
      <Route path="/w-d/:username" element={<ProfilePage />} />
    </Routes>
  );
};

export default GeneralRoutes;
