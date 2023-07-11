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
    //   } else if (pathname === "/admin") {
    //     titleData = {
    //       title: "WebDev - Admin Page",
    //       metaDescription: "Welcome to admin page",
    //     };
  } else if (pathname === "/blogs") {
    titleData = {
      title: "WebDev - blogs",
      metaDescription: "all available blogs on webdev blog",
    };
  } else if (pathname === "/login") {
    titleData = {
      title: "WebDev - Get Started",
      metaDescription: "login to get started",
    };
    //   } else if (pathname === "/write-article") {
    //     titleData = {
    //       title: "WebDev - Write article",
    //       metaDescription: "Write and publish your articles on webdev blog",
    //     };
    //   } else if (pathname === "/write-article/hints") {
    //     titleData = {
    //       title: "WebDev - Hints",
    //       metaDescription: "Hints in writing better articles",
    //     };
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
    //   } else if (pathname === `/w-d/${pathname.split("/")[2]}`) {
    //     titleData = {
    //       title: `WebDev - webdev/${pathname.split("/")[2]}`,
    //       metaDescription: `profile details and activities of ${
    //         pathname.split("/")[2]
    //       } on webdev blog`,
    //     };
    //   } else if (pathname === `/auth/account/verify/${pathname.split("/")[4]}`) {
    //     titleData = {
    //       title: `WebDev - Email verification`,
    //       metaDescription: "Webdev blog email verification ",
    //     };
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
