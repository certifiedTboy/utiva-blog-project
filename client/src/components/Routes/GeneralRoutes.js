import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ProtectedRoutes } from "./ProtectedRoutes";
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
import PostBuilderPage from "../../pages/PostBuilderPage";

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
        <Route
          path="auth/account/verify/:verificationData"
          element={<SetPassword />}
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
      />
    </Routes>
  );
};

export default GeneralRoutes;
