import { Modal, Button } from 'react-bootstrap';
import React, { useState } from 'react';

export function CustomModal(props: any) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {props.buttonType === 'toggle' ? (
        <span className="text-right">
          <div className="">
            <label className="switch">
              <input type="checkbox" onChange={handleShow} />
              <span className="slider"></span>
            </label>
          </div>
        </span>
      ) : (
        <Button variant="primary" onClick={handleShow}>
          {props.buttonText}
        </Button>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
      </Modal>
    </>
  );
}
