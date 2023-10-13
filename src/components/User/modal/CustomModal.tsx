import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'

type CustomModalProps = {
  isOpen: boolean
  toggle: () => void
  size: string
  title: string
  children: React.ReactNode
}

function CustomModal({
  isOpen,
  toggle,
  size,
  title,
  children,
}: CustomModalProps) {
  return (
    <Modal isOpen={isOpen} toggle={toggle} size={size}>
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
      <ModalBody>{children}</ModalBody>
    </Modal>
  )
}

export default CustomModal
