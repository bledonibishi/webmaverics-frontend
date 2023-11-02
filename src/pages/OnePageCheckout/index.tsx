import WrapperWIthSpacing from '@/ui/WrapperWIthSpacing'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import OpcBilling from './OpcBilling'
import WrappingCard from '@/ui/WrappingCard'
import OpcShippingMethod from './OpcShippingMethod'
import OpcPaymentMethod from './OpcPaymentMethod'
import OpcPaymentInfo from './OpcPaymentInfo'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import {
  useClearCartMutation,
  useGetCartProductsQuery,
} from '@/Cart/store/cartAPI'
import { getCartProducts } from '@/Cart/store/cartSlice'
import { CalculateTotalPrice } from '@/Cart/components/calculateTotalPrice'
import OpcShipping from './OpcShipping'
import OrderDropdown from './orderDropdown'
import { getAllAddresses } from '@/store/addresses/addressesSlice'
import { fetchCountries } from '@/store/auth/authSlice'
import axiosInstance from '@/api/axiosInstance'
import { toast } from 'react-toastify'
import { Address } from '@/helpers/types'
import { createOrder } from '@/store/orders/orderSlice'
import { Image, generateOrderCode } from '@/helpers/helpers'
import { useStripe } from '@stripe/react-stripe-js'
import { useElements } from '@stripe/react-stripe-js'

const OnePageCheckout = () => {
  const dispatch = useAppDispatch()
  const stripe = useStripe()
  const elements = useElements()
  const stepRef = useRef(null)
  const navigate = useNavigate()
  const {
    data: cart,
    refetch,
    isLoading: cartLoading,
  } = useGetCartProductsQuery()
  const [clearCart] = useClearCartMutation()
  const { addresses, loading } = useAppSelector((state) => state.address)
  const [activeStep, setActiveStep] = useState<string>('opc-billing')
  const [stepChanges, setStepChanges] = useState<string[]>([])
  const [selectedAddress, setSelectedAddress] = useState<undefined | Address>(
    addresses[0]
  )
  const [sameAddress, setSameAddress] = useState<boolean>(false)
  const [transportAddress, setTransportAddress] = useState<undefined | Address>(
    selectedAddress ?? addresses[0]
  )
  const [shippingMethod, setShippingMethod] = useState<string | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<string>('TEB Bank')

  useEffect(() => {
    dispatch(getAllAddresses())
  }, [])

  useEffect(() => {
    setSelectedAddress(addresses[0])
  }, [])

  const handleAddressSelection = (address: string) => {
    const selAddress = addresses.find((item) => item.id === address)

    setSelectedAddress(selAddress)
  }
  const handleTransportAddress = (address: string) => {
    const selAddress = addresses.find((item) => item.id === address)

    setTransportAddress(selAddress)
  }

  useEffect(() => {
    if (sameAddress) {
      setTransportAddress(selectedAddress)
    }
  }, [sameAddress])

  useEffect(() => {
    dispatch(getCartProducts())
  }, [])

  const totalPriceInfo = CalculateTotalPrice(cart?.products)
  const {
    totalPriceWithoutVAT,
    totalPriceWithVAT,
    totalTvsh,
    discountValueInEuros,
    priceAfterDiscount,
    discountedTotalPriceWithoutVAT,
  } = totalPriceInfo

  const handleContinue = (activeStep: string) => {
    setStepChanges([...stepChanges, activeStep])
    setActiveStep(activeStep)
    window.scrollTo({
      top: 100,
      behavior: 'smooth',
    })
  }
  const handleStepChange = (step: string) => {
    setStepChanges(stepChanges.filter((s) => s !== step))
  }

  useEffect(() => {
    const fragment = window.location.hash
    if (fragment) {
      const step = fragment.replace('#', '')
      setActiveStep(step)
    }
  }, [])

  useEffect(() => {
    window.location.hash = `#${activeStep}`
  }, [activeStep])

  useEffect(() => {
    window.addEventListener('popstate', () => {
      const fragment = window.location.hash
      if (fragment) {
        const step = fragment.replace('#', '')
        setActiveStep(step)
      }
    })
  }, [])

  const createOrderHandler = async () => {
    // setLoading(true)

    let addressID: string | Address
    let billingAddress: string | Address
    let totalPrice: number
    let transportMode: string

    if (totalPriceWithVAT) {
      totalPrice = totalPriceWithVAT
    } else {
      totalPrice = 0
    }

    if (shippingMethod) {
      transportMode = shippingMethod
    } else {
      transportMode = ''
    }

    if (selectedAddress) {
      addressID = selectedAddress?.id
    } else {
      addressID = ''
    }
    if (transportAddress) {
      billingAddress = transportAddress?.id
    } else {
      billingAddress = ''
    }

    console.log('addressID', addressID)
    console.log('transportMode', transportMode)

    if (cart && cart.products) {
      const products = cart.products.map((item) => ({
        product: item.product.id,
        quantity: item.quantity,
      }))
      const orderCode = generateOrderCode()

      const body = {
        products: products.flat(),
        status: 'pending',
        addressID,
        billingAddress,
        // addressID: selectedAddress?.id,
        transportMode,
        paymentMethod: paymentMethod,
        arrivalDate: '2023-11-3',
        totalOrderPrice: totalPrice,
        transportModeStatus: 'Nuk është transportuar ende',
        paymentMethodStatus: 'Në pritje',
        tvsh: totalTvsh,
        orderCode: orderCode,
      }

      console.log('body', body)
      try {
        if (body.paymentMethod === 'Paguaj me para në dorë') {
          const response = await dispatch(createOrder(body))
          console.log('response', response)
          if (response.meta.requestStatus === 'fulfilled') {
            clearCart({})
            refetch()
            navigate('/checkout/completed', {
              state: { orderResponse: response },
            })
          }
        } else {
          // if (!stripe || !elements) {
          //   return
          // }

          console.log('here')

          const session = await axiosInstance.post(
            `api/v1/payments/checkout-session`,
            body
          )
          // const session = await axiosInstance.get(
          //   `api/v1/payments/checkout-session/${id}`
          // )
          console.log('session', session)

          await stripe.redirectToCheckout({
            sessionId: session.data.session.id,
          })
        }
      } catch (error) {
        console.log('error', error)
      }
    } else {
    }
  }

  return (
    <WrapperWIthSpacing>
      <div className="page-title-top mb-3 md:mb-6 page-title pointer-events-none w-100 text-start md:text-left text-primary text-lg font-medium">
        Blerje e sigurtë
      </div>
      <div className="position-relative">
        <div className="center-3" ref={stepRef}>
          <div className="d-flex md:flex-row flex-col">
            <div className="page checkout-page flex-grow">
              <div className="page-body checkout-data mb-5">
                <ol className="opc rounded" id="checkout-steps">
                  <OrderDropdown
                    number={1}
                    isActive={activeStep === 'opc-billing'}
                    title="Adresa e faturimit"
                    urlLink="opc-billing"
                    isChangable={stepChanges.includes('opc-billing')}
                    onChange={handleStepChange}
                  >
                    <OpcBilling
                      handleContinue={handleContinue}
                      selectedAddress={selectedAddress}
                      handleAddressSelection={handleAddressSelection}
                      setSameAddress={setSameAddress}
                      sameAddress={sameAddress}
                    />
                  </OrderDropdown>
                  <OrderDropdown
                    number={2}
                    isActive={activeStep === 'opc-shipping'}
                    title="Transport address"
                    urlLink="opc-shipping"
                    isChangable={stepChanges.includes('opc-shipping')}
                    onChange={handleStepChange}
                  >
                    <OpcShipping
                      handleContinue={handleContinue}
                      handleTransportAddress={handleTransportAddress}
                      transportAddress={transportAddress}
                    />
                  </OrderDropdown>
                  <OrderDropdown
                    isActive={activeStep === 'opc-shipping_method'}
                    number={3}
                    urlLink="opc-shipping_method"
                    title="Address method"
                    isChangable={stepChanges.includes('opc-shipping_method')}
                    onChange={handleStepChange}
                  >
                    <OpcShippingMethod
                      handleContinue={handleContinue}
                      setShippingMethod={setShippingMethod}
                      shippingMethod={shippingMethod}
                    />
                  </OrderDropdown>
                  <OrderDropdown
                    number={4}
                    isActive={activeStep === 'opc-payment_method'}
                    title="Payment method"
                    urlLink="opc-payment_method"
                    isChangable={stepChanges.includes('opc-payment_method')}
                    onChange={handleStepChange}
                  >
                    <OpcPaymentMethod
                      handleContinue={handleContinue}
                      paymentMethod={paymentMethod}
                      setPaymentMethod={setPaymentMethod}
                    />
                  </OrderDropdown>
                  <li
                    id="opc-billing"
                    className={`tab-section allow bg-white  shadow-md active`}
                  >
                    <div className="step-title d-flex justify-content-between p-3 border-b border-gray-300 text-sm">
                      <div className="d-flex items-center">
                        <span className="number">5</span>
                        <h6 className="title ml-4 mb-0">
                          Address and payment infp
                        </h6>
                      </div>
                    </div>
                    <div id="checkout-step-billing" className="step a-item p-4">
                      <form action="" id="co-payment-info-form">
                        <div
                          id="checkout-payment-info-load"
                          className="mb-5 flex flex-col text-left text-sm"
                        >
                          <div className="checkout-data">
                            <div className="section payment-info">
                              {/* {info && <p>{info.content}</p>} */}
                            </div>
                          </div>
                        </div>
                        <div className="customer-entered-delivery-date mb-3 d-flex flex-col">
                          <label
                            htmlFor="datepicker"
                            className="text-sm text-gray-600 mb-2"
                          >
                            Për datë tjetër të arritjes së porosisë, mund të e
                            caktoni atë këtu:
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
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="side-3 sticky top-28 mb-4 md:mb-0  md:mt-0">
          <div className="w-100">
            <div className="order-summary-content d-flex flex-col-reverse">
              <div className="order-summary-content d-flex flex-col-reverse">
                <div className="order-review-data rounded bg-white shadow-md d-flex flex-col md:p-3 p-2 overflow-hidden">
                  <div className="billing-info-wrap pb-3 last:pb-0">
                    <div className="billing-info">
                      <div className="title">
                        <span className="d-flex pb-3 md:pb-4 text-sm text-gray-700 font-medium">
                          Adresa e faturimit:
                        </span>
                      </div>
                      <ul className="info-list text-sm text-gray-700">
                        <li className="name capitalize truncate">
                          <span className="font-medium">Name:</span>
                          {selectedAddress?.name}
                        </li>
                        <li className="email truncate">
                          <span className="font-medium">Email:</span>
                          {selectedAddress?.email}
                        </li>
                        <li className="phone truncate">
                          <span className="font-medium">Telephone:</span>
                          {selectedAddress?.telephone}
                        </li>
                        <li className="address1 truncate ">
                          <span className="font-medium">Address:</span>
                          {selectedAddress?.address}
                        </li>
                        <li className="city-state-zip">
                          <span className="font-medium">City:</span>
                          {selectedAddress?.city}
                        </li>
                        <li className="country">
                          <span className="font-medium">Country:</span>
                          {selectedAddress?.country}
                        </li>
                        <li className="country">
                          <span className="font-medium">Payment method:</span>
                          {paymentMethod}
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="shipping-info-wrap pb-3 last:pb-0">
                    <div className="shipping-info">
                      <div className="title">
                        <span className="d-flex  pb-3 md:pb-4 text-sm text-gray-700 font-medium">
                          Adresa e transportit:
                        </span>
                      </div>
                      <ul className="info-list text-sm text-gray-700">
                        <li className="name truncate">
                          <span className="font-medium">Name:</span>
                          {transportAddress?.name}
                        </li>
                        <li className="email truncate">
                          <span className="font-medium">Email:</span>
                          {transportAddress?.email}
                        </li>
                        <li className="phone truncate">
                          <span className="font-medium">Telephone:</span>
                          {transportAddress?.telephone}
                        </li>
                        <li className="address1 truncate">
                          <span className="font-medium">Address:</span>
                          {transportAddress?.address}
                        </li>
                        <li className="city-state-zip">
                          <span className="font-medium">City:</span>
                          {transportAddress?.city}
                        </li>
                        <li className="country">
                          <span className="font-medium">Country:</span>
                          {transportAddress?.country}
                        </li>
                        <li className="country">
                          <span className="font-medium">Transport method:</span>
                          {shippingMethod}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <form
                  method="post"
                  encType="multipart/form-data"
                  id="shopping-cart-form"
                  action="/cart"
                >
                  <div className="d-flex  flex-col rounded shadow-md mb-3 bg-white p-3 md:p-4">
                    <span className="d-flex  pb-3 md:pb-4 text-sm text-gray-700 font-medium">
                      Totali i porosisë:
                    </span>

                    <div id="order-totals" className="totals">
                      <div className="total-info">
                        <div className="cart-total d-flex flex-col border border-gray-300 rounded overflow-hidden">
                          <div className="order-subtotal-discount d-flex justify-content-between p-2 text-sm text-gray-600">
                            <span>
                              <label>Nëntotali:</label>
                            </span>
                            <span>
                              <span className="value-summary text-gray-700">
                                {discountedTotalPriceWithoutVAT?.toFixed(2)} €
                              </span>
                            </span>
                          </div>
                          <div className="shipping-cost d-flex justify-content-between p-2 text-sm text-gray-600">
                            <span>
                              <label>Transporti:{shippingMethod}</label>
                            </span>
                            <span>
                              <span>{shippingMethod ? '0.00€' : '-'}</span>
                            </span>
                          </div>
                          <div className="tax-rate d-flex justify-content-between p-2 text-sm text-gray-600">
                            <span>
                              <label>TVSH 18%:</label>
                            </span>
                            <span>
                              <span className="text-gray-700">
                                {totalTvsh?.toFixed(2)} €
                              </span>
                            </span>
                          </div>
                          <div className="discount-total d-flex justify-content-between p-2 text-sm text-gray-600">
                            <span>
                              <label>Duke përfshirë zbritjen:</label>
                            </span>
                            <span>
                              <span className="value-summary text-gray-700 discount">
                                -{discountValueInEuros?.toFixed(2)} €
                              </span>
                            </span>
                          </div>
                          <div className="order-total d-flex justify-content-between p-2">
                            <label className="text-gray-700 text-base font-semibold">
                              Total:
                            </label>
                            <span className="text-primary text-base font-semibold">
                              <span className="value-summary">
                                <span>{totalPriceWithVAT?.toFixed(2)} €</span>
                              </span>
                            </span>
                          </div>
                        </div>

                        <div className="d-flex  flex-col justify-content-between p-2 text-sm text-gray-600 border rounded mt-3">
                          <span>
                            <label>Koha e arritjes:</label>
                          </span>
                          <span className="text-left">
                            <span
                              className="value-summary text-gray-700 order-arrival"
                              estimated-date="19.10.2023 2:51:22 e pasdites"
                            >
                              19 tetor 2023 - 20 tetor 2023
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="cart bg-white rounded shadow-md mb-3">
                    <span className="d-flex  border-b w-100 p-3 md:p-4 text-sm text-gray-700 font-medium">
                      Produktet në shportë: ({cart?.products.length})
                    </span>

                    <div className="px-4 pb-2 max-h-80 overflow-y-scroll scrollbar-modifier">
                      {cart?.products.map((item, index) => (
                        <div
                          key={index}
                          className="d-flex  border-b last:border-none border-gray-300 justify-content-between align-items-center flex-row position-relative py-2 gap-4 product-info"
                        >
                          <a
                            href={`/product/${item.product.id}`}
                            className="w-10 h-10 d-flex small-image-container d-flex justify-content-center align-items-center"
                          >
                            <Image
                              src={
                                item.product.imageCover
                                  ? item.product.imageCover
                                  : ''
                              }
                              alt="product image"
                              className="max-w-full max-h-full position-relative"
                            />
                          </a>
                          <div className="d-flex  justify-content-between align-items-start flex-col w-100">
                            <div className="product product-title-lines">
                              <a
                                product-id="14559"
                                href={`/product/${item.product.id}`}
                                className="text-sm hover:text-primary product-name"
                              >
                                {item.product.title}
                              </a>
                            </div>

                            <div className="d-flex  justify-content-start align-items-center w-100 text-xs text-gray-600">
                              <span className="product-quantity text-xs">
                                {item.quantity}
                                <span className="px-2">x</span>
                              </span>

                              <span className="product-unit-price">
                                {item.product.priceDiscount.toFixed(2)} €
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WrapperWIthSpacing>
  )
}

export default OnePageCheckout
