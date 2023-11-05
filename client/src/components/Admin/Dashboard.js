import React, { useState, useEffect } from "react";
import ChartAnalysis from "./ChartAnalysis";
import "./styles/Dashboard.css";

const Dashboard = () => {
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [createdBlogs, setCreatedBlogs] = useState([]);
  const [totalVisits, setTotalVisits] = useState(0);
  const [generalErrorMessage, setGeneralErrorMessage] = useState({});

  // useEffect(() => {
  //   const onGetAllUser = async () => {
  //     const response = await getAllRegisteredUsers();
  //     if (response.error) {
  //       return setGeneralErrorMessage({
  //         type: "USER_ERROR",
  //         error: response.error,
  //       });
  //     }

  //     setRegisteredUsers(response);
  //   };

  //   onGetAllUser();
  // }, []);

  // useEffect(() => {
  //   const onGetAllBlogs = async () => {
  //     const response = await getAllBlogs();
  //     if (response.error) {
  //       return setGeneralErrorMessage({
  //         type: "BLOG_ERROR",
  //         error: response.error,
  //       });
  //     }

  //     setCreatedBlogs(response);
  //   };

  //   onGetAllBlogs();
  // }, []);

  // useEffect(() => {
  //   const onGetTotalVisits = async () => {
  //     const response = await getTotalVisits();
  //     if (response.error) {
  //       return setGeneralErrorMessage({
  //         type: "VISIT_ERROR",
  //         error: response.error,
  //       });
  //     }

  //     setTotalVisits(response.counter);
  //   };

  //   onGetTotalVisits();
  // }, []);

  // console.log(totalVisits);

  return (
    <div>
      <div className="row">
        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
          <div className="card-admin">
            <div className="card-body">
              <div className="row">
                <div className="col-9">
                  <div className="d-flex align-items-center align-self-start">
                    <h3 className="mb-0">{registeredUsers.length}</h3>
                    <p className="text-success ml-2 mb-0 font-weight-medium">
                      +3.5%
                    </p>
                  </div>
                </div>
                <div className="col-3">
                  <div className="icon icon-box-success ">
                    <span className="mdi mdi-arrow-top-right icon-item"></span>
                  </div>
                </div>
              </div>
              <h6 className="text-muted font-weight-normal">
                Registered Users
              </h6>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
          <div className="card-admin">
            <div className="card-body">
              <div className="row">
                <div className="col-9">
                  <div className="d-flex align-items-center align-self-start">
                    <h3 className="mb-0">{createdBlogs.length}</h3>
                    <p className="text-success ml-2 mb-0 font-weight-medium">
                      +11%
                    </p>
                  </div>
                </div>
                <div className="col-3">
                  <div className="icon icon-box-success">
                    <span className="mdi mdi-arrow-top-right icon-item"></span>
                  </div>
                </div>
              </div>
              <h6 className="text-muted font-weight-normal">Total Blogs</h6>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
          <div className="card-admin">
            <div className="card-body">
              <div className="row">
                <div className="col-9">
                  <div className="d-flex align-items-center align-self-start">
                    <h3 className="mb-0">{totalVisits}</h3>
                    <p className="text-danger ml-2 mb-0 font-weight-medium">
                      -2.4%
                    </p>
                  </div>
                </div>
                <div className="col-3">
                  <div className="icon icon-box-danger">
                    <span className="mdi mdi-arrow-bottom-left icon-item"></span>
                  </div>
                </div>
              </div>
              <h6 className="text-muted font-weight-normal">Visits Per Day</h6>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
          <div className="card-admin">
            <div className="card-body">
              <div className="row">
                <div className="col-9">
                  <div className="d-flex align-items-center align-self-start">
                    <h3 className="mb-0">{totalVisits}</h3>
                    <p className="text-success ml-2 mb-0 font-weight-medium">
                      +3.5%
                    </p>
                  </div>
                </div>
                <div className="col-3">
                  <div className="icon icon-box-success ">
                    <span className="mdi mdi-arrow-top-right icon-item"></span>
                  </div>
                </div>
              </div>
              <h6 className="text-muted font-weight-normal">
                Visits Per Month
              </h6>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card-admin">
            <div className="card-body">
              <div className="d-flex flex-row justify-content-between">
                <h4 className="card-title mb-1">All Articles</h4>
                <p className="text-muted mb-1">Your data status</p>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="preview-list">
                    <div className="preview-item border-bottom">
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-primary">
                          <i className="mdi mdi-file-document"></i>
                        </div>
                      </div>
                    </div>
                    <ChartAnalysis />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-4 grid-margin">
          <div className="card-admin">
            <div className="card-body">
              <h5>Link Share</h5>
              <div className="row">
                <div className="col-8 col-sm-12 col-xl-8 my-auto">
                  <div className="d-flex d-sm-block d-md-flex align-items-center">
                    <h2 className="mb-0">$32123</h2>
                    <p className="text-success ml-2 mb-0 font-weight-medium">
                      +3.5%
                    </p>
                  </div>
                </div>
                <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                  <i className="icon-lg mdi mdi-codepen text-primary ml-auto"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-4 grid-margin">
          <div className="card-admin">
            <div className="card-body">
              <h5>Comments</h5>
              <div className="row">
                <div className="col-8 col-sm-12 col-xl-8 my-auto">
                  <div className="d-flex d-sm-block d-md-flex align-items-center">
                    <h2 className="mb-0">45850</h2>
                    <p className="text-success ml-2 mb-0 font-weight-medium">
                      +8.3%
                    </p>
                  </div>
                </div>
                <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                  <i className="icon-lg mdi mdi-wallet-travel text-danger ml-auto"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-4 grid-margin">
          <div className="card-admin">
            <div className="card-body">
              <h5>Reactions / Impressions</h5>
              <div className="row">
                <div className="col-8 col-sm-12 col-xl-8 my-auto">
                  <div className="d-flex d-sm-block d-md-flex align-items-center">
                    <h2 className="mb-0">2039</h2>
                    <p className="text-danger ml-2 mb-0 font-weight-medium">
                      -2.1%{" "}
                    </p>
                  </div>
                </div>
                <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                  <i className="icon-lg mdi mdi-monitor text-success ml-auto"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
