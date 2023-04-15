import React, { useState } from "react";
import { Form, ListGroup } from "react-bootstrap";

type ListItemProps = {
  label: string;
};

export const ListItem: React.FC<ListItemProps> = ({ label }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const className = checked ? "checked-item" : "";

  return (
    <ListGroup.Item>
      <Form.Check
        checked={checked}
        onChange={handleChange}
        inline
        label={label}
        className={className}
      />
    </ListGroup.Item>
  );
};
