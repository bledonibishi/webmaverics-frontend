import WrapperWIthSpacing from '@/ui/WrapperWIthSpacing'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import OpcBilling from './OpcBilling'
import WrappingCard from '@/ui/WrappingCard'
import OpcShippingMethod from './OpcShippingMethod'
import OpcPaymentMethod from './OpcPaymentMethod'
import OpcPaymentInfo from './OpcPaymentInfo'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { useGetCartProductsQuery } from '@/Cart/store/cartAPI'
import { getCartProducts } from '@/Cart/store/cartSlice'
import { CalculateTotalPrice } from '@/Cart/components/calculateTotalPrice'
import OpcShipping from './OpcShipping'
import OrderDropdown from './orderDropdown'
import { getAllAddresses } from '@/store/addresses/addressesSlice'
import { fetchCountries } from '@/store/auth/authSlice'
import axiosInstance from '@/api/axiosInstance'
import { toast } from 'react-toastify'
import { Address } from '@/helpers/types'

const OnePageCheckout = () => {
  const dispatch = useAppDispatch()
  const {
    data: cart,
    refetch,
    isLoading: cartLoading,
  } = useGetCartProductsQuery()
  const { addresses, loading } = useAppSelector((state) => state.address)
  const [activeStep, setActiveStep] = useState<string>('opc-billing')
  const [stepChanges, setStepChanges] = useState<string[]>([])
  const [selectedAddress, setSelectedAddress] = useState<undefined | Address>(
    undefined
  )

  const handleAddressSelection = (address: string) => {
    const selAddress = addresses.find((item) => item.id === address)

    setSelectedAddress(selAddress)
  }

  useEffect(() => {
    dispatch(getAllAddresses())
  }, [])

  useEffect(() => {
    dispatch(getCartProducts())
  }, [])

  const totalPriceInfo = CalculateTotalPrice(cart?.products)

  // Use the values as needed
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
  }
  const handleStepChange = (step: string) => {
    // This function is called when the user clicks the "Change" link.
    // Remove the step from the changes array.
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

  return (
    <WrapperWIthSpacing>
      <div className="page-title-top mb-3 md:mb-6 page-title pointer-events-none w-100 text-start md:text-left text-primary text-lg font-medium">
        Blerje e sigurtë
      </div>
      <div className="position-relative">
        <div className="center-3">
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
                      handleAddressSelection={handleAddressSelection}
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
                    <OpcShipping handleContinue={handleContinue} />
                  </OrderDropdown>
                  <OrderDropdown
                    isActive={activeStep === 'opc-shipping_method'}
                    number={3}
                    urlLink="opc-shipping_method"
                    title="Address method"
                    isChangable={stepChanges.includes('opc-shipping_method')}
                    onChange={handleStepChange}
                  >
                    <OpcShippingMethod handleContinue={handleContinue} />
                  </OrderDropdown>
                  <OrderDropdown
                    number={4}
                    isActive={activeStep === 'opc-payment_method'}
                    title="Payment method"
                    urlLink="opc-payment_method"
                    isChangable={stepChanges.includes('opc-payment_method')}
                    onChange={handleStepChange}
                  >
                    <OpcPaymentMethod handleContinue={handleContinue} />
                  </OrderDropdown>
                  <OrderDropdown
                    isActive={activeStep === 'opc-payment_info'}
                    number={5}
                    urlLink="opc-payment_info"
                    title="Address and payment info"
                    isChangable={stepChanges.includes('opc-payment_info')}
                    onChange={handleStepChange}
                  >
                    <OpcPaymentInfo handleContinue={handleContinue} />
                  </OrderDropdown>
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
                          <span className="font-medium">Emri:</span>
                          {selectedAddress?.name}
                        </li>
                        <li className="email truncate">
                          <span className="font-medium">Email:</span>
                          {selectedAddress?.email}
                        </li>
                        <li className="phone truncate">
                          <span className="font-medium">
                            Numri i telefonit:
                          </span>
                          {selectedAddress?.telephone}
                        </li>
                        <li className="address1 truncate ">
                          <span className="font-medium">Adresa:</span>
                          {selectedAddress?.address}
                        </li>
                        <li className="city-state-zip">
                          <span className="font-medium">Qyteti:</span>
                          {selectedAddress?.city}
                        </li>
                        <li className="country">
                          <span className="font-medium">Shteti:</span>
                          {selectedAddress?.country}
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
                          <span className="font-medium">Emri:</span>
                          bledon ibishi
                        </li>
                        <li className="email truncate">
                          <span className="font-medium">Email:</span>
                          bledonibishi1@gmail.com
                        </li>
                        <li className="phone truncate">
                          <span className="font-medium">
                            Numri i telefonit:
                          </span>
                          045224091
                        </li>
                        <li className="address1 truncate">
                          <span className="font-medium">Adresa:</span>
                          hamdi gashi
                        </li>
                        <li className="address2 truncate">
                          <span className="font-medium">Adresa sekondare:</span>
                          nr 31
                        </li>
                        <li className="city-state-zip">
                          <span className="font-medium">Qyteti:</span>
                          Vushtrri{' '}
                        </li>
                        <li className="country">
                          <span className="font-medium">Shteti:</span>
                          Kosovë
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
                              <label>Transporti:</label>
                            </span>
                            <span>
                              <span>-</span>
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
                              <span
                                // discount="-36.00 €"
                                className="value-summary text-gray-700 discount"
                              >
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
                        <div className="d-flex  border-b last:border-none border-gray-300 justify-content-between align-items-center flex-row position-relative py-2 gap-4 product-info">
                          <a
                            href={`/product/${item.product.id}`}
                            className="w-10 h-10 d-flex small-image-container d-flex justify-content-center align-items-center"
                          >
                            <img
                              className="max-w-full max-h-full position-relative"
                              alt="Foto e Maus Logitech G Pro X Superlight, i bardhë"
                              src="https://hhstsyoejx.gjirafa.net/gjirafa50core/images/4b2bb16f-11a7-482f-a01c-4cc873512f87/4b2bb16f-11a7-482f-a01c-4cc873512f87.jpeg"
                              srcSet="https://hhstsyoejx.gjirafa.net/gjirafa50core/images/4b2bb16f-11a7-482f-a01c-4cc873512f87/4b2bb16f-11a7-482f-a01c-4cc873512f87.webp?w=40"
                              title="Shfaq detaje për Maus Logitech G Pro X Superlight, i bardhë"
                            />
                          </a>
                          <div className="d-flex  justify-content-between align-items-start flex-col w-100">
                            <div className="product product-title-lines">
                              <a
                                product-id="14559"
                                href="/maus-logitech-g-pro-x-superlight-i-bardhe"
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

                  <input
                    name="__RequestVerificationToken"
                    type="hidden"
                    value="CfDJ8BavmJPrX4dBnzAs_5ATawwHPykg0gXIYO62KjlilBNhEXfUXgAX_jvFltKrN_-1wchzPDPXxjwWhTeBDXv9oS-nhDDCwtkMibUZzwzVMZAC_8W95OIRsQiFn1icstkFeMEa8IYFri8mFh4kj91dOzeEJ-fjOy-OeW1Q76qy_Mx7Or_YiFyrk5od7D6Xfqe-VQ"
                  />
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
