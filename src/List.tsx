import React, { useState } from "react";
import { Row, Col, Button, ListGroup, Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { ModalAddItem } from "./ModalAddItem";
import { ListItem } from "./ListItem";

export function List() {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const [items, setItems] = useState(["Buy some food", "Feed cats"]);
  const handleAdd = (text: string) => {
    setItems([...items, text]);
    handleClose();
  };

  return (
    <Container className="mt-5">
      <ModalAddItem
        visible={showModal}
        onClose={handleClose}
        onAdd={handleAdd}
      />
      <Row>
        <Col>
          <ListGroup>
            {items.map((item) => (
              <ListItem key={item} label={item} />
            ))}
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
