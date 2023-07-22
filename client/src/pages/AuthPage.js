import React, { Fragment } from "react";
import Login from "../components/auth/Login";
import { Outlet } from "react-router-dom";

const AuthPage = () => {
  return (
    <Fragment>
      <Outlet />
    </Fragment>
  );
};

export default AuthPage;
