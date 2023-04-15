import React, { useState } from "react";
import { Row, Col, Button, ListGroup } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { ModalAddItem } from "./ModalAddItem";
import { ListItem } from "./ListItem";

type ToDoItem = {
  text: string;
  done: boolean;
};

export function List() {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const [items, setItems] = useState<ToDoItem[]>([
    { text: "Buy some food", done: false },
    { text: "Feed cats", done: false },
  ]);

  const handleAdd = (text: string) => {
    setItems([...items, { text, done: false }]);
    handleClose();
  };

  const handleChange = (checked: boolean, idx: number) => {
    const currentItem = items[idx];
    const itemsWithoutCurrent = items.filter((item, index) => index !== idx);
    setItems([...itemsWithoutCurrent, { ...currentItem, done: checked }]);
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
            {items.map((item, idx) => (
              <ListItem
                key={item.text}
                label={item.text}
                checked={item.done}
                onChange={(checked) => {
                  handleChange(checked, idx);
                }}
              />
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
