import React, { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import { NavLink, useParams } from "react-router-dom";
import { Link } from "react-scroll";
import { useSelector } from "react-redux";
import webdevLogo from "../../../Assets/webdev_logo.jpg";
import { useGetCurrentUserMutation } from "../../../lib/APIS/userApi/userApi";
import { useLogoutUserMutation } from "../../../lib/APIS/authApis/authApis";
import classes from "./MainNav.module.css";

const MainNav = ({ scrollTop }) => {
  const [show, setShow] = useState(false);
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
    <>
      <div
        // id="home"
        className={`navbar navbar-expand-md  navbar-light  ${
          scrollTop > 0 ? `nav-sticky` : ""
        }`}>
        <div className="container-fluid">
          <a href="/" className={`navbar-brand bra ${classes.mobile_a}`}>
            WebDev Blog
          </a>
          <button
            style={{ border: "none" }}
            type="button"
            className="navbar-toggler"
            data-toggle="collapse">
            {user && (
              <img
                className={classes.mobile_img}
                src={`http://localhost:8000/${user.data.profilePicture}`}
                alt="profile_picture"
              />
            )}

            {!user && (
              <img
                className={classes.mobile_img}
                src={webdevLogo}
                alt="web_dev_logo"
              />
            )}
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

              <Link
                activeClass="active"
                className={`nav-item nav-link ${classes.mousePoint} d-none d-sm-none d-md-block`}
                to="contact"
                spy={true}
                smooth={true}
                hashSpy={true}
                duration={500}
                delay={500}
                isDynamic={true}
                ignoreCancelEvents={false}
                spyThrottle={500}>
                Contact
              </Link>
            </div>
            {!user && (
              <li className={`nav-link nav-item d-none d-sm-none d-md-block`}>
                <NavLink
                  className={`${classes.dropDownLink}`}
                  to="/get-started/sign-in"
                  role="button"
                  aria-expanded="false">
                  Get Started
                </NavLink>
              </li>
            )}
            {/* <form className="d-flex d-none d-sm-none d-md-block" role="search">
              <input
                class="form-control me-2 d-none d-sm-none d-md-block"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </form> */}

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

      <div
        className="fixed-top d-md-none d-lg-none d-sm-block"
        style={{
          marginTop: "70px",
          background: "#07212e",
          paddingTop: "5px",
        }}>
        <ul className="nav nav-tabs nav-fill">
          {!show && (
            <li className="nav-item">
              <NavLink className={`nav-link ${classes.nav_link}`} aria-current="page" to="/home">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  fill="#F28123"
                  class="bi bi-house-heart-fill"
                  viewBox="0 0 16 16">
                  <path d="M7.293 1.5a1 1 0 0 1 1.414 0L11 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l2.354 2.353a.5.5 0 0 1-.708.707L8 2.207 1.354 8.853a.5.5 0 1 1-.708-.707L7.293 1.5Z" />
                  <path d="m14 9.293-6-6-6 6V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9.293Zm-6-.811c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.691 0-5.018Z" />
                </svg>
              </NavLink>
            </li>
          )}

          {!show && (
            <li className="nav-item">
              <NavLink className={`nav-link  ${classes.nav_link}`} to="/about">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  fill="#F28123"
                  class="bi bi-info-square-fill"
                  viewBox="0 0 16 16">
                  <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.93 4.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                </svg>
              </NavLink>
            </li>
          )}

          {!show && (
            <li className="nav-item">
              <NavLink className={`nav-link ${classes.nav_link}`} to="/blogs">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  fill="#F28123"
                  className="bi bi-rss-fill"
                  viewBox="0 0 16 16">
                  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm1.5 2.5c5.523 0 10 4.477 10 10a1 1 0 1 1-2 0 8 8 0 0 0-8-8 1 1 0 0 1 0-2zm0 4a6 6 0 0 1 6 6 1 1 0 1 1-2 0 4 4 0 0 0-4-4 1 1 0 0 1 0-2zm.5 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                </svg>
              </NavLink>
            </li>
          )}

          {!show && (
            <li className="nav-item">
              <Link
                activeClass="active"
                className={`nav-item nav-link ${classes.mousePoint} ${classes.nav_link}`}
                to="contact"
                spy={true}
                smooth={true}
                hashSpy={true}
                duration={500}
                delay={500}
                isDynamic={true}
                ignoreCancelEvents={false}
                spyThrottle={500}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  fill="#F28123"
                  class="bi bi-person-lines-fill"
                  viewBox="0 0 16 16">
                  <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
                </svg>
              </Link>
            </li>
          )}

          {!show && (
            <li className="nav-item dropdown">
              <Nav.Link
                className={`nav-link dropdown-toggle ${classes.nav_link}`}
                data-bs-toggle="dropdown"
                href="#"
                role="button"
                aria-expanded="false">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  s
                  fill="#F28123"
                  className="bi bi-person-bounding-box"
                  viewBox="0 0 16 16">
                  <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z" />
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                </svg>
              </Nav.Link>
              {!user && (
                <ul className="dropdown-menu">
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/get-started/sign-in">
                      Login
                    </NavLink>
                  </li>
                </ul>
              )}
              {user && (
                <ul className="dropdown-menu">
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to={`/w-d/${user.data.username}`}>
                      Profile
                    </NavLink>
                  </li>

                  <li>
                    <NavLink className="dropdown-item" onClick={onLogoutUser}>
                      Logout
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>
          )}

          <li className="nav-item">
            <input
              placeholder="Search"
              className={`form-control ${
                !show ? classes.form_control_nav : classes.form_control2
              }`}
              onFocus={() => setShow(true)}
              onBlur={() => setShow(false)}
            />
          </li>
        </ul>
      </div>
    </>
  );
};

export default MainNav;
