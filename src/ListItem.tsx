import React from "react";
import { Form, ListGroup } from "react-bootstrap";

type ListItemProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => any;
};

export const ListItem: React.FC<ListItemProps> = ({
  label,
  checked,
  onChange,
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
        className={className}
      />
    </ListGroup.Item>
  );
};
