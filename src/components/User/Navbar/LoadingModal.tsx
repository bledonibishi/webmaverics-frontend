import LoadingBar from '@/ui/Loading/LoadingBar'
import React from 'react'
import { Modal } from 'react-bootstrap'
import { Button } from 'reactstrap'

type ModalProps = {
  show: boolean
  onHide: () => void
}

const LoadingModal: React.FC<ModalProps> = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Body>
        <div className="shadow-bottom p-4 d-flex flex-col align-items-center">
          <span className="d-flex align-items-center justify-content-center">
            Loging out
          </span>
          <span className="w-20 h-20 d-flex align-items-center justify-content-center mr-4">
            <LoadingBar height="50px" size={'50'} />
          </span>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default LoadingModal
