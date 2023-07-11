import React from "react";
import { Link, animateScroll as scroll } from "react-scroll";
import { NavLink } from "react-router-dom";
import classes from "./MainNav.module.css";

const MainNav = ({ scrollTop }) => {
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
        </div>
      </div>
    </div>
  );
};

export default MainNav;
