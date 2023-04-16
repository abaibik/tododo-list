import React, { useState } from "react";
import { Row, Col, Button, ListGroup } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { ModalAddItem } from "./ModalAddItem";
import { ListItem } from "./ListItem";
import { v4 as uuidv4 } from "uuid";

type ToDoItem = {
  text: string;
  done: boolean;
  id: string;
};

export function List() {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const [items, setItems] = useState<ToDoItem[]>([
    { text: "Buy some food", done: false, id: uuidv4() },
    { text: "Feed cats", done: false, id: uuidv4() },
  ]);

  const handleAdd = (text: string) => {
    setItems([...items, { text, done: false, id: uuidv4() }]);
    handleClose();
  };

  const uncheckedItems = items.filter((item) => !item.done);
  const checkedItems = items.filter((item) => item.done);

  const handleChange = (checked: boolean, id: string) => {
    const currentItemIdx = items.findIndex((el) => el.id === id);
    const currentItem = items[currentItemIdx];
    const itemsWithoutCurrent = items.filter(
      (item, index) => index !== currentItemIdx
    );
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
            {uncheckedItems.map((item) => (
              <ListItem
                key={item.text}
                label={item.text}
                checked={item.done}
                onChange={(checked) => {
                  handleChange(checked, item.id);
                }}
              />
            ))}

            {checkedItems.map((item) => (
              <ListItem
                key={item.text}
                label={item.text}
                checked={item.done}
                onChange={(checked) => {
                  handleChange(checked, item.id);
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
