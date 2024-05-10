import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";
import { useChangeNameMutation } from "../../../lib/APIS/userApi/userApi";
import ModalMock from "./ModalMock";

const NameUpdateModal = ({ onShowModal }) => {
  const [changeName, { isLoading, isSuccess, isError, error }] =
    useChangeNameMutation();
  const { user } = useSelector((state) => state.userState);

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [about, setAbout] = useState(user.about);
  const [generalError, setGeneralError] = useState("");

  const firstNameChangeHandler = (event) => {
    setFirstName(event.target.value);
  };

  const lastNameChangeHandler = (event) => {
    setLastName(event.target.value);
  };

  const aboutChangeHandler = (event) => {
    setAbout(event.target.value);
  };

  const onUpdateUserDetails = async (event) => {
    event.preventDefault();

    if (!firstName || !lastName || !about) {
      return setGeneralError("All fields are required");
    }
    const updateData = {
      firstName,
      lastName,
      about,
    };

    await changeName(updateData);
  };

  useEffect(() => {
    if (isSuccess) {
      onShowModal();
    }
  }, [isSuccess]);

  return (
    <ModalMock>
      <Modal.Header>
        <Modal.Title>
          <strong> Edit Profile </strong>
        </Modal.Title>
      </Modal.Header>

      {isError && (
        <div className="alert alert-danger" role="alert">
          {error.data.message}
        </div>
      )}
      {generalError && (
        <div className="alert alert-danger" role="alert">
          {generalError}
        </div>
      )}
      {isLoading && (
        <div className="text-center mb-3">
          <div className="spinner-grow text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <Form onSubmit={onUpdateUserDetails}>
        <Modal.Body>
          <div className="form-group">
            <Form.Label>First Name</Form.Label>
            <input
              onChange={firstNameChangeHandler}
              type="text"
              className="form-control"
              value={firstName}
            />
          </div>

          <div className="form-group">
            <Form.Label>Last Name</Form.Label>
            <input
              onChange={lastNameChangeHandler}
              type="text"
              className="form-control"
              value={lastName}
            />
          </div>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>About</Form.Label>
            <Form.Control
              onChange={aboutChangeHandler}
              as="textarea"
              rows={3}
              value={about}
            />
          </Form.Group>

          <Modal.Footer>
            <Button variant="secondary" onClick={onShowModal}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Form>
    </ModalMock>
  );
};

export default NameUpdateModal;
