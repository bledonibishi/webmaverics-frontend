import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type OpcPaymentInfoPropTypes = {
  handleContinue: (activeStep: string) => void
  paymentMethod: string
  createOrderHandler: () => Promise<void>
}

const OpcPaymentInfo: React.FC<OpcPaymentInfoPropTypes> = ({
  handleContinue,
  paymentMethod,
  createOrderHandler,
}) => {
  const paymentInfo: any = {
    'TEB Bank': {
      content:
        'Kryeni pagesën online me kredit apo debit kartelat e bankës tuaj (të cilësdo bankë), përmes sistemit të pagesave të mundësuar nga Teb.',
    },
    'Raiffeisen Bank': {
      content:
        'Paguani me kredit apo debit kartelat e bankës tuaj (të cilësdo bankë), përmes sistemit të pagesave të mundësuar nga Raiffeisen Bank.',
    },
    'Procredit Bank': {
      content:
        'Kryeni pagesën online me kredit apo debit kartelat e bankës tuaj (të cilësdo bankë), përmes sistemit të pagesave të mundësuar nga ProCredit Bank.',
    },
    'Paguaj me para në dorë': {
      content: (
        <p className="d-flex flex-col">
          Informata shtesë:
          <strong className="text-primary">
            Pasi ta pranoni produktin, pagesën mund ta bëni me para në dorë.
          </strong>
        </p>
      ),
    },
    'Paguaj me këste (TEB Starcard)': {
      content: (
        <p className="d-flex flex-col">
          Informata shtesë:
          <strong className="text-primary">
            Pagesen ju do ta bëni gjatë pranimit të produktit me aparatin POS.
          </strong>
        </p>
      ),
    },
    'Paguaj me këste (Raiffeisen Bonus Kartelë)': {
      content: (
        <p>
          Informata shtesë:
          <strong className="color-primary">
            Pagesen ju do ta bëni gjatë pranimit të produktit me aparatin POS.
          </strong>
        </p>
      ),
    },
    'Paguaj me POS (ProCredit Bank)': {
      content: '',
    },
    'Paguaj me transfer bankar': {
      content: (
        <div className="info flex flex-col items-center">
          <table width="100%" cellPadding={0} cellSpacing={0}>
            <tbody>
              <tr>
                <td>
                  <h3>Informata shtesë:</h3>{' '}
                  <p>
                    <span style={{ color: '#000000' }}>
                      Ju lusim të keni parasysh që porositë nuk mund të dërgohen
                      (apo të vini të i merrni) deri në momentin kur
                      transaksioni figuron edhe në sistemin tonë bankar. Pra,
                      dëshmia e pagesës nuk është hapi përfundimtar.{' '}
                    </span>
                  </p>{' '}
                  <p>
                    <span style={{ color: '#000000' }}>
                      Gjithashtu, ju lutemi keni parasysh që pas përgatitjes së
                      porosisë, pagesa duhet të bëhet brenda 3 ditëve, në të
                      kundërtën detyrohemi që të bëjmë anulimin e
                      porosisë.dëshmia e pagesës nuk është hapi përfundimtar.
                    </span>
                  </p>{' '}
                  <p>&nbsp;</p>{' '}
                  <p>
                    Banka: <strong>ProCredit Bank Kosovo J.S.C.</strong>
                  </p>{' '}
                  <p>
                    <span style={{ color: '#555555' }}>Emri kompanisë:</span>{' '}
                    <strong>
                      <span style={{ color: '#e45277' }}>
                        Gjirafa, INC - Dega ne Kosove
                      </span>
                    </strong>
                  </p>{' '}
                  <p>
                    Adresa:{' '}
                    <strong>
                      Magjistralja Prishtinë-Ferizaj, Kilometri i 6
                      (Lapnasellë), Prishtinë, Kosovë
                    </strong>
                  </p>{' '}
                  <p>
                    <span style={{ color: '#555555' }}>Numri i llogarisë</span>:
                    <span style={{ color: '#a5a5a5' }}> </span>
                    <strong>1110008493010167</strong>
                  </p>{' '}
                  <p>
                    IBAN: <strong>XK051110008493010167</strong>
                  </p>{' '}
                  <p>
                    SWIFT: <strong>MBKOXKPRXXX</strong>
                  </p>{' '}
                  <p>&nbsp;</p>{' '}
                  <p>
                    Banka: <strong>Raiffeisen Bank Kosovo J.S.C.</strong>
                  </p>{' '}
                  <p>
                    <span style={{ color: '#555555' }}>Emri kompanisë:</span>{' '}
                    <strong>
                      <span style={{ color: '#e45277' }}>
                        GJIRAFA INC- DEGA NË KOSOVE
                      </span>
                    </strong>
                  </p>{' '}
                  <p>
                    Adresa: <strong>Prishtinë, 10000</strong>
                  </p>{' '}
                  <p>
                    <span style={{ color: '#555555' }}>Numri i llogarisë</span>:
                    <span style={{ color: '#a5a5a5' }}> </span>
                    <strong>1501090004196293</strong>
                  </p>{' '}
                  <p>
                    IBAN: <strong>XK051501090004196293</strong>
                  </p>{' '}
                  <p>
                    SWIFT: <strong>RBKOXKPR</strong>
                  </p>{' '}
                  <p>&nbsp;</p>{' '}
                  <p>
                    Informatat do ti pranoni të bashkangjitura edhe në e-mail.
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
  }
  const info = paymentInfo[paymentMethod]

  console.log('createOrderHandler', createOrderHandler)

  return (
    <>
      <form action="" id="co-payment-info-form">
        <div
          id="checkout-payment-info-load"
          className="mb-5 flex flex-col text-left text-sm"
        >
          <div className="checkout-data">
            <div className="section payment-info">
              {info && <p>{info.content}</p>}
            </div>
          </div>
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
                type="date"
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
          onClick={createOrderHandler}
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
