import React, { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";

type ModalAddItemProps = {
  visible: boolean;
  onClose: () => any;
  onAdd: (text: string) => any;
};

export const ModalAddItem: React.FC<ModalAddItemProps> = ({
  visible,
  onClose,
  onAdd,
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const handleAdd = () => {
    const text = ref.current?.value;
    if (text) {
      onAdd(text);
    }
  };

  return (
    <Modal show={visible} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control ref={ref} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="warning" onClick={handleAdd}>
          Add item
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
