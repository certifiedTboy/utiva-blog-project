import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ProtectedRoutes, AdminProtectedRoutes } from "./ProtectedRoutes";
import Login from "../auth/Login";
import Register from "../auth/Register";
import SetPassword from "../auth/SetPassword";
import RequestResetPassword from "../auth/RequestResetPassword";
import SetNewRequestPassword from "../auth/SetNewRequestPassword";

const HomePage = lazy(() => import("../../pages/HomePage"));
const AboutPage = lazy(() => import("../../pages/AboutPage"));
const ErrorPage = lazy(() => import("../../pages/ErrorPage"));
const AllBlogPage = lazy(() => import("../../pages/AllBlogPage"));
const AuthPage = lazy(() => import("../../pages/AuthPage"));
const ProfilePage = lazy(() => import("../../pages/ProfilePage"));
const SingleBlogPage = lazy(() => import("../../pages/SingleBlogPage"));
const PostBuilderPage = lazy(() => import("../../pages/PostBuilderPage"));
const AdminPage = lazy(() => import("../../pages/AdminPage"));

const GeneralRoutes = () => {
  const { user } = useSelector((state) => state.userState);

  return (
    <Routes>
      <Route
        path="*"
        element={
          <Suspense fallback={<></>}>
            <ErrorPage />
          </Suspense>
        }
      />
      <Route path="/" element={<Navigate to="/home" replace={true} />} exact />
      <Route
        path="/home"
        element={
          <Suspense fallback={<></>}>
            <HomePage />
          </Suspense>
        }
      />
      <Route
        path="/get-started"
        element={
          <Suspense fallback={<></>}>
            <AuthPage />
          </Suspense>
        }
      >
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
      <Route
        path="/about"
        element={
          <Suspense fallback={<></>}>
            <AboutPage />
          </Suspense>
        }
      />
      <Route
        path="/blogs"
        element={
          <Suspense fallback={<></>}>
            <AllBlogPage />
          </Suspense>
        }
      />
      <Route
        path="/w-d/:username"
        element={
          <Suspense fallback={<></>}>
            <ProfilePage />
          </Suspense>
        }
      />
      <Route
        path="/blogs/:blogTitle"
        element={
          <Suspense fallback={<></>}>
            <SingleBlogPage />
          </Suspense>
        }
      />
      <Route
        path="/blog/create-blog"
        element={
          <Suspense fallback={<></>}>
            <ProtectedRoutes user={user}>
              <PostBuilderPage />{" "}
            </ProtectedRoutes>
          </Suspense>
        }
      />
      <Route
        path="/blog/edit-blog/:blogId"
        element={
          <Suspense fallback={<></>}>
            {" "}
            <ProtectedRoutes user={user}>
              <PostBuilderPage />{" "}
            </ProtectedRoutes>
          </Suspense>
        }
      />{" "}
      <Route
        path="/admin/dashboard"
        element={
          <Suspense fallback={<></>}>
            {" "}
            <AdminProtectedRoutes user={user}>
              <AdminPage />{" "}
            </AdminProtectedRoutes>
          </Suspense>
        }
      />
    </Routes>
  );
};

export default GeneralRoutes;
