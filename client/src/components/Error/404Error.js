import React from "react";
import classes from "./404Error.module.css";

const NotFoundError = () => {
  return (
    <div className={`${classes.full_height_section} ${classes.error_section}`}>
      <div className={`${classes.full_height_tablecell}`}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className={`${classes.error_text}`}>
                <i className={`far fa-sad-cry ${classes.icon}`}></i>
                <h1>Oops! Not Found.</h1>
                <p>The page you requested for is not found.</p>
                <a href="/home" className="btn btn-lg boxed-btn">
                  Back to Home
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundError;
