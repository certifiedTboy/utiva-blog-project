import React, { useEffect, useState } from "react";
import AdminLoader from "./AdminLoader";
import DashBoard from "./Dashboard";
import Report from "./Report";
import Schedule from "./Schedule";
import SideBarNav from "./SideBarNav";
import TotalBlogs from "./TotalBlogs";

const Admin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showDashBoard, setShowDashboard] = useState(true);
  const [showUserActivities, setShowUserActivities] = useState(false);
  const [showLatestUpdates, setShowLatestUpdates] = useState(false);
  const [showReports, setShowReports] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [showTotalBlogs, setShowTotalBlogs] = useState(false);

  const toggleAdmin = (component) => {
    if (component === "DASHBOARD") {
      setShowDashboard(true);
      setShowUserActivities(false);
      setShowLatestUpdates(false);
      setShowReports(false);
      setShowSchedule(false);
      setShowTotalBlogs(false);
    }

    if (component === "USER ACTIVITES") {
      setShowDashboard(false);
      setShowUserActivities(true);
      setShowLatestUpdates(false);
      setShowReports(false);
      setShowSchedule(false);
      setShowTotalBlogs(false);
    }

    if (component === "LATEST UPDATES") {
      setShowDashboard(false);
      setShowUserActivities(false);
      setShowLatestUpdates(true);
      setShowReports(false);
      setShowSchedule(false);
      setShowTotalBlogs(false);
    }
    if (component === "REPORTS") {
      setShowDashboard(false);
      setShowUserActivities(false);
      setShowLatestUpdates(false);
      setShowReports(true);
      setShowSchedule(false);
      setShowTotalBlogs(false);
    }

    if (component === "SCHEDULE") {
      setShowDashboard(false);
      setShowUserActivities(false);
      setShowLatestUpdates(false);
      setShowReports(false);
      setShowSchedule(true);
      setShowTotalBlogs(false);
    }
    if (component === "BLOGS") {
      setShowDashboard(false);
      setShowUserActivities(false);
      setShowLatestUpdates(false);
      setShowReports(false);
      setShowSchedule(false);
      setShowTotalBlogs(false);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  return (
    <>
      {isLoading && <AdminLoader />}
      <div className="container-fluid">
        <div className="row">
          <SideBarNav toggleAdmin={toggleAdmin} />

          <div className="col-9">
            {" "}
            {showDashBoard && <DashBoard />}
            {showReports && <Report />}
            {showSchedule && <Schedule />}
            {showTotalBlogs && <TotalBlogs />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
