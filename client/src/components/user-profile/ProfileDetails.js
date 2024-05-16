import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Moment from "react-moment";
import About from "./About";
import { useFollowUserMutation } from "../../lib/APIS/userApi/userApi";
import BlogByUser from "./BlogsByUser";
import ImageUploadModal from "./modal/ImageUploadModal";
import NameUpdateModal from "./modal/NameUpdateModal";
import classes from "./Profile.module.css";

const ProfileDetails = ({ user }) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showAbout, setShowAbout] = useState(true);
  const [showStory, setShowStory] = useState(false);
  const [followUser, { isSuccess }] = useFollowUserMutation();
  const { user: currentUser } = useSelector((state) => state.userState);

  let BASE_URL;

  if (process.env.NODE_ENV === "development") {
    BASE_URL = process.env.REACT_APP_DEV_IMAGE_URL;
  } else {
    BASE_URL = process.env.REACT_APP_PROD_IMAGE_URL;
  }

  const onShowModal = (event) => {
    if (!showUpdateModal) {
      setShowUpdateModal(true);
    } else {
      setShowUpdateModal(false);
    }
  };

  const onShowProfileModal = (event) => {
    if (!showUploadModal) {
      setShowUploadModal(true);
    } else {
      setShowUploadModal(false);
    }
  };

  const navigateProfile = (event) => {
    event.preventDefault();
    if (showAbout) {
      setShowAbout(false);
      setShowStory(true);
    } else {
      setShowAbout(true);
      setShowStory(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      setIsFollowing(
        user?.data?.followers.find((fData) => fData._id === currentUser._id)
      );
    }
  }, [currentUser, user, isSuccess]);

  const followUserHandler = async () => {
    const followData = { otherUserId: user?.data?._id };
    await followUser(followData);
  };

  return (
    <>
      {showUpdateModal && <NameUpdateModal onShowModal={onShowModal} />}
      {showUploadModal && <ImageUploadModal onShowModal={onShowProfileModal} />}

      <div className={classes.user_story}>
        <div className={classes.move_center}>
          <div
            className={`${classes.user_details} d-sm-block d-md-none d-lg-none text-center`}
          >
            <img
              className={classes.profile_image}
              src={
                user?.data?.profilePicture.split(":")[0] === "https" ||
                user?.data?.profilePicture.split(":")[0] === "http"
                  ? user?.data?.profilePicture
                  : `${BASE_URL}/${user?.data?.profilePicture}`
              }
              alt="profile_picture"
            />
            {currentUser && currentUser?._id === user?.data?._id && (
              <div>
                <a
                  className={classes.upload_btn2}
                  href="#"
                  onClick={onShowProfileModal}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    className="bi bi-camera-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                    <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />
                  </svg>
                </a>
              </div>
            )}
          </div>
          <h2>
            {user?.data?.firstName} {user?.data?.lastName}
          </h2>
          <p>{user?.data?.email}</p>

          <div className="mb-2 d-lg-none d-md-none d-sm-block">
            {currentUser && user?.data?._id === currentUser?._id && (
              <a href="#" className={classes.edit_btn} onClick={onShowModal}>
                Edit Profile
              </a>
            )}
          </div>

          {/* {userData.following && ( */}
          <div>
            <button type="button" class="btn-primary mr-2">
              following{" "}
              <span className={`badge text-bg-secondary`}>
                {user?.data?.following.length}
              </span>
            </button>

            <button type="button" class="btn-primary">
              followers{" "}
              <span class="badge text-bg-secondary">
                {user?.data?.followers.length}
              </span>
            </button>

            {currentUser && currentUser?._id !== user?.data?._id && (
              <button
                type="submit"
                className="btn-success d-inline ml-2"
                onClick={followUserHandler}
              >
                {isFollowing ? "unfollow" : "follow"}
              </button>
            )}

            {user && (
              <div>
                {" "}
                <p className={classes.date}>
                  Joined:{" "}
                  <Moment className="meta-own" fromNow>
                    {user?.data?.createdAt}
                  </Moment>
                </p>{" "}
              </div>
            )}
          </div>
          {/* )} */}
        </div>
        <div className={`${classes.nav_border} mt-5`}>
          <div style={{ width: "400px" }}>
            <ul class="nav nav-pills nav-justified">
              <li class="nav-item" style={{ textAlign: "left" }}>
                <NavLink
                  className={`nav-link ${classes.nav_link2}  ${
                    showAbout ? "disabled" : ""
                  } ${classes.link}`}
                  aria-current="page"
                  to="#"
                  onClick={navigateProfile}
                >
                  About
                </NavLink>
              </li>

              {currentUser &&
                currentUser?.userType === "Admin" &&
                user?.data?._id === currentUser?._id && (
                  <li className="nav-item" style={{ textAlign: "left" }}>
                    <NavLink
                      className={`nav-link ${classes.nav_link2} ${
                        showStory ? "disabled" : ""
                      } ${classes.link}`}
                      aria-current="page"
                      to="#"
                      onClick={navigateProfile}
                    >
                      Blogs
                    </NavLink>
                  </li>
                )}

              {currentUser &&
                currentUser?.userType === "Admin" &&
                user?.data?._id === currentUser?._id && (
                  <li class="nav-item" style={{ textAlign: "left" }}>
                    <NavLink
                      className={`nav-link ${!user ? "disabled" : ""} ${
                        classes.link
                      }`}
                      to="/blog/create-blog"
                    >
                      Create Blog
                    </NavLink>
                  </li>
                )}
            </ul>
          </div>
          {showAbout && user && <About user={user} />}

          {showStory && user && <BlogByUser userData={user} />}
        </div>
      </div>
    </>
  );
};

export default ProfileDetails;
