import React, { useState } from "react";
import { Row, Col, Button, ListGroup, Form, Modal } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { ModalAddItem } from "./ModalAddItem";

export function List() {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <Container className="mt-5">
      <ModalAddItem visible={showModal} onClose={handleClose} />
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
