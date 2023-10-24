import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type OpcPaymentMethodPropTypes = {
  handleContinue: (activeStep: string) => void
}

const OpcPaymentMethod: React.FC<OpcPaymentMethodPropTypes> = ({
  handleContinue,
}) => {
  const [paymentMainMethod, setpaymentMainMethod] = useState<string>('online')
  const [paymentMethod, setPaymentMethod] = useState<string>('teb')

  const changePaymentMethod = (method: string) => {
    setPaymentMethod(method)
  }
  const changeMainPaymentMethod = (method: string) => {
    setpaymentMainMethod(method)
  }

  return (
    <>
      <form action="" id="co-payment-method-form" data-gtm-form-interact-id="0">
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
                    <label>Paguaj online (Blerje direkte ose me këste)</label>
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
                              Ju lutem keni parasysh që në kredit kartelën tuaj
                              duhet të keni limit të mjaftueshëm për pagesën
                              totale. Tërheqja e kësteve bëhet çdo muaj nga
                              llogaria juaj debit nga banka përkatëse.
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
                              Ju lutem keni parasysh që në kredit kartelën tuaj
                              duhet të keni limit të mjaftueshëm për pagesën
                              totale. Tërheqja e kësteve bëhet çdo muaj nga
                              llogaria juaj debit nga banka përkatëse.
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
                              Paguani me debit kartelë të bankës ProCredit në
                              momentin që pranoni porosinë.
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
                              Ju lutem shënoni numrin e faturës apo porosisë te
                              detajet e pagesës. Deri në momentin kur pagesa të
                              figuron në sistemin tonë, porosia juaj nuk mund të
                              niset.
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
          onClick={() => handleContinue('opc-payment_info')}
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
    </>
  )
}

export default OpcPaymentMethod
