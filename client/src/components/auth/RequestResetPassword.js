import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useRequestPasswordResetMutation } from "../../lib/APIS/authApis/authApis";

const RequestResetPassword = () => {
  const [requestPasswordReset, { error, isError, data, isSuccess, isLoading }] =
    useRequestPasswordResetMutation();

  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const emailChangeHandler = (event) => {
    setErrorMessage("");
    setEmail(event.target.value);
  };
  const passwordChangeRequest = async (event) => {
    event.preventDefault();
    if (email.trim().length === 0) {
      return setErrorMessage("Email input field is required ");
    }

    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!email.match(regex)) {
      return setErrorMessage("Invalid email address");
    }
    const resetPasswordData = { email };
    await requestPasswordReset(resetPasswordData);
  };

  return (
    <Container className="mt-5">
      {" "}
      <Row>
        {" "}
        <Container className="mb-5">
          <Row>
            {" "}
            <Col>
              {" "}
              <div className="text-center">
                <h2>User Login</h2>

                <p>Login to get started</p>
              </div>
            </Col>
          </Row>
        </Container>
        <Col lg={4} md={3} sm={2} xs={1}></Col>
        <Col lg={4} md={6} sm={8} xs={10}>
          {isError && (
            <div className="alert alert-danger text-center" role="alert">
              {error?.data?.message || "Something went wrong"}
            </div>
          )}
          {errorMessage && (
            <div className="alert alert-danger text-center" role="alert">
              {errorMessage}
            </div>
          )}
          {isSuccess && (
            <div className="alert alert-success text-center" role="alert">
              {data?.message}
            </div>
          )}
          <Form onSubmit={passwordChangeRequest}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter Email"
                onChange={emailChangeHandler}
              />
            </Form.Group>

            <Button
              type="submit"
              variant="warning"
              style={{ width: "100%" }}
              className={`${isLoading ? "disabled" : ""}`}>
              {" "}
              <span style={{ fontWeight: "700" }}>
                {`${isLoading ? "Please wait ..." : "Reset Password"}`}{" "}
              </span>
              {!isLoading && !isError && (
                <lord-icon
                  src="https://cdn.lordicon.com/jxwksgwv.json"
                  trigger="hover"
                  colors="primary:#121331"
                  style={{
                    width: "30px",
                    height: "30px",
                    marginBottom: "-10px",
                  }}></lord-icon>
              )}
              {isError && (
                <lord-icon
                  src="https://cdn.lordicon.com/vacmyjrh.json"
                  trigger="hover"
                  colors="primary:#121331"
                  style={{
                    width: "30px",
                    height: "30px",
                    marginBottom: "-10px",
                  }}></lord-icon>
              )}
            </Button>
          </Form>{" "}
          <div className="mt-3">
            <p className="d-inline">
              Don't have an account ?{" "}
              <NavLink to="/get-started/sign-up">Sign up</NavLink>
            </p>
          </div>
        </Col>
        <Col lg={4} md={3} sm={2} xs={1}></Col>
      </Row>{" "}
    </Container>
  );
};

export default RequestResetPassword;
