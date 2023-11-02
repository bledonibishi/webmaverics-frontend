import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

type OpcShippingMethodPropTypes = {
  handleContinue: (activeStep: string) => void
  shippingMethod: string | null
  setShippingMethod: React.Dispatch<React.SetStateAction<string | null>>
}

const OpcShippingMethod: React.FC<OpcShippingMethodPropTypes> = ({
  handleContinue,
  setShippingMethod,
  shippingMethod,
}) => {
  const continueHandler = () => {
    if (!shippingMethod) {
      return toast.error('You have to select one shipping address')
    } else {
      handleContinue('opc-payment_method')
    }
  }
  return (
    <>
      <form id="co-shipping-method-form" action="">
        <div id="checkout-shipping-method-load">
          <div className="checkout-data">
            <div className="section shipping-method" id="shipping-methods-form">
              <div className="method-list d-flex flex-col align-items-center">
                <label
                  data-shipping-method="STANDARD - Transport falas"
                  htmlFor="shippingoption_0"
                  className={`method-name d-flex gap-4 items-baseline border rounded p-2 mb-5 ${
                    shippingMethod === 'STANDARD - Transport(free)'
                      ? 'border-primary shadow-halo'
                      : ''
                  } `}
                >
                  <span>
                    <input
                      id="shippingoption_0"
                      type="radio"
                      name="shippingoption"
                      value="STANDARD - Transport(free)"
                      className="hidden"
                      onChange={() =>
                        setShippingMethod('STANDARD - Transport(free)')
                      }
                    />
                  </span>

                  <label
                    className="text-sm text-gray-700 text-left"
                    htmlFor="shippingoption_0"
                  >
                    STANDARD - Transport falas
                    <span className="method-description">
                      <p className="text-sm text-gray-600 pt-3">
                        Në cilëndo pikë në Kosovë, porositë që bëhen do të
                        dorëzohen brenda ditëve të shkruara më larte. Për kohë
                        të limituar të gjitha format e transportit për të gjitha
                        produktet do të jenë FALAS! Ju lutemi të shkruani
                        informatat me kujdes që porosia të arrijë në vendin e
                        duhur sa më shpejt.
                      </p>
                    </span>
                  </label>
                </label>
                <label
                  data-shipping-method="Merre në zyret e Gjirafa50"
                  htmlFor="shippingoption_1"
                  className={`method-name d-flex gap-4 items-baseline border rounded p-2 mb-5 ${
                    shippingMethod === 'BYURSELF - Transport(byurself)'
                      ? 'border-primary shadow-halo'
                      : ''
                  } `}
                >
                  <span>
                    <input
                      id="shippingoption_1"
                      type="radio"
                      name="shippingoption"
                      value="Merre në zyret e Gjirafa50___Shipping.FixedByWeightByTotal"
                      className="hidden"
                      onChange={() =>
                        setShippingMethod('BYURSELF - Transport(byurself)')
                      }
                    />
                  </span>

                  <label
                    className="text-sm text-gray-700 text-left"
                    htmlFor="shippingoption_1"
                  >
                    Merre në zyret e Gjirafa50
                    <span className="method-description">
                      <p className="text-sm text-gray-600 pt-3">
                        Merreni porosinë tuaj në zyret tona pasi të pranoni
                        konfirmimin se porosia juaj është bërë gati. Afati për
                        pranimin e porosisë është 3 ditë pune pas njoftimit të
                        pranuar.
                      </p>
                    </span>
                  </label>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div
          className="buttons d-flex flex-col align-items-end"
          id="shipping-method-buttons-container"
        >
          <button
            type="button"
            className="shipping-method-next-step-button btn btn-primary btn-primary-hover shadow-sm"
            // onclick="ShippingMethod.save(); sendTransportMethodEvent();"
            onClick={continueHandler}
          >
            Vazhdo
          </button>
          <div
            id="shipping-method-please-wait"
            className="w-100  justify-content-center align-items-center hidden text-xs"
            style={{ display: 'none' }}
          >
            Duke u ngarkuar hapi i ardhshëm ...
            <span className="please-wait ml-2"></span>
          </div>
        </div>
      </form>
    </>
  )
}

export default OpcShippingMethod
