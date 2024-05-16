import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import AllBlogs from "../components/blogs/all-blogs/AllBlogs";

const AllBlogPage = () => {
  return (
    <Container>
      <Row>
        <Col lg={8} md={8} sm={12}>
          <AllBlogs />
        </Col>
        <Col
          lg={4}
          md={4}
          sm={12}
          className="d-none d-sm-none d-md-block"
        ></Col>
      </Row>
    </Container>
  );
};

export default AllBlogPage;
