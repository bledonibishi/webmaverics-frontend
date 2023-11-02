import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import {
  CardElement,
  useStripe,
  useElements,
  loadStripe,
  Elements,
} from '@stripe/react-stripe-js'

type PaymentTypes = {
  show: boolean
  onHide: () => void
  productID: string
  makeStripePayment: (e: any) => Promise<void>
}

const stripePromise = loadStripe(
  'pk_test_51O6hLnBcLIAO3WbOPpjFpaQxGHDBZRkv0SSZxmsXzP46RL4ZguQ5pEZ8JSnTrK6OecJNPwrGZFj61yESSBDFxBYf00RW6LNUCs'
)

const PaymentModal: React.FC<PaymentTypes> = ({
  show,
  onHide,
  productID,
  makeStripePayment,
}) => {
  const stripe = useStripe()
  const elements = useElements()
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Elements stripe={stripePromise}>
          <CardElement />
        </Elements>
        <Button variant="success" onClick={makeStripePayment}>
          Buy
        </Button>
      </Modal.Body>
    </Modal>
  )
}

export default PaymentModal
