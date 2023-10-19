import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const OpcPaymentMethod = () => {
  const navigate = useNavigate()
  const [newAddress, setNewAddress] = useState<boolean>(false)
  const [paymentMainMethod, setpaymentMainMethod] = useState<string>('online')
  const [paymentMethod, setPaymentMethod] = useState<string>('teb')

  const changePaymentMethod = (method: string) => {
    setPaymentMethod(method)
  }
  const changeMainPaymentMethod = (method: string) => {
    setpaymentMainMethod(method)
  }

  const gotoPaymentInfo = () => {
    navigate('/onepagecheckout/opc-payment_info')
  }
  return (
    <ol className="opc rounded bg-gray-100" id="checkout-steps">
      <li id="opc-billing" className="tab-section allow bg-white shadow-md ">
        <div className="step-title d-flex justify-content-between p-3 border-b border-gray-300 text-sm">
          <div className="d-flex align-items-center">
            <span className="number">1</span>
            <h6 className="title ml-4 mb-0">Adresa e faturimit</h6>
          </div>
          <p className="back-link">
            <a
              href="#"
              className="text-primary font-medium m-2 p-2 editbutton"
              // onClick="Checkout.back(); return false; "
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
          <div className="d-flex align-items-center">
            <span className="number">2</span>
            <h6 className="title ml-4 mb-0">Adresa e transportit</h6>
          </div>
          <p className="back-link">
            <a
              href="#"
              className="text-primary font-medium m-2 p-2 hidden editbutton"
              //  onClick="Checkout.back(); return false; "
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
              // onClick="Shipping.save(); sendSelectedAddressEvent('transport')"
            >
              Vazhdo
            </button>
            <div
              id="shipping-please-wait"
              className="w-100 d-flex justify-content-center align-items-center  text-xs"
            >
              Duke u ngarkuar hapi i ardhshëm ...
              <span className="please-wait ml-2"></span>
            </div>
          </div>
        </div>
      </li>

      <li id="opc-shipping_method" className="bg-white shadow-md tab-section">
        <div className="step-title d-flex justify-content-between align-items-center p-3 border-b border-gray-300 text-sm">
          <div className="d-flex align-items-center">
            <span className="number">3</span>
            <h6 className="title mb-0 ml-4">Mënyra e transportit</h6>
          </div>
          <p className="back-link">
            <a
              href="#"
              className="text-primary font-medium m-2 p-2 editbutton "
              // onClick="Checkout.back(); return false; "
            >
              Ndrysho
            </a>
          </p>
        </div>
      </li>

      <li
        id="opc-payment_method"
        className="tab-section bg-white shadow-md active"
      >
        <div className="step-title d-flex justify-content-between align-items-center p-3 border-b border-gray-300 text-sm">
          <div className="d-flex align-items-center">
            <span className="number">4</span>
            <h6 className="title mb-0 ml-4">Mënyra e pagesës</h6>
          </div>
          <p className="back-link">
            <a
              href="#"
              className="text-primary font-medium m-2 p-2 hidden editbutton"
              // onClick="Checkout.back(); return false; "
            >
              Ndrysho
            </a>
          </p>
        </div>
        <div id="checkout-step-payment-method" className="step a-item p-4">
          <form
            action=""
            id="co-payment-method-form"
            data-gtm-form-interact-id="0"
          >
            <div id="checkout-payment-method-load">
              <div className="checkout-data">
                <div className="section payment-method">
                  <ul
                    className="method-list d-flex flex-col mb-4"
                    id="payment-method-block"
                  >
                    <li className="text-sm  d-flex flex-col align-items-start w-100 p-2">
                      <label
                        onClick={() => changeMainPaymentMethod('online')}
                        className="payment-group d-flex align-items-center cursor-pointer"
                      >
                        <input
                          id=""
                          type="radio"
                          name="paymentmethod"
                          value="Payments.Online.Teb"
                          className="mr-2"
                          checked={paymentMainMethod === 'online'}
                        />
                        <i className="icon-payments-online text-base mr-1"></i>
                        <label>
                          Paguaj online (Blerje direkte ose me këste)
                        </label>
                      </label>
                      <span
                        className={`payment-method-container w-100 ${
                          paymentMainMethod === 'online' ? '' : 'hidden'
                        } `}
                      >
                        <span className="d-flex flex-col align-items-center w-100 mt-4 pl-6">
                          <label
                            onClick={() => changePaymentMethod('teb')}
                            className={`payment-method method-name w-100 p-2 border rounded w-100 ${
                              paymentMethod === 'teb'
                                ? ' border-primary shadow-halo'
                                : ''
                            } `}
                          >
                            <span className="d-flex flex-col gap-2">
                              <span className="payment-logo">
                                <label>
                                  <img
                                    src="http://gjirafa50.com/Plugins/Payments.Online.Teb/logo.png"
                                    alt="TEB Bank"
                                    className="max-h-10"
                                  />
                                </label>
                              </span>
                              <label className="text-sm text-gray-700 d-flex flex-col pl-1 text-left">
                                TEB Bank
                                <span className="payment-description text-gray-600 pt-1">
                                  Blerje direkte ose me këste
                                </span>
                              </label>
                            </span>
                          </label>
                        </span>
                        <span className="d-flex flex-col align-items-center w-100 mt-4 pl-6">
                          <label
                            onClick={() => changePaymentMethod('reiffeisen')}
                            className={`payment-method method-name w-100 p-2 border rounded w-100 ${
                              paymentMethod === 'reiffeisen'
                                ? ' border-primary shadow-halo'
                                : ''
                            }`}
                          >
                            <span className="d-flex flex-col gap-2">
                              <span className="payment-logo">
                                <label>
                                  <img
                                    src="http://gjirafa50.com/Plugins/Payments.Online.Raiffeisen/logo.jpg"
                                    alt="Raiffeisen Bank"
                                    className="max-h-10"
                                  />
                                </label>
                              </span>
                              <label className="text-sm text-gray-700 d-flex flex-col pl-1 text-left">
                                Raiffeisen Bank
                                <span className="payment-description text-gray-600 pt-1">
                                  Blerje direkte ose me këste
                                </span>
                              </label>
                            </span>
                          </label>
                        </span>
                        <span className="d-flex flex-col align-items-center w-100 mt-4 pl-6">
                          <label
                            onClick={() => changePaymentMethod('procredit')}
                            className={`payment-method method-name w-100 p-2 border rounded w-100 ${
                              paymentMethod === 'procredit'
                                ? ' border-primary shadow-halo'
                                : ''
                            } `}
                          >
                            <span className="d-flex flex-col gap-2">
                              <span className="payment-logo">
                                <label>
                                  <img
                                    src="http://gjirafa50.com/Plugins/Payments.Online.ProCredit/logo.jpg"
                                    alt="ProCredit Bank"
                                    className="max-h-10"
                                  />
                                </label>
                              </span>
                              <label className="text-sm text-gray-700 d-flex flex-col pl-1 text-left">
                                ProCredit Bank
                                <span className="payment-description text-gray-600 pt-1">
                                  Blerje direkte
                                </span>
                              </label>
                            </span>
                          </label>
                        </span>
                      </span>
                    </li>
                    <li className="text-sm d-flex flex-col align-items-start w-100 p-2">
                      <label
                        onClick={() => changeMainPaymentMethod('cash')}
                        className="payment-group d-flex align-items-center cursor-pointer"
                      >
                        <input
                          id=""
                          type="radio"
                          name="paymentmethod"
                          value="Payments.Cash"
                          className="mr-2"
                          checked={paymentMainMethod === 'cash'}
                        />
                        <i className="icon-payments-cash text-base mr-1"></i>
                        <label>Paguaj me para në dorë</label>
                      </label>
                      <span
                        className={`payment-method-container w-100 ${
                          paymentMainMethod === 'cash' ? '' : 'hidden'
                        } `}
                      >
                        <span className="d-flex flex-col align-items-center w-100 mt-4 pl-6">
                          <label
                            data-payment-method="Payments.Cash"
                            className="payment-method method-name w-100 p-2 border rounded w-100"
                          >
                            <span className="d-flex flex-col gap-2">
                              <span className="payment-logo">
                                <label>
                                  <img
                                    src="http://gjirafa50.com/Plugins/Payments.Cash/logo.jpg"
                                    alt="Paguaj me para në dorë"
                                    className="max-h-10"
                                  />
                                </label>
                              </span>
                              <label className="text-sm text-gray-700 d-flex flex-col pl-1 text-left">
                                Paguaj me para në dorë
                                <span className="payment-description text-gray-600 pt-1">
                                  Paguani me para në dorë gjatë pranimit të
                                  porosisë.
                                </span>
                              </label>
                            </span>
                          </label>
                        </span>
                      </span>
                    </li>
                    <li className="text-sm d-flex flex-col align-items-start w-100 p-2">
                      <label
                        onClick={() => changeMainPaymentMethod('pos')}
                        className="payment-group d-flex align-items-center cursor-pointer"
                      >
                        <input
                          id=""
                          type="radio"
                          name="paymentmethod"
                          value="Payments.Installments.Teb"
                          className="mr-2"
                          checked={paymentMainMethod === 'pos'}
                        />
                        <i className="icon-payments-pos text-base mr-1"></i>
                        <label>Paguaj me POS</label>
                      </label>
                      <span
                        className={`payment-method-container w-100 ${
                          paymentMainMethod === 'pos' ? '' : 'hidden'
                        } `}
                      >
                        <span className="d-flex flex-col align-items-center w-100 mt-4 pl-6">
                          <label
                            data-payment-method="Payments.Installments.Teb"
                            className="payment-method method-name w-100 p-2 border rounded w-100"
                          >
                            <span className="d-flex flex-col gap-2">
                              <span className="payment-logo">
                                <label>
                                  <img
                                    src="http://gjirafa50.com/Plugins/Payments.Installments.Teb/logo.png"
                                    alt="Paguaj me këste (TEB Starcard)"
                                    className="max-h-10"
                                  />
                                </label>
                              </span>
                              <label className="text-sm text-gray-700 d-flex flex-col pl-1 text-left">
                                Paguaj me këste (TEB Starcard)
                                <span className="payment-description text-gray-600 pt-1">
                                  Ju lutem keni parasysh që në kredit kartelën
                                  tuaj duhet të keni limit të mjaftueshëm për
                                  pagesën totale. Tërheqja e kësteve bëhet çdo
                                  muaj nga llogaria juaj debit nga banka
                                  përkatëse.
                                </span>
                              </label>
                            </span>
                          </label>
                        </span>
                        <span className="d-flex flex-col align-items-center w-100 mt-4 pl-6">
                          <label
                            data-payment-method="Payments.Installments.Raiffeisen"
                            className="payment-method method-name w-100 p-2 border rounded w-100"
                          >
                            <span className="d-flex flex-col gap-2">
                              <span className="payment-logo">
                                <label>
                                  <img
                                    src="http://gjirafa50.com/Plugins/Payments.Installments.Raiffeisen/logo.png"
                                    alt="Paguaj me këste (Raiffeisen Bonus Kartelë)"
                                    className="max-h-10"
                                  />
                                </label>
                              </span>
                              <label className="text-sm text-gray-700 d-flex flex-col pl-1 text-left">
                                Paguaj me këste (Raiffeisen Bonus Kartelë)
                                <span className="payment-description text-gray-600 pt-1">
                                  Ju lutem keni parasysh që në kredit kartelën
                                  tuaj duhet të keni limit të mjaftueshëm për
                                  pagesën totale. Tërheqja e kësteve bëhet çdo
                                  muaj nga llogaria juaj debit nga banka
                                  përkatëse.
                                </span>
                              </label>
                            </span>
                          </label>
                        </span>
                        <span className="d-flex flex-col align-items-center w-100 mt-4 pl-6">
                          <label
                            data-payment-method="Payments.POS.ProCredit"
                            className="payment-method method-name w-100 p-2 border rounded w-100"
                          >
                            <span className="d-flex flex-col gap-2">
                              <span className="payment-logo">
                                <label>
                                  <img
                                    src="http://gjirafa50.com/Plugins/Payments.POS.ProCredit/logo.png"
                                    alt="Paguaj me POS (ProCredit Bank)"
                                    className="max-h-10"
                                  />
                                </label>
                              </span>
                              <label className="text-sm text-gray-700 d-flex flex-col pl-1 text-left">
                                Paguaj me POS (ProCredit Bank)
                                <span className="payment-description text-gray-600 pt-1">
                                  Paguani me debit kartelë të bankës ProCredit
                                  në momentin që pranoni porosinë.
                                </span>
                              </label>
                            </span>
                          </label>
                        </span>
                      </span>
                    </li>
                    <li className="text-sm d-flex flex-col align-items-start w-100 p-2">
                      <label
                        onClick={() => changeMainPaymentMethod('transfer')}
                        className="payment-group d-flex align-items-center cursor-pointer"
                      >
                        <input
                          id=""
                          type="radio"
                          name="paymentmethod"
                          value="Payments.CheckMoneyOrder"
                          className="mr-2"
                          checked={paymentMainMethod === 'transfer'}
                        />
                        <i className="icon-payments-banktransfer text-base mr-1"></i>
                        <label>Paguaj me transfer bankar</label>
                      </label>
                      <span
                        className={`payment-method-container w-100 ${
                          paymentMainMethod === 'transfer' ? '' : 'hidden'
                        } `}
                      >
                        {/* style="opacity: 0;" */}
                        <span className="d-flex flex-col align-items-center w-100 mt-4 pl-6">
                          <label
                            data-payment-method="Payments.CheckMoneyOrder"
                            className="payment-method method-name w-100 p-2 border rounded w-100"
                          >
                            <span className="d-flex flex-col gap-2">
                              <span className="payment-logo">
                                <label>
                                  <img
                                    src="http://gjirafa50.com/Plugins/Payments.CheckMoneyOrder/logo.jpg"
                                    alt="Paguaj me transfer bankar"
                                    className="max-h-10"
                                  />
                                </label>
                              </span>
                              <label className="text-sm text-gray-700 d-flex flex-col pl-1 text-left">
                                Paguaj me transfer bankar
                                <span className="payment-description text-gray-600 pt-1">
                                  Ju lutem shënoni numrin e faturës apo porosisë
                                  te detajet e pagesës. Deri në momentin kur
                                  pagesa të figuron në sistemin tonë, porosia
                                  juaj nuk mund të niset.
                                </span>
                              </label>
                            </span>
                          </label>
                        </span>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </form>
          <div
            className="buttons d-flex flex-col align-items-end"
            id="payment-method-buttons-container"
          >
            <button
              type="button"
              name="save"
              className="payment-method-next-step-button btn btn-primary btn-primary-hover shadow-sm"
              onClick={gotoPaymentInfo}
            >
              Vazhdo
            </button>
            <div
              id="payment-method-please-wait"
              className="w-100 hidden justify-content-center align-items-center text-xs"
              style={{ display: 'none' }}
            >
              Duke u ngarkuar hapi i ardhshëm ...
              <span className="please-wait ml-2"></span>
            </div>
          </div>
        </div>
        {/* <div id="checkout-step-payment-method" className="step a-item p-4">
          <form action="" id="co-payment-method-form">
            <div id="checkout-payment-method-load">Payment is not required</div>
          </form>
          <div
            className="buttons d-flex flex-col items-end"
            id="payment-method-buttons-container"
          >
            <button
              type="button"
              name="save"
              className="payment-method-next-step-button btn btn-primary btn-primary-hover shadow-sm"
              // onClick="PaymentMethod.save(); sendPaymentMethodEvent();"
            >
              Vazhdo
            </button>
            <div
              id="payment-method-please-wait"
              className="w-100 d-flex justify-center align-items-center text-xs"
              style={{ display: 'none' }}
            >
              Duke u ngarkuar hapi i ardhshëm ...
              <span className="please-wait ml-2"></span>
            </div>
          </div>
        </div> */}
      </li>

      <li
        id="opc-payment_info"
        className="tab-section bg-white shadow-md rounded-b"
      >
        <div className="step-title d-flex justify-between align-items-center p-3 border-b border-gray-300 text-sm">
          <div className="d-flex align-items-center">
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
            {/* onClick="Checkout.back(); return false; " */}
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
              className="mb-5 d-flex flex-col text-left text-sm"
            >
              checkout.paymentisnotrequired
            </div>
            <div className="customer-entered-delivery-date mb-5 d-flex flex-col">
              <label
                htmlFor="datepicker"
                className="text-sm text-gray-600 mb-2"
              >
                Për datë tjetër të arritjes së porosisë, mund të e caktoni atë
                këtu:
              </label>
              <div className="d-flex align-items-center">
                <label className="relative d-flex align-items-center w-min cursor-pointer">
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
            <div className="terms-of-service py-1 d-flex align-items-center justify-start gap-2">
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
              className="w-100 d-flex justify-center align-items-center text-xs"
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

export default OpcPaymentMethod
