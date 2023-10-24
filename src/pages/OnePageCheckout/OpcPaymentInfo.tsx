import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type OpcPaymentInfoPropTypes = {
  handleContinue: (activeStep: string) => void
}

const OpcPaymentInfo: React.FC<OpcPaymentInfoPropTypes> = ({
  handleContinue,
}) => {
  const navigate = useNavigate()
  const [newAddress, setNewAddress] = useState<boolean>(false)

  const gotoPaymentMethod = () => {
    navigate('/onepagecheckout/opc-payment_method')
  }
  return (
    <>
      <form action="" id="co-payment-info-form">
        <div
          id="checkout-payment-info-load"
          className="mb-3 d-flex flex-col text-left text-sm"
        >
          checkout.paymentisnotrequired
        </div>
        <div className="customer-entered-delivery-date mb-3 d-flex flex-col">
          <label htmlFor="datepicker" className="text-sm text-gray-600 mb-2">
            Për datë tjetër të arritjes së porosisë, mund të e caktoni atë këtu:
          </label>
          <div className="d-flex align-items-center">
            <label className="position-relative d-flex align-items-center w-min cursor-pointer">
              <input
                name="customer-entered-delivery-date"
                className="cursor-pointer"
                data-toggle="datepicker"
                placeholder="DD.MM.YYYY"
              />
              <i className="icon-calendar-event-month text-xl text-gray-600 absolute right-2"></i>
            </label>
            <i className="icon-close-cancel text-lg text-gray-600 ml-2 cursor-pointer hidden"></i>
          </div>
          <span
            id="validation-for-customer-entered-delivery-date"
            className="text-[#e15726] text-sm p-1"
          ></span>
        </div>
        <div className="d-flex flex-col w-100 bg-gray-100 p-2 rounded mb-4">
          <div className="d-flex flex-col text-left">
            <label htmlFor="order-comment" className="text-sm text-gray-600">
              Ju mund të lini ndonjë koment këtu:
            </label>
            <textarea
              className="border rounded border-gray-100"
              id="order-comment"
              name="order-comment"
              rows={3}
              cols={60}
              maxLength={160}
            ></textarea>
          </div>
        </div>
      </form>
      <div
        className="buttons d-flex flex-col items-end"
        id="payment-info-buttons-container"
      >
        <button
          type="button"
          className="payment-info-next-step-button btn btn-primary btn-primary-hover shadow-sm"
        >
          Konfirmo
        </button>
        <div
          id="payment-info-please-wait"
          className="w-100 justify-content-center align-items-center text-xs"
          style={{ display: 'none' }}
        >
          Duke bërë porosinë
          <span className="please-wait ml-2"></span>
        </div>
      </div>
    </>
  )
}

export default OpcPaymentInfo
