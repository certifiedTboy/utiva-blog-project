import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ProtectedRoutes, AdminProtectedRoutes } from "./ProtectedRoutes";
import HomePage from "../../pages/HomePage";
import AboutPage from "../../pages/AboutPage";
import ErrorPage from "../../pages/ErrorPage";
import AllBlogPage from "../../pages/AllBlogPage";
import AuthPage from "../../pages/AuthPage";
import ProfilePage from "../../pages/ProfilePage";
import SingleBlogPage from "../../pages/SingleBlogPage";
import Login from "../auth/Login";
import Register from "../auth/Register";
import SetPassword from "../auth/SetPassword";
import RequestResetPassword from "../auth/RequestResetPassword";
import SetNewRequestPassword from "../auth/SetNewRequestPassword";
import PostBuilderPage from "../../pages/PostBuilderPage";
import AdminPage from "../../pages/AdminPage";

const GeneralRoutes = () => {
  const { user } = useSelector((state) => state.userState);

  return (
    <Routes>
      <Route path="*" element={<ErrorPage />} />
      <Route path="/" element={<Navigate to="/home" replace={true} />} exact />
      <Route path="/home" element={<HomePage />} />
      <Route path="/get-started" element={<AuthPage />}>
        <Route path="sign-up" element={<Register />} />
        <Route path="sign-in" element={<Login />} />
        <Route path="reset-password" element={<RequestResetPassword />} />
        <Route
          path="auth/account/verify/:verificationData"
          element={<SetPassword />}
        />
        <Route
          path="auth/account/reset-password/:passwordResetData"
          element={<SetNewRequestPassword />}
        />
      </Route>
      <Route path="/about" element={<AboutPage />} />
      <Route path="/blogs" element={<AllBlogPage />} />
      <Route path="/w-d/:username" element={<ProfilePage />} />
      <Route path="/blogs/:blogTitle" element={<SingleBlogPage />} />
      <Route
        path="/blog/create-blog"
        element={
          <ProtectedRoutes user={user}>
            <PostBuilderPage />{" "}
          </ProtectedRoutes>
        }
      />
      <Route
        path="/blog/edit-blog/:blogId"
        element={
          <ProtectedRoutes user={user}>
            <PostBuilderPage />{" "}
          </ProtectedRoutes>
        }
      />{" "}
      <Route
        path="/admin/dashboard"
        element={
          <AdminProtectedRoutes user={user}>
            <AdminPage />{" "}
          </AdminProtectedRoutes>
        }
      />
    </Routes>
  );
};

export default GeneralRoutes;
