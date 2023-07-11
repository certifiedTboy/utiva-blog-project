import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";

const DescriptionPopUp = ({ showA, description }) => {
  return (
    <Row style={{ position: "absolute" }}>
      <Col md={12} className="mb-2">
        <Toast show={showA}>
          <Toast.Body>{description}</Toast.Body>
        </Toast>
      </Col>
    </Row>
  );
};

export default DescriptionPopUp;
