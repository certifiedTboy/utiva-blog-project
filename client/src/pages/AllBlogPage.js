import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import AllBlogs from "../components/blogs/all-blogs/AllBlogs";

const AllBlogPage = () => {
  return (
    <Container>
      <Row>
        <Col>First Col</Col>
        <Col>
          <AllBlogs />
        </Col>
        <Col>Third Col</Col>
      </Row>
    </Container>
  );
};

export default AllBlogPage;
