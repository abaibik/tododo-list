import React from "react";
import { Form, ListGroup } from "react-bootstrap";

type ListItemProps = {
  label: string;
};

export const ListItem: React.FC<ListItemProps> = ({ label }) => {
  return (
    <ListGroup.Item>
      <Form.Check inline label={label} />
    </ListGroup.Item>
  );
};
