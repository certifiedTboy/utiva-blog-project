import React from "react";
import { useNavigate, Navigate } from "react-router-dom";

export const ProtectedRoutes = ({ user, children }) => {
  if (user?.data?.userType !== "Admin") {
    return <Navigate to="/get-started/sign-in" replace />;
  }

  return children;
};

export const AdminProtectedRoutes = ({ user, children }) => {
  const navigate = useNavigate();
  if (!user) {
    return <Navigate to="/get-started/sign-in" replace />;
  }

  if (user?.data?.userType !== "Admin") {
    return navigate(-1);
  }

  return children;
};
