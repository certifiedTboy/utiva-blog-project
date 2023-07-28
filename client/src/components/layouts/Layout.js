import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";
import { SEO } from "../../lib/SEO/SEO";
// import Footer from "./footer/Footer";
// import BackToTop from "../UI/BackToTop/BackToTop";
import MainNav from "./mainNav/MainNav";
import Banner from "./mainNav/Banner";

const Layout = (props) => {
  const location = useLocation();
  const { pathname } = location;

  let titleData;

  if (pathname === "/home" || pathname === "/") {
    titleData = {
      title: "WebDev - Home",
      metaDescription: "Home page of Wed-dev blog",
    };
  } else if (pathname === "/about") {
    titleData = {
      title: "WebDev - About",
      metaDescription: "About Webdev blog",
    };
  } else if (pathname === "/login") {
    titleData = {
      title: "WebDev - Admin Page",
      metaDescription: "Welcome to admin page",
    };
  } else if (pathname === "/blogs") {
    titleData = {
      title: "WebDev - blogs",
      metaDescription: "all available blogs on webdev blog",
    };
  } else if (pathname === "/get-started/sign-in") {
    titleData = {
      title: "WebDev - Get Started",
      metaDescription: "sign in on webdev blog to get started",
    };
  } else if (pathname === "/get-started/sign-up") {
    titleData = {
      title: "WebDev - Get Started",
      metaDescription: "Sign up on webdev blog to get started",
    };
  } else if (pathname === "/blog/create-blog") {
    titleData = {
      title: "WebDev - Create new blog",
      metaDescription: "Create new blog with our post builder",
    };
  } else if (
    pathname === `/get-started/auth/account/verify/${pathname.split("/")[5]}`
  ) {
    titleData = {
      title: "WebDev - Set new user password",
      metaDescription: "set new password for newly created account",
    };
    //   } else if (pathname === `/blogs/${pathname.split("/")[2]}`) {
    //     titleData = {
    //       title: `WebDev - blogs/${pathname.split("/")[2]}`,
    //       metaDescription: `${pathname.split("/")[2]}`,
    //     };
    // } else if (pathname === `${pathname}`) {
    //   titleData = {
    //     title: `WebDev - Edit-Blog`,
    //     metaDescription: `Edit blog`,
    //   };
  } else if (pathname === `/w-d/${pathname.split("/")[2]}`) {
    titleData = {
      title: `WebDev - webdev/${pathname.split("/")[2]}`,
      metaDescription: `profile details and activities of ${
        pathname.split("/")[2]
      } on webdev blog`,
    };
  } else if (pathname === `/blogs/${pathname.split("/")[2]}`) {
    titleData = {
      title: `WebDev - blogs/${pathname.split("/")[2]}`,
      metaDescription: `${pathname.split("/")[2]}`,
    };
  } else {
    titleData = {
      title: "404 Error - Page not found",
      metaDescription: "Page not found",
    };
  }

  SEO(titleData);
  return (
    <Fragment>
      <MainNav scrollTop={props.scrollTop} />
      <Banner />
      <main>{props.children}</main>
      {/* <Footer /> */}
      {/* {props.scrollTop > 0 && <BackToTop scrollTop={props.scrollTop} />} */}
    </Fragment>
  );
};

export default Layout;
