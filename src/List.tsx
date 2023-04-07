import React, { useState } from "react";
import { Row, Col, Button, ListGroup, Form, Modal } from "react-bootstrap";
import Container from "react-bootstrap/Container";

export function List() {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <Container className="mt-5">
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add item</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="warning" onClick={handleClose}>
            Add item
          </Button>
        </Modal.Footer>
      </Modal>
      <Row>
        <Col>
          <ListGroup>
            <ListGroup.Item>
              <Form.Check inline label="Buy the food" />
            </ListGroup.Item>
            <ListGroup.Item>
              <Form.Check inline label="Feed cats" />
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col>
          <Button variant="outline-warning" onClick={handleShow}>
            Add item
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
