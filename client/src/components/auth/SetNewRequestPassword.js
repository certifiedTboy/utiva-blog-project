import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import {
  useVerifyPasswordResetTokenMutation,
  useSetNewPasswordMutation,
} from "../../lib/APIS/authApis/authApis";

const SetNewRequestPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordValidityError, setPasswordValidityError] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  const { passwordResetData } = params;

  const [
    verifyPasswordResetToken,
    { isError, isSuccess, isLoading, error, data },
  ] = useVerifyPasswordResetTokenMutation();
  const [setNewPassword, passwordResponse] = useSetNewPasswordMutation();

  const {
    isError: __isError,
    isSuccess: __isSuccess,
    isLoading: __isLoading,
    error: __error,
  } = passwordResponse;

  //user verification with token method
  useEffect(() => {
    if (passwordResetData) {
      const data = atob(passwordResetData).split(":");
      console.log(data);
      const passwordDataToVerify = {
        userId: data[1],
        passwordResetToken: data[0],
      };

      verifyPasswordResetToken(passwordDataToVerify);
    }
  }, [passwordResetData]);

  //password input change handler
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  //confirm-password input change handler
  const confirmPasswordChangeHandler = (event) => {
    setConfirmPassword(event.target.value);
  };

  // check password and confirm password validity method
  useEffect(() => {
    const checkPasswordValidity = () => {
      const valid = {
        hasUpper: /[A-Z]/,
        hasLower: /[a-z]/,
        hasNumber: /[0-9]/,
        hasSpclChr: /[@,#,$,%,&]/,
      };

      if (password.trim().length <= 7) {
        setPasswordValidityError(
          "Password is too short, it must be 8 characters long"
        );
      } else if (!password.match(valid.hasUpper)) {
        setPasswordValidityError(
          "password must contain at least one upper case"
        );
      } else if (!password.match(valid.hasLower)) {
        setPasswordValidityError(
          "password must contain at least one lower case"
        );
      } else if (!password.match(valid.hasNumber)) {
        setPasswordValidityError("password must contain at least a number");
      } else if (!password.match(valid.hasSpclChr)) {
        setPasswordValidityError(
          "password must contain multiple symbols of either @, #, $, %, &,(, )"
        );
      } else {
        setPasswordValidityError("");
      }
    };

    const checkConfirmPasswordValidity = () => {
      if (password.trim() !== confirmPassword.trim()) {
        setPasswordValidityError("invalid password, password does not match");
      } else {
        setPasswordValidityError("");
      }
    };

    const timer = setTimeout(() => {
      if (password.trim().length > 0) {
        checkPasswordValidity();
      }

      if (confirmPassword.trim().length > 0) {
        checkConfirmPasswordValidity();
      }
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [passwordChangeHandler, confirmPasswordChangeHandler]);

  // set new password method
  const onsetNewPassword = async (event) => {
    event.preventDefault();

    if (passwordValidityError) {
      return;
    }
    const passwordData = {
      email: data?.data?.email,
      password,
      confirmPassword,
    };

    await setNewPassword(passwordData);
  };

  useEffect(() => {
    if (__isSuccess) {
      navigate("/get-started/sign-in");
    }
  }, [__isSuccess]);

  return (
    <Container className="mt-3">
      {" "}
      <Row>
        {" "}
        <Container className="mb-3">
          <Row>
            {" "}
            <Col>
              {" "}
              <div className="text-center">
                <h2>You are a step closer</h2>

                <p>Set your password to complete registration</p>
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

          {data && (
            <div className="alert alert-success text-center" role="alert">
              {data.message}
            </div>
          )}

          {passwordValidityError && (
            <div className="alert alert-danger text-center" role="alert">
              {passwordValidityError}
            </div>
          )}

          {__isError && (
            <div className="alert alert-danger text-center" role="alert">
              {__error.data.message || "something went wrong"}
            </div>
          )}

          {isSuccess && (
            <Form onSubmit={onsetNewPassword}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  onChange={passwordChangeHandler}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  onChange={confirmPasswordChangeHandler}
                />
              </Form.Group>

              <Button
                type="submit"
                variant="warning"
                style={{ width: "100%" }}
                className={`${__isLoading ? "disabled" : ""}`}>
                {" "}
                <span
                  style={{
                    fontWeight: "700",
                  }}>{`${
                  __isLoading ? "Wait, password processing" : "Submit"
                }`}</span>
                {!isLoading && !__isLoading && !isError && (
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
                {isError && __isError && (
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
            </Form>
          )}
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

export default SetNewRequestPassword;
