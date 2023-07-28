import React, { Fragment } from "react";
import ModalMock from "../user-profile/modal/ModalMock";
import { Modal } from "react-bootstrap";
import { Interweave } from "interweave";
import { transform } from "../blogs/single-blog/Transform";
import "./PostBuilder.css";

const PreviewModal = ({ title, content, onShowModal }) => {
  return (
    <ModalMock>
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>{title ? title : ""}</Modal.Title>
          </Modal.Header>

          <Modal.Body className="modal-body">
            <Fragment>
              <Interweave content={content} transform={transform} />
            </Fragment>
          </Modal.Body>

          <Modal.Footer>
            <button className="btn-warning" onClick={onShowModal}>
              Close
            </button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </ModalMock>
  );
};

export default PreviewModal;
