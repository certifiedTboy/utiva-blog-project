import React, { Fragment } from "react";
import Intro from "./intro/Intro";
import Footer from "../footer/Footer";
import RecentTopic from "./recentBlogs/RecentBlogs";

const Home = () => {
  return (
    <Fragment>
      <Intro />
      <RecentTopic />
      <Footer />
    </Fragment>
  );
};

export default Home;
