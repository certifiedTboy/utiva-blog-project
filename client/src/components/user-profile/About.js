import React from "react";
import classes from "./Profile.module.css";

const About = ({ user }) => {
  return (
    <div className="ml-2">
      <div className="row">
        <div className="col-12">
          <div className={classes.about}>
            <p>Full stack Web Developer / Software Engineer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
