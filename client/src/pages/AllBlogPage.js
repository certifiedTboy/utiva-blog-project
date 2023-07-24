import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import AllBlogs from "../components/blogs/all-blogs/AllBlogs";

const AllBlogPage = () => {
  return (
    <Container>
      <Row>
        <Col lg={3} md={3} sm={2}></Col>
        <Col lg={6} md={6} sm={8}>
          <AllBlogs />
        </Col>
        <Col lg={3} md={3} sm={2}></Col>
      </Row>
    </Container>
  );
};

export default AllBlogPage;
