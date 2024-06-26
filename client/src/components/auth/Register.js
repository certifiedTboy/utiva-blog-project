import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useRegisterUserMutation } from "../../lib/APIS/authApis/authApis";

const Register = () => {
  const [email, setEmail] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [acceptTerms, setAcceptTerms] = useState();

  const firstNameChangeHandler = (event) => {
    setGeneralError("");
    setFirstName(event.target.value);
  };

  const lastNameChangeHandler = (event) => {
    setGeneralError("");
    setLastName(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setGeneralError("");
    setEmail(event.target.value);
  };

  const [registerUser, response] = useRegisterUserMutation();
  const onRegisterUser = async (event) => {
    event.preventDefault();
    if (!email || !firstName || !lastName) {
      return setGeneralError("All input fields are required");
    }

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regex.test(email)) {
      return setGeneralError("Invalid email address");
    }

    if (!acceptTerms) {
      return setGeneralError(
        "You're are yet to accept our terms and conditions"
      );
    }
    const regData = {
      email,
      firstName,
      lastName,
      acceptTerms,
    };

    setGeneralError("");

    return await registerUser(regData);
  };

  const { isLoading, isError, error, data, isSuccess } = response;

  useEffect(() => {
    if (isSuccess) {
      setEmail("");
      setFirstName("");
      setLastName("");
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
                <h2>User Registration</h2>

                <p>Register new account to get started</p>
              </div>
            </Col>
          </Row>
        </Container>
        <Col lg={4} md={3} sm={2} xs={1}></Col>
        <Col lg={4} md={6} sm={8} xs={10}>
          {" "}
          {isError && (
            <div className="alert alert-danger text-center" role="alert">
              {error?.data?.message || "Something went wrong"}
            </div>
          )}
          {generalError && (
            <div className="alert alert-danger text-center" role="alert">
              {generalError}
            </div>
          )}
          {data && (
            <div className="alert alert-success text-center" role="alert">
              {data.message}
            </div>
          )}
          <Form onSubmit={onRegisterUser}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter Email"
                onChange={emailChangeHandler}
                value={email}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="First Name"
                onChange={firstNameChangeHandler}
                value={firstName}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Last Name"
                onChange={lastNameChangeHandler}
                value={lastName}
              />
            </Form.Group>
            <div className="mt-3">
              <input
                type="checkbox"
                className="d-inline mr-2"
                onChange={(event) => setAcceptTerms(event.target.checked)}
                value={acceptTerms}
              />
              <p className="d-inline">
                I have read and agreed to the{" "}
                <a href="#">terms and conditions</a>
              </p>
            </div>
            <Button
              type="submit"
              variant="warning"
              style={{ width: "100%" }}
              className={isLoading ? "disabled" : ""}
            >
              <span style={{ fontWeight: "700" }}>
                {!isLoading ? "Create Acount" : "Please wait..."}
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
                  }}
                ></lord-icon>
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
                  }}
                ></lord-icon>
              )}
            </Button>
          </Form>{" "}
          <div className="mt-3">
            <p>
              Already have an account ?{" "}
              <NavLink to="/get-started/sign-in">Sign in</NavLink>
            </p>
          </div>
        </Col>
        <Col lg={4} md={3} sm={2} xs={1}></Col>
      </Row>{" "}
    </Container>
  );
};

export default Register;
