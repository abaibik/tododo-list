import React from "react";
import { Form, ListGroup } from "react-bootstrap";
import deleteIcon from "./images/icons8-close.svg";
import "./App.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Button from "react-bootstrap/Button";
import Tooltip from "react-bootstrap/Tooltip";

//Close icon by https://icons8.com

type ListItemProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => any;
  id: string;
  onDelete: () => any;
};

export const ListItem: React.FC<ListItemProps> = ({
  label,
  checked,
  onChange,
  id,
  onDelete,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  const checkedClassName = checked ? "checked-item" : "";

  return (
    <ListGroup.Item>
      <div className="list-item-group-flex">
        <Form.Check
          checked={checked}
          onChange={handleChange}
          inline
          label={label}
          id={id}
          className={checkedClassName}
        />
        <OverlayTrigger
          placement="left"
          overlay={
            <Tooltip id="button-delete-tooltip">Delete from the list</Tooltip>
          }
        >
          {({ ref, ...triggerHandler }) => (
            <Button
              variant="link"
              {...triggerHandler}
              className="d-inline-flex align-items-center"
              onClick={onDelete}
            >
              <img
                alt="delete button"
                className="delete-icon"
                src={deleteIcon}
                ref={ref}
              />
            </Button>
          )}
        </OverlayTrigger>
      </div>
    </ListGroup.Item>
  );
};
