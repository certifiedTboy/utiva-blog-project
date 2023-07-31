import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetCurrentUserMutation } from "../../../lib/APIS/userApi/userApi";
import { useLogoutUserMutation } from "../../../lib/APIS/authApis/authApis";
import classes from "./MainNav.module.css";

const MainNav = ({ scrollTop }) => {
  const [getCurrentUser] = useGetCurrentUserMutation();
  const [logoutUser] = useLogoutUserMutation();

  const { user } = useSelector((state) => state.userState);

  const params = useParams();

  const { username } = params;
  useEffect(() => {
    const getCurrentUserData = async () => {
      await getCurrentUser();
    };

    getCurrentUserData();
  }, [username, getCurrentUser]);

  const onLogoutUser = () => {
    logoutUser();
  };

  return (
    <div
      className={`navbar navbar-expand-lg bg-light navbar-light  ${
        scrollTop > 0 ? `nav-sticky` : ""
      }`}>
      <div className="container-fluid">
        <a href="/" className="navbar-brand bra">
          WebDev Blog
        </a>
        <button
          type="button"
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarCollapse">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarCollapse">
          <div className="navbar-nav ml-auto">
            <NavLink
              activeClass="active"
              className={`nav-item nav-link ${classes.mousePoint} active d-none d-sm-none d-md-block`}
              to="/home">
              Home
            </NavLink>

            <NavLink
              activeClass="active"
              className={`nav-item nav-link ${classes.mousePoint} d-none d-sm-none d-md-block`}
              to="/about">
              About
            </NavLink>

            <NavLink
              activeClass="active"
              className={`nav-item nav-link ${classes.mousePoint} d-none d-sm-none d-md-block`}
              to="/blogs">
              Blogs
            </NavLink>

            {!user && (
              <NavLink
                activeClass="active"
                className={`nav-item nav-link ${classes.mousePoint} d-none d-sm-none d-md-block`}
                to="/get-started/sign-in">
                Get Started
              </NavLink>
            )}

            {user && (
              <li
                className={`nav-link nav-item dropdown d-none d-sm-none d-md-block`}>
                <NavLink
                  className={`${classes.dropDownLink} dropdown-toggle`}
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false">
                  <img
                    src={`http://localhost:8000/${user.data.profilePicture}`}
                    alt="profile_picture"
                  />
                </NavLink>

                <ul className="dropdown-menu">
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to={`/w-d/${user.data.username}`}>
                      Profile
                    </NavLink>
                  </li>

                  {/* {user.userType === "Admin" && (
                    <li>
                      <NavLink className="dropdown-item" to="/admin">
                        Admin Dashboard
                      </NavLink>
                    </li>
                  )} */}
                  <li>
                    <NavLink className="dropdown-item" onClick={onLogoutUser}>
                      Signout
                    </NavLink>
                  </li>
                </ul>
              </li>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav;
