import React from "react";
import { Form, ListGroup } from "react-bootstrap";

type ListItemProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => any;
  id: string;
};

export const ListItem: React.FC<ListItemProps> = ({
  label,
  checked,
  onChange,
  id,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  const className = checked ? "checked-item" : "";

  return (
    <ListGroup.Item>
      <Form.Check
        checked={checked}
        onChange={handleChange}
        inline
        label={label}
        id={id}
        className={className}
      />
    </ListGroup.Item>
  );
};
