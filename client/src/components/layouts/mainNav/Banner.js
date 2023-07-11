import React from "react";
import classes from "./MainNav.module.css";

const Banner = () => {
  return (
    <div className={`${classes.hero} d-none d-sm-none d-md-block`} id="home">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-sm-12 col-md-6"></div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
