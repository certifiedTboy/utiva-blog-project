import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Container, Row, Col } from "react-bootstrap";
import { useGetUserProfileMutation } from "../../lib/APIS/userApi/userApi";
import ProfileDetails from "./ProfileDetails";
import OtherData from "./OtherData";
import { useSelector } from "react-redux";

const Profile = () => {
  const params = useParams();
  const { username } = params;

  const { user: currentUser } = useSelector((state) => state.userState);

  const [getUserProfile, { data: user }] = useGetUserProfileMutation();

  useEffect(() => {
    const onGetUserProfile = async () => {
      await getUserProfile(username);
    };
    onGetUserProfile();
  }, [username, currentUser]);

  return (
    <Container>
      <Row>
        <Col lg={8} md={8}>
          {user && <ProfileDetails user={user} />}
        </Col>
        <Col lg={4} md={4}>
          {" "}
          {user && <OtherData user={user} />}{" "}
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
