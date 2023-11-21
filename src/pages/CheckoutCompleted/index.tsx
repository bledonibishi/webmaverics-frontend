import React, { useEffect, useState } from 'react'
import SuccessImage from '@/assets/images/wired-flat-1103-confetti.png'
import './style.css'
import { useLocation } from 'react-router-dom'
import axiosInstance from '@/api/axiosInstance'
import { Image } from '@/helpers/helpers'
import { useStripe } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { OrderData } from '@/helpers/types'

const CheckoutCompleted = () => {
  const location = useLocation()
  const stripe = useStripe()
  const orderResponse = location.state?.orderResponse.payload
  const searchParams = new URLSearchParams(location.search)
  const sessionId = searchParams.get('sessionId')

  const [orderData, setOrderData] = useState<OrderData | null>(null)
  const [productsData, setProductsData] = useState([])
  console.log('productsData', productsData)

  console.log('orderData', orderData)

  // useEffect(() => {
  //   axiosInstance.get('api/v1/orders')
  // }, [])

  useEffect(() => {
    async function fetchSessionData() {
      if (sessionId) {
        try {
          const response = await axiosInstance.get(
            `api/v1/payments/retrieve-session/${sessionId}`
          )

          const orderCodeResponse = await axiosInstance.get(
            `/api/v1/orders/orderCode/${response.data.client_reference_id}`
          )

          console.log('orderCodeResponse', orderCodeResponse)
          console.log('response', response)
          setProductsData(orderCodeResponse.data)
          setOrderData(response.data.line_items)
        } catch (error) {
          console.error('Error fetching session data:', error)
        }
      }
    }

    fetchSessionData()
  }, [sessionId])
  return (
    <div className="master-wrapper-content px-2 md:px-0 mx-auto">
      <div className="master-column-wrapper my-6">
        <div className="page-title-top mb-3 md:mb-6 page-title pointer-events-none w-100 text-center md:text-left text-primary text-lg font-medium">
          <span className="page-title pointer-events-none w-100 text-left text-primary text-lg font-medium">
            Faleminderit për blerje!
          </span>
        </div>
        <div className="center-3">
          <div className="page checkout-page order-completed-page d-flex flex-col">
            <div className="page-body checkout-data">
              <div className="section order-completed bg-white shadow-md rounded p-3 md:p-4 d-flex flex-col justify-content-center mb-5">
                <div className="d-flex flex-col md:flex-row justify-content-center align-items-center text-m font-medium text-primary">
                  <script
                    src="https://cdn.lordicon.com/ritcuqlt.js"
                    type="text/javascript"
                  ></script>
                  <img
                    src={SuccessImage}
                    style={{ width: '100px', height: '100px' }}
                  />
                  <div>
                    Porosia
                    <span className="px-1">#349333</span>
                    është bërë me sukses.
                  </div>
                </div>
                <div className="section order-completed rounded p-3 md:p-4 d-flex flex-col md:flex-row justify-content-center">
                  <div className="d-flex flex-col gap-2 w-100 tablet:w-4/6 md:w-3/4 lg:w-3/5 align-items-center">
                    <div className="w-100 h-100 px-6 tablet:px-8">
                      <ul
                        className="d-flex justify-content-between w-100 h-4 tablet:h-6 rounded-xl align-items-center position-relative"
                        style={{ background: '#F5F5F5' }}
                      >
                        <li
                          id="progressLine"
                          className="position-absolute d-flex bg-primary  rounded-xl z-10 p-0.5 tablet:py-1.5 tablet:px-1 justify-content-center w-4 tablet:w-6 w-[52.5%]"
                        >
                          <span className="bg-white d-flex justify-content-center align-items-centerh-3 w-3 rounded-full">
                            <i className="fas fa-check text-[8px] text-primary"></i>
                          </span>
                        </li>
                        <li className="bg-white h-3 w-3 rounded-full first:ml-1 last:mr-1"></li>
                        <li className="bg-white h-3 w-3 rounded-full first:ml-1 last:mr-1"></li>
                        <li className="bg-white h-3 w-3 rounded-full first:ml-1 last:mr-1"></li>
                      </ul>
                    </div>
                    <div className="d-flex flex-row justify-content-between w-100 align-items-center position-relative z-10 block">
                      <span className="d-flex text-xs sm:text-sm font-medium text-primary">
                        Në pritje
                      </span>
                      <span className="d-flex text-xs sm:text-sm font-medium ">
                        Duke u procesuar
                      </span>
                      <span className="d-flex text-xs sm:text-sm font-medium ">
                        Kompletuar
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="side-3 sticky top-28 mb-4 md:mb-0 mt-4 md:mt-0">
          <div className="w-100 rounded shadow-md bg-white">
            <span className="d-flex border-b w-100 p-3 md:p-4 text-sm text-gray-700 font-medium">
              Produktet e blera: ({orderResponse?.products.length})
            </span>
            <div className="px-4 pb-2 max-h-80 overflow-y-scroll scrollbar-modifier">
              {
                orderResponse?.products.length
                  ? orderResponse?.products.map((product: any, index: any) => (
                      <div
                        key={index}
                        className="d-flex border-b border-gray-300 justify-content-between align-items-center table-content flex-row position-relative py-2 gap-4"
                      >
                        <a
                          href={`/product/${product.product.id}`}
                          className="w-10 h-10 d-flex justify-content-center align-items-center small-image-container"
                        >
                          <Image
                            src={
                              product.product.imageCover
                                ? product.product.imageCover
                                : ''
                            }
                            alt="product image"
                            className="max-h-full max-w-full position-relative"
                          />
                        </a>
                        <div className="d-flex justify-content-between align-items-start flex-col w-100">
                          <div className="product product-title-lines">
                            <a
                              href={`/product/${product.product.id}`}
                              className="product-name-opc text-sm hover:text-primary"
                            >
                              {product.product.title}
                            </a>
                          </div>
                          <div className="d-flex flex-col w-100">
                            <span className="product-quantity text-xs text-gray-600">
                              SKU: 213486
                            </span>

                            <span className="product-unit-price text-xs text-gray-600">
                              {product.product.priceDiscount
                                ? Math.round(
                                    product.product.priceDiscount
                                  ).toLocaleString()
                                : Math.round(
                                    product.product.price
                                  ).toLocaleString()}
                              .00 €
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  : productsData &&
                    productsData.map((productData: any, index: any) => (
                      <div
                        key={index}
                        className="d-flex border-b border-gray-300 justify-content-between align-items-center table-content flex-row position-relative py-2 gap-4"
                      >
                        {productData.products.map(
                          (productItem: any, itemIndex: any) => (
                            <>
                              <a
                                href={`/product/${productItem.product.id}`}
                                className="w-10 h-10 d-flex justify-content-center align-items-center small-image-container"
                              >
                                <Image
                                  src={
                                    productItem.product.imageCover
                                      ? productItem.product.imageCover
                                      : ''
                                  }
                                  alt="product image"
                                  className="max-h-full max-w-full position-relative"
                                />
                              </a>
                              <div
                                key={itemIndex}
                                className="d-flex justify-content-between align-items-start flex-col w-100"
                              >
                                <a
                                  href={`/product/${productItem.product.id}`}
                                  className="product-name-opc text-sm hover:text-primary"
                                >
                                  {productItem.product.title}
                                </a>
                                <span className="product-quantity text-xs text-gray-600">
                                  Quantity: {productItem.quantity}
                                </span>
                                <span className="product-unit-price text-xs text-gray-600">
                                  Price:
                                  {productItem.product.priceDiscount?.toFixed(
                                    2
                                  )}
                                  €
                                </span>
                              </div>
                            </>
                          )
                        )}
                      </div>
                    ))

                // productsData &&
                //   productsData?.map((product: any, index: any) => (

                //     <div
                //       key={index}
                //       className="d-flex border-b border-gray-300 justify-content-between align-items-center table-content flex-row position-relative py-2 gap-4"
                //     >
                //       <a
                //         href={`/product/${product.id}`}
                //         className="w-10 h-10 d-flex justify-content-center align-items-center small-image-container"
                //       >
                //         <Image
                //           src={product.imageCover ? product.imageCover : ''}
                //           alt="product image"
                //           className="max-h-full max-w-full position-relative"
                //         />
                //       </a>
                //       <div className="d-flex justify-content-between align-items-start flex-col w-100">
                //         <div className="product product-title-lines">
                //           <a
                //             href={`/product/${product.id}`}
                //             className="product-name-opc text-sm hover:text-primary"
                //           >
                //             {product.title}
                //           </a>
                //         </div>
                //         <div className="d-flex flex-col w-100">
                //           <span className="product-quantity text-xs text-gray-600">
                //             SKU: 213486
                //           </span>
                //           <span className="product-unit-price text-xs text-gray-600">
                //             {product.priceDiscount?.toFixed(2)} €
                //           </span>
                //         </div>
                //       </div>
                //     </div>
                // )
                // )
              }
            </div>
            <div className="p-3 md:p-4">
              <div className="d-flex justify-content-between mb-2">
                <button className="btn btn-secondary btn-secondary-hover border-none w-50 mr-1">
                  <a
                    className="text-xs text-gray-600"
                    href={`/customer/orderdetails/${orderResponse?.id}`}
                  >
                    Detajet e porosisë
                  </a>
                </button>
                <button className="btn btn-secondary btn-secondary-hover w-50 ml-1">
                  <a className="text-xs text-gray-600" href="/customer/orders">
                    Porositë
                  </a>
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="order-completed-continue-button btn btn-primary btn-primary-hover w-100 text-sm"
                  //  onclick="if (!window.__cfRLUnblockHandlers) return false; setLocation('/'); sendContinueShoppingEvent();"
                >
                  Kthehu në faqen kryesore
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutCompleted
