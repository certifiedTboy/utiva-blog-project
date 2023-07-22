import React, { Fragment } from "react";
import reactDom from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.showModal}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};
const ModalMock = (props) => {
  const portalElements = document.getElementById("modal");
  return (
    <Fragment>
      {reactDom.createPortal(
        <Backdrop onClick={props.hideModal} />,
        portalElements
      )}
      {reactDom.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElements
      )}
    </Fragment>
  );
};

export default ModalMock;
