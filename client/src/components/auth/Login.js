import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLoginUserMutation } from "../../lib/APIS/authApis/authApis";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, { isLoading, isError, error, isSuccess }] =
    useLoginUserMutation();

  const { user } = useSelector((state) => state.userState);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user]);

  const onLoginUser = async (event) => {
    event.preventDefault();

    if (
      !email ||
      !password ||
      email.trim().length === 0 ||
      password.trim().length === 0
    ) {
      return;
    }
    const loginData = { email, password };
    await loginUser(loginData);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/home");
    }
  }, [isSuccess]);

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
              {error.data.message || "Something went wrong"}
            </div>
          )}
          <Form onSubmit={onLoginUser}>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Enter Email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="Enter Password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>

            <Button
              type="submit"
              variant="warning"
              style={{ width: "100%" }}
              className={`${isLoading ? "disabled" : ""}`}>
              {" "}
              <span style={{ fontWeight: "700" }}>
                {`${isLoading ? "Please wait ..." : "Login"}`}{" "}
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

            <p className="d-inline ml-4">
              <NavLink to="/get-started/reset-password">
                Forgot password
              </NavLink>
            </p>
          </div>
        </Col>
        <Col lg={4} md={3} sm={2} xs={1}></Col>
      </Row>{" "}
    </Container>
  );
};

export default Login;
