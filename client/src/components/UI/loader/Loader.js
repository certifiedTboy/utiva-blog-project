import React from "react";
import classes from "./loader.module.css";

const Loader = () => {
  return (
    <div className={classes.theme_loader}>
      <div className={classes.ball_scale}>
        <div className={classes.contain}>
          <div className={classes.ring}>
            <div className={classes.frame}></div>
          </div>
          <div className={classes.ring}>
            <div className={classes.frame}></div>
          </div>
          <div className={classes.ring}>
            <div className={classes.frame}></div>
          </div>
          <div className={classes.ring}>
            <div className={classes.frame}></div>
          </div>
          <div className={classes.ring}>
            <div className={classes.frame}></div>
          </div>
          <div className={classes.ring}>
            <div className={classes.frame}></div>
          </div>
          <div className={classes.ring}>
            <div className={classes.frame}></div>
          </div>
          <div className={classes.ring}>
            <div className={classes.frame}></div>
          </div>
          <div className={classes.ring}>
            <div className={classes.frame}></div>
          </div>
          <div className={classes.ring}>
            <div className={classes.frame}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
