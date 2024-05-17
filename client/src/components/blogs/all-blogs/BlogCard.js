import Moment from "react-moment";
import { Container, Row, Col, Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import blogImg from "../../../Assets/news-bg-1.png";
import "../single-blog/SingleBlog.css";

const BlogCard = ({ title, description, createdAt, userNameData }) => {
  let BASE_URL;

  if (process.env.NODE_ENV === "development") {
    BASE_URL = process.env.REACT_APP_DEV_IMAGE_URL;
  } else {
    BASE_URL = process.env.REACT_APP_PROD_IMAGE_URL;
  }

  return (
    <Card style={{ width: "100%" }} className="mt-5 py-3">
      <Container>
        <Row style={{ alignItems: "center" }}>
          <Col lg={8} md={8} sm={8} xs={8}>
            <img
              className="user_image"
              src={
                userNameData?.profilePicture.split(":")[0] === "https" ||
                userNameData?.profilePicture.split(":")[0] === "http"
                  ? userNameData?.profilePicture
                  : `${BASE_URL}/${userNameData?.profilePicture}`
              }
            />
            <i className="fas fa-user ml-2 mr-2"></i>
            <NavLink to={`/w-d/${userNameData.username}`} className="mr-3">
              {userNameData.firstName} {userNameData.lastName}
            </NavLink>{" "}
            <span className="date">
              <i className="fas fa-calendar"></i>
              <Moment className="ml-2" fromNow>
                {createdAt}
              </Moment>
            </span>
            <NavLink to={`/blogs/${title}`} className="read-more-btn">
              <Card.Title className="title_text">{title}</Card.Title>
              <Card.Text className="mt-3">
                {description.substr(0, 38)}...
              </Card.Text>
            </NavLink>
          </Col>
          <Col lg={4} md={4} sm={4} xs={2}>
            <NavLink to={`/blogs/${title}`} className="read-more-btn">
              <Card.Img variant="top" src={blogImg} style={{ width: "100%" }} />
            </NavLink>
          </Col>
        </Row>
      </Container>
    </Card>
  );
};

export default BlogCard;
