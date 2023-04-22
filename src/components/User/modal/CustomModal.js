import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

function CustomModal(props) {
  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle} size={props.size}>
      <ModalHeader toggle={props.toggle}>{props.title}</ModalHeader>
      <ModalBody>{props.children}</ModalBody>
    </Modal>
  );
}

export default CustomModal;
