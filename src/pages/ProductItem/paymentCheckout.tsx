import axiosInstance from '@/api/axiosInstance'
import React, { useState, useEffect } from 'react'
// import './App.css'
import { loadStripe } from '@stripe/stripe-js'
import { useStripe, useElements, Elements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe(
  'pk_test_51O6hLnBcLIAO3WbOPpjFpaQxGHDBZRkv0SSZxmsXzP46RL4ZguQ5pEZ8JSnTrK6OecJNPwrGZFj61yESSBDFxBYf00RW6LNUCs'
)

type Test = {
  message: string
}
type ProductDisplayType = {
  makeStripePayment: (e: any) => Promise<void>
}
type Test1 = {
  productID: string
}

const ProductDisplay: React.FC<ProductDisplayType> = ({
  makeStripePayment,
}) => (
  <section>
    <div className="product">
      <img
        src="https://i.imgur.com/EHyR2nP.png"
        alt="The cover of Stubborn Attachments"
      />
      <div className="description">
        <h3>Stubborn Attachments</h3>
        <h5>$20.00</h5>
      </div>
    </div>
    <form onSubmit={makeStripePayment}>
      <button type="submit">Checkout</button>
    </form>
  </section>
)

const Message: React.FC<Test> = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
)

const PaymentCheckout: React.FC<Test1> = ({ productID }) => {
  const [message, setMessage] = useState('')
  const stripe = useStripe() // Get stripe instance
  const elements = useElements() // Get elements instance

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search)

    if (query.get('success')) {
      setMessage('Order placed! You will receive an email confirmation.')
    }

    if (query.get('canceled')) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      )
    }
  }, [])

  const makeStripePayment = async (e: any) => {
    e.preventDefault()

    try {
      if (!stripe || !elements) {
        return
      }

      const session = await axiosInstance.get(
        `api/v1/payments/checkout-session/${productID}`
      )
      console.log('session', session)

      await stripe.redirectToCheckout({
        sessionId: session.data.session.id,
      })
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <Elements stripe={stripePromise}>
      {message ? (
        <Message message={message} />
      ) : (
        <ProductDisplay makeStripePayment={makeStripePayment} />
      )}
    </Elements>
  )
}

export default PaymentCheckout
