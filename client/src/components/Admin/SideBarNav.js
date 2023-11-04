import React, { useRef } from "react";
import classes from "./styles/Admin.module.css";

const SideBarNav = ({ toggleAdmin }) => {
  const registeredUsersRef = useRef("");
  const dashboardRef = useRef("");
  const reportRef = useRef("");
  const messageRef = useRef("");
  const blogsRef = useRef("");
  const scheduleRef = useRef("");

  const toggleRegisteredUser = () => {
    toggleAdmin(registeredUsersRef.current.firstChild.nodeValue.toUpperCase());
  };

  const toggleDashBoard = () => {
    toggleAdmin(dashboardRef.current.firstChild.nodeValue.toUpperCase());
  };

  const toggleReport = () => {
    toggleAdmin(reportRef.current.firstChild.nodeValue.toUpperCase());
  };

  const toggleMessage = () => {
    toggleAdmin(messageRef.current.firstChild.nodeValue.toUpperCase());
  };

  const toggleBlog = () => {
    toggleAdmin(blogsRef.current.firstChild.nodeValue.toUpperCase());
  };

  const toggleSchedule = () => {
    toggleAdmin(scheduleRef.current.firstChild.nodeValue.toUpperCase());
  };

  return (
    <div className={`col-3 ${classes.main_header}`}>
      <div className={`card list-group ${classes.inner_header}`}>
        <li
          className={`list-group-item ${classes.active} ${classes.sidenav_list}`}
        >
          <strong>
            <span className={classes.sidenav_icon}>
              <i className="fas fa-chart-line"></i>
            </span>
            <a
              className={`active ${classes.sidenav_link}`}
              href="#"
              title="dashboard"
              onClick={toggleDashBoard}
              ref={dashboardRef}
            >
              Dashboard
            </a>{" "}
          </strong>
        </li>
        <li
          className={`list-group-item ${classes.active} ${classes.sidenav_list}`}
        >
          <strong>
            <span className={classes.sidenav_icon}>
              <i className="fas fa-users"></i>
            </span>
            <a
              className={`active ${classes.sidenav_link}`}
              href="#"
              title="registered_user"
              onClick={toggleRegisteredUser}
              ref={registeredUsersRef}
            >
              Registered Users
            </a>{" "}
          </strong>
        </li>
        <li
          className={`list-group-item ${classes.active} ${classes.sidenav_list}`}
        >
          <strong>
            <span className={classes.sidenav_icon}>
              <i className="fas fa-mail-bulk"></i>
            </span>
            <a
              className={`active ${classes.sidenav_link}`}
              href="#"
              title="messages"
              onClick={toggleMessage}
              ref={messageRef}
            >
              Messages
            </a>{" "}
          </strong>
        </li>
        <li
          className={`list-group-item ${classes.active} ${classes.sidenav_list}`}
        >
          <strong>
            <span className={classes.sidenav_icon}>
              <i className="fas fa-mail-bulk"></i>
            </span>
            <a
              className={`active ${classes.sidenav_link}`}
              href="#"
              title="blogs"
              onClick={toggleBlog}
              ref={blogsRef}
            >
              Blogs
            </a>{" "}
          </strong>
        </li>
        <li
          className={`list-group-item ${classes.active} ${classes.sidenav_list}`}
        >
          <strong>
            <span className={classes.sidenav_icon}>
              <i className="fas fa-mail-bulk"></i>
            </span>
            <a
              className={`active ${classes.sidenav_link}`}
              href="#"
              title="schedule"
              onClick={toggleSchedule}
              ref={scheduleRef}
            >
              Schedule
            </a>{" "}
          </strong>
        </li>
        <li
          className={`list-group-item ${classes.active} ${classes.sidenav_list}`}
        >
          <strong>
            <span className={classes.sidenav_icon}>
              <i className="fas fa-mail-bulk"></i>
            </span>
            <a
              className={`active ${classes.sidenav_link}`}
              href="#"
              title="reports"
              onClick={toggleReport}
              ref={reportRef}
            >
              Reports
            </a>{" "}
          </strong>
        </li>
      </div>
    </div>
  );
};

export default SideBarNav;
