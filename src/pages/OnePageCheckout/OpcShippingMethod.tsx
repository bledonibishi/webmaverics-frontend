import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const OpcShippingMethod = () => {
  const navigate = useNavigate()
  const [newAddress, setNewAddress] = useState<boolean>(false)

  const gotoPaymentMethod = () => {
    navigate('/onepagecheckout/opc-payment_method')
  }
  return (
    <ol className="opc rounded bg-gray-100" id="checkout-steps">
      <li id="opc-billing" className="tab-section allow bg-white shadow-md ">
        <div className="step-title d-flex justify-content-between p-3 border-b border-gray-300 text-sm">
          <div className="d-flex items-center">
            <span className="number">1</span>
            <h6 className="title ml-4 mb-0">Adresa e faturimit</h6>
          </div>
          <p className="back-link">
            <a
              href="/onepagecheckout/opc-billing"
              className="text-primary font-medium m-2 p-2 editbutton"
              // onclick="Checkout.back(); return false; "
            >
              Ndrysho
            </a>
          </p>
        </div>
      </li>
      <li
        id="opc-shipping"
        className="tab-section bg-white shadow-md rounded-t "
      >
        <div className="step-title d-flex justify-content-between align-items-center  p-3 border-b border-gray-300 text-sm">
          <div className="d-flex items-center">
            <span className="number">2</span>
            <h6 className="title ml-4 mb-0">Adresa e transportit</h6>
          </div>
          <p className="back-link">
            <a
              href="#"
              className="text-primary font-medium m-2 p-2 hidden editbutton"
              //  onclick="Checkout.back(); return false; "
            >
              Ndrysho
            </a>
          </p>
        </div>
        <div
          id="checkout-step-shipping"
          className="step a-item p-4"
          style={{ display: 'none' }}
        >
          <form action="" id="co-shipping-form">
            <div id="checkout-shipping-load"></div>
          </form>
          <div
            className="buttons d-flex items-end flex-col"
            id="shipping-buttons-container"
          >
            <button
              type="button"
              className="new-address-next-step-button btn btn-primary btn-primary-hover shadow-sm"
              // onclick="Shipping.save(); sendSelectedAddressEvent('transport')"
            >
              Vazhdo
            </button>
            <div
              id="shipping-please-wait"
              className="w-full d-flex justify-content-center align-items-center  text-xs"
            >
              Duke u ngarkuar hapi i ardhshëm ...
              <span className="please-wait ml-2"></span>
            </div>
          </div>
        </div>
      </li>
      <li
        id="opc-shipping_method"
        className="bg-white shadow-md tab-section active"
      >
        <div className="step-title flex justify-between items-center p-3 border-b border-gray-300 text-sm">
          <div className="d-flex items-center">
            <span className="number">3</span>
            <h6 className="title mb-0 ml-4">Mënyra e transportit</h6>
          </div>
          <p className="back-link">
            <a
              href="#"
              className="text-primary font-medium m-2 p-2 editbutton hidden"
              // onclick="Checkout.back(); return false; "
            >
              Ndrysho
            </a>
          </p>
        </div>
        <div
          id="checkout-step-shipping-method"
          className="step a-item p-4"
          //   style={{ display: 'none' }}
        >
          <form id="co-shipping-method-form" action="">
            <div id="checkout-shipping-method-load">
              <div className="checkout-data">
                <div
                  className="section shipping-method"
                  id="shipping-methods-form"
                >
                  <div className="method-list d-flex flex-col align-items-center">
                    <label
                      data-shipping-method="STANDARD - Transport falas"
                      htmlFor="shippingoption_0"
                      className="method-name d-flex gap-4 items-baseline border rounded p-2 mb-6 border-primary shadow-halo"
                    >
                      <span>
                        <input
                          id="shippingoption_0"
                          type="radio"
                          name="shippingoption"
                          value="STANDARD - Transport falas___Shipping.FixedByWeightByTotal"
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
                            dorëzohen brenda ditëve të shkruara më larte. Për
                            kohë të limituar të gjitha format e transportit për
                            të gjitha produktet do të jenë FALAS! Ju lutemi të
                            shkruani informatat me kujdes që porosia të arrijë
                            në vendin e duhur sa më shpejt.
                          </p>
                        </span>
                      </label>
                    </label>
                    <label
                      data-shipping-method="Merre në zyret e Gjirafa50"
                      htmlFor="shippingoption_1"
                      className="method-name d-flex gap-4 items-baseline border rounded p-2 mb-6 "
                    >
                      <span>
                        <input
                          id="shippingoption_1"
                          type="radio"
                          name="shippingoption"
                          value="Merre në zyret e Gjirafa50___Shipping.FixedByWeightByTotal"
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
                            konfirmimin se porosia juaj është bërë gati. Afati
                            për pranimin e porosisë është 3 ditë pune pas
                            njoftimit të pranuar.
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
                onClick={gotoPaymentMethod}
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
        </div>
      </li>
      <li id="opc-payment_method" className="tab-section bg-white shadow-md">
        <div className="step-title flex justify-between items-center p-3 border-b border-gray-300 text-sm">
          <div className="d-flex items-center">
            <span className="number">4</span>
            <h6 className="title mb-0 ml-4">Mënyra e pagesës</h6>
          </div>
          <p className="back-link">
            <a
              href="#"
              className="text-primary font-medium m-2 p-2 hidden editbutton"
              // onclick="Checkout.back(); return false; "
            >
              Ndrysho
            </a>
          </p>
        </div>
        <div
          id="checkout-step-payment-method"
          className="step a-item p-4"
          style={{ display: 'none' }}
        >
          <form action="" id="co-payment-method-form">
            <div id="checkout-payment-method-load">Payment is not required</div>
          </form>
          <div
            className="buttons flex flex-col items-end"
            id="payment-method-buttons-container"
          >
            <button
              type="button"
              name="save"
              className="payment-method-next-step-button btn btn-primary btn-primary-hover shadow-sm"
              // onclick="PaymentMethod.save(); sendPaymentMethodEvent();"
            >
              Vazhdo
            </button>
            <div
              id="payment-method-please-wait"
              className="w-full flex justify-center items-center text-xs"
              style={{ display: 'none' }}
            >
              Duke u ngarkuar hapi i ardhshëm ...
              <span className="please-wait ml-2"></span>
            </div>
          </div>
        </div>
      </li>
      <li
        id="opc-payment_info"
        className="tab-section bg-white shadow-md rounded-b"
      >
        <div className="step-title flex justify-between items-center p-3 border-b border-gray-300 text-sm">
          <div className="d-flex items-center">
            <span className="number">5</span>
            <h6 className="title mb-0 ml-4">Të dhëna për dërgesë dhe pagesë</h6>
          </div>
          <p className="back-link">
            <a
              href="#"
              className="text-primary font-medium m-2 p-2 hidden editbutton"
            >
              Ndrysho
            </a>
            {/* onclick="Checkout.back(); return false; " */}
          </p>
        </div>
        <div
          id="checkout-step-payment-info"
          className="step a-item p-4"
          style={{ display: 'none' }}
        >
          <form action="" id="co-payment-info-form">
            <div
              id="checkout-payment-info-load"
              className="mb-5 flex flex-col text-left text-sm"
            >
              checkout.paymentisnotrequired
            </div>
            <div className="customer-entered-delivery-date mb-5 flex flex-col">
              <label
                htmlFor="datepicker"
                className="text-sm text-gray-600 mb-2"
              >
                Për datë tjetër të arritjes së porosisë, mund të e caktoni atë
                këtu:
              </label>
              <div className="d-flex items-center">
                <label className="relative flex items-center w-min cursor-pointer">
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
            <div className="d-flex flex-col w-full bg-gray-100 p-2 rounded mb-4">
              <div className="d-flex flex-col text-left">
                <label
                  htmlFor="order-comment"
                  className="text-sm text-gray-600"
                >
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
            <div className="terms-of-service py-1 flex items-center justify-start gap-2">
              <input
                id="termsofservice"
                type="checkbox"
                name="termsofservice"
              />
              <label
                htmlFor="termsofservice"
                className="text-xs md:text-sm text-left"
              >
                Duke klikuar këtë, unë i pranoj Kushtet e Përdorimit.
              </label>
              <a className="read text-primary" id="read-terms">
                (Lexo këtu)
              </a>
            </div>
            <div
              id="terms-of-service-warning-box"
              title="Kushtet e përdorimit"
              style={{ display: 'none' }}
            >
              <p>
                Ju lusim që të pranoni Termet dhe Kushtet e Përdorimit në mënyrë
                që të mund ta bëni porosinë.
              </p>
            </div>
          </form>
          <div
            className="buttons flex flex-col items-end"
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
              className="w-full flex justify-center items-center text-xs"
              style={{ display: 'none' }}
            >
              Duke bërë porosinë
              <span className="please-wait ml-2"></span>
            </div>
          </div>
        </div>
      </li>
    </ol>
  )
}

export default OpcShippingMethod
