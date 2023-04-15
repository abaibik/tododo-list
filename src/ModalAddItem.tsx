import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

type ModalAddItemProps = {
  visible: boolean;
  onClose: () => any;
};

export const ModalAddItem: React.FC<ModalAddItemProps> = ({
  visible,
  onClose,
}) => {
  return (
    <Modal show={visible} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add item</Modal.Title>
      </Modal.Header>
      <Modal.Body></Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="warning" onClick={onClose}>
          Add item
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
