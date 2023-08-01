import React, { useState } from "react";
import ImageUploadModal from "./modal/ImageUploadModal";
import { useSelector } from "react-redux";
import NameUpdateModal from "./modal/NameUpdateModal";
import classes from "./Profile.module.css";

const OtherData = ({ user }) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const { user: currentUser } = useSelector((state) => state.userState);

  const onShowModal = (event) => {
    if (!showUpdateModal) {
      setShowUpdateModal(true);
    } else {
      setShowUpdateModal(false);
    }
  };

  const onShowProfileModal = async (event) => {
    if (!showUploadModal) {
      setShowUploadModal(true);
    } else {
      setShowUploadModal(false);
    }
  };

  return (
    <>
      {showUpdateModal && <NameUpdateModal onShowModal={onShowModal} />}
      {showUploadModal && <ImageUploadModal onShowModal={onShowProfileModal} />}
      <div className={`${classes.user_details} d-none d-sm-none d-md-block`}>
        <div>
          <img
            className={classes.profile_image}
            src={`https://utivablog-project-server.onrender.com/${user?.data?.profilePicture}`}
            alt="profile_picture"
          />
          {currentUser && user?.data?._id === currentUser.data._id && (
            <div>
              <a
                className={classes.upload_btn}
                href="#"
                onClick={onShowProfileModal}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  className="bi bi-camera-fill"
                  viewBox="0 0 16 16">
                  <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                  <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />
                </svg>
              </a>
            </div>
          )}
        </div>
        <div>
          <h3>
            {user?.data?.firstName} {user?.data?.lastName}
          </h3>
        </div>
        <div>
          <p>{user?.data?.email}</p>
        </div>

        <div className="mt-3 mb-5">
          {currentUser && user?.data?._id === currentUser.data._id && (
            <a href="#" className={classes.edit_btn} onClick={onShowModal}>
              Edit Profile
            </a>
          )}
        </div>
      </div>
    </>
  );
};

export default OtherData;
