import React, { useState } from "react";
import { Row, Col, Button, ListGroup } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { ModalAddItem } from "./ModalAddItem";
import { ListItem } from "./ListItem";
import {
  useGetAllItemsQuery,
  useAddListItemMutation,
  useChangeDoneStatusMutation,
  useDeleteItemMutation,
} from "./services/item";

export type ToDoItem = {
  text: string;
  done: boolean;
  id: string;
};

type ListProps = {
  dataTestId: string;
};

export const List: React.FC<ListProps> = ({ dataTestId }) => {
  const { data: items, error, isLoading } = useGetAllItemsQuery();
  const [addNewListItem] = useAddListItemMutation();
  const [changeDoneStatus] = useChangeDoneStatusMutation();
  const [deleteItem] = useDeleteItemMutation();

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleAdd = (text: string) => {
    addNewListItem({ text });
    handleClose();
  };

  if (error) {
    return <>Oh no, there was an error</>;
  }

  if (isLoading || !items) {
    return <>Loading...</>;
  }

  const uncheckedItems = items.filter((item) => !item.done);
  const checkedItems = items.filter((item) => item.done);

  const handleChange = (checked: boolean, id: string) => {
    changeDoneStatus({ id, done: checked });
  };

  const handleDelete = (id: string) => {
    deleteItem({ id });
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
          <ListGroup data-testid={dataTestId}>
            {uncheckedItems.map((item) => (
              <ListItem
                id={item.id}
                key={item.id}
                label={item.text}
                checked={item.done}
                onChange={(checked) => {
                  handleChange(checked, item.id);
                }}
                onDelete={() => {
                  handleDelete(item.id);
                }}
              />
            ))}

            {checkedItems.map((item) => (
              <ListItem
                id={item.id}
                key={item.id}
                label={item.text}
                checked={item.done}
                onChange={(checked) => {
                  handleChange(checked, item.id);
                }}
                onDelete={() => {
                  handleDelete(item.id);
                }}
              />
            ))}
          </ListGroup>
        </Col>
        <Col>
          <Button variant="outline-warning" onClick={handleShow}>
            Add new item
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
