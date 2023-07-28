import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import Card from "react-bootstrap/Card";
import { NavLink } from "react-router-dom";
import { useGetUserProfileByIdMutation } from "../../../lib/APIS/userApi/userApi";
import DescriptionPopUp from "./DescriptionPopUp";
import blogImg from "../../../Assets/news-bg-1.png";

const BlogCard = ({ title, description, blogId, createdAt, userId }) => {
  const [showA, setShowA] = useState({ state: false, key: "" });
  const [userNameData, setUserNameData] = useState({
    firstName: "",
    lastName: "",
    username: "",
  });
  const [getUserById, { data, isSuccess }] = useGetUserProfileByIdMutation();

  useEffect(() => {
    const onGetUserUsername = async () => {
      if (userId) {
        await getUserById(userId);
      }
    };

    onGetUserUsername();
  }, [userId]);

  useEffect(() => {
    if (isSuccess) {
      setUserNameData({
        firstName: data?.data?.firstName,
        lastName: data?.data?.lastName,
        username: data?.data?.username,
      });
    }
  }, [isSuccess]);

  return (
    <Card
      style={{ width: "100%" }}
      onClick={() => setShowA({ state: false, key: "" })}
      key={blogId}
      className="mt-5">
      <Card.Img variant="top" src={blogImg} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <i className="fas fa-user"></i>{" "}
        <NavLink to={`/w-d/${userNameData.username}`} className="mr-3">
          {userNameData.firstName} {userNameData.lastName}
        </NavLink>
        <span className="date" style={{ float: "right" }}>
          <i className="fas fa-calendar"></i>
          <Moment className="ml-2" fromNow>
            {createdAt}
          </Moment>
        </span>
        {showA.key === blogId && (
          <DescriptionPopUp showA={showA.state} description={description} />
        )}
        <Card.Text
          className="mt-3"
          onMouseOver={() => setShowA({ state: true, key: blogId })}>
          {description.substr(0, 38)}...
        </Card.Text>
        <NavLink to={`/blogs/${title}`} className="read-more-btn">
          read more <i className="fas fa-angle-right"></i>
        </NavLink>
      </Card.Body>
    </Card>
  );
};

export default BlogCard;
