import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import './cart.css'
import { useDispatch, useSelector } from 'react-redux'
import WrapperWIthSpacing from '@/ui/WrapperWIthSpacing'
import WrappingCard from '@/ui/WrappingCard'
import Apple from '@/assets/images/productIMG1.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { useNavigate } from 'react-router-dom'
import { getCartProducts } from '../store/cartSlice'
import {
  useAddToCartQueryMutation,
  useClearCartMutation,
  useDecreaseCartQuantityMutation,
  useDeleteCartProductMutation,
  useGetCartProductsQuery,
} from '../store/cartAPI'
import { CartItemProduct, Product, addToCartType } from '@/helpers/types'
import { Image, formatISODateRange2dates } from '@/helpers/helpers'
import { CalculateTotalPrice } from '../components/calculateTotalPrice'
import LoadingBar from '@/ui/Loading/LoadingBar'

const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [quantity, setQuantity] = useState<number>(1)
  const user = useAppSelector((state) => state.auth.user)
  const [clearCart] = useClearCartMutation()
  const {
    data: cart,
    refetch,
    isLoading: cartLoading,
  } = useGetCartProductsQuery()

  const [addToCartQuery, { isError, isLoading, isSuccess }] =
    useAddToCartQueryMutation()

  useEffect(() => {
    dispatch(getCartProducts())
  }, [])

  const [deleteProduct, { isLoading: deleteProductLoading }] =
    useDeleteCartProductMutation()
  const [decreaseCartQuantity] = useDecreaseCartQuantityMutation()

  const handleDeleteCartProduct = async (productId: number | string) => {
    console.log('productId', productId)

    try {
      await deleteProduct(productId)
      refetch()
    } catch (error) {
      console.log('error', error)
    }
  }

  const goToLogin = () => {
    navigate('/login/identifier')
  }
  const goToOnePageCheckout = () => {
    navigate('/onepagecheckout#opc-billing')
  }
  const calctTotalPrice = CalculateTotalPrice(cart?.products)
  const {
    totalPriceWithVAT,
    totalTvsh,
    discountValueInEuros,
    discountedTotalPriceWithoutVAT,
  } = calctTotalPrice

  const addToCartHandler = (items: addToCartType) => {
    addToCartQuery(items)
      .then(() => {
        refetch()
      })
      .catch((err) => console.log('err', err))
  }
  const decreaseItemQuantityHandler = (id: string) => {
    decreaseCartQuantity(id)
      .then(() => {
        refetch()
      })
      .catch((err) => console.log('err', err))
  }

  return (
    <WrapperWIthSpacing>
      {isLoading ? (
        <LoadingBar height="100px" size={100} />
      ) : (
        <>
          <div className="page-title-top mb-3 md:mb-6 page-title pointer-events-none w-100 text-center md:text-left text-primary text-lg font-medium">
            Cart
          </div>
          {cart?.products.length ? (
            <>
              <div className="center-3 ">
                <div className="page shopping-cart-page ">
                  <WrappingCard padding="0" marginBtm="20px">
                    <ul className="w-100 hidden md:grid grid-flow-col grid-cols-10 gap-2 position-relative text-gray-700 font-semibold text-sm border-b border-gray-300 px-4 py-3">
                      <li className="product col-span-4">Products:</li>
                      <li className="unit-price col-span-2">Price:</li>
                      <li className="quantity col-span-2">Quantity:</li>
                      <li className="subtotal col-span-2">Total:</li>

                      <li className="remove-from-cart position-absolute right-4 top-3">
                        <a
                          className="rounded p-1 btn-secondary btn-secondary-hover border border-transparent cursor-pointer"
                          onClick={() => {
                            clearCart({})
                            refetch()
                          }}
                        >
                          <i
                            title="Largo te gjitha produktet nga shporta"
                            className="icon-delete-trash text-gray-700 text-xl"
                          >
                            <FontAwesomeIcon icon={faTrashCan} />
                          </i>
                        </a>
                      </li>
                    </ul>

                    {cart?.products.map((product) => {
                      const discountPercentage = product.product.discount || 0
                      const originalPrice = product.product.price
                      const discountedPrice =
                        originalPrice -
                        (originalPrice * discountPercentage) / 100
                      const discountValueInEurosIN =
                        originalPrice - discountedPrice

                      return (
                        <div className="border-b last:border-none border-gray-300 py-4 relative px-1 md:px-4 py-3">
                          <div className="w-100 grid grid-cols-10 grid-flow-row md:grid-flow-col table-content align-items-start gap-2 position-relative">
                            <div className="col-span-10 md:col-span-4 grid grid-flow-col pb-2 md:pb-2 justify-content-start align-items-center">
                              {/* col-span-10 */}
                              <a
                                className="d-flex w-16 h-16 align-items-center justify-content-center small-image-container mr-4"
                                href={`product/${product.product.id}`}
                              >
                                <Image
                                  src={
                                    product.product.imageCover
                                      ? product.product.imageCover
                                      : ''
                                  }
                                  alt="imageCover"
                                  className="max-w-full max-h-full position-relative"
                                />
                              </a>
                              <div className="product text-left">
                                <a
                                  href={`/product/${product?.product.id}`}
                                  className="product-name cart-product-name hover:text-primary product-title-lines text-sm"
                                >
                                  {product.product.title}
                                </a>
                                <div className="sku pt-2 text-gray-600 text-xs">
                                  SKU: 272523app
                                </div>
                              </div>
                            </div>
                            <div className="unit-price col-span-6 md:col-span-2">
                              {/*  col-span-6 */}
                              <span className="product-unit-price font-semibold text-left text-base text-gray-700">
                                {product.product.priceDiscount
                                  ? `${Math.round(
                                      product.product.priceDiscount
                                    ).toLocaleString('en-US')}
.00 €`
                                  : `${Math.round(
                                      product.product.price
                                    ).toLocaleString('en-US')}
                                    .00 €`}
                              </span>

                              {product.product.discount !== 0 && (
                                <div className="discount md:text-left d-flex md:flex-col">
                                  <span className="text-primary text-xs font-medium">
                                    * Ju kurseni:
                                  </span>
                                  <span className="text-primary text-sm font-semibold pl-2">
                                    {Math.floor(discountValueInEurosIN) || 0}
                                    .00 €
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="quantity col-span-4 md:col-span-2  d-flex align-items-center justify-content-end  md:justify-start">
                              <input
                                type="button"
                                value="-"
                                onClick={() =>
                                  decreaseItemQuantityHandler(
                                    product?.product.id
                                      ? product.product.id
                                      : ''
                                  )
                                }
                                className="qtyminus minus rounded-tl rounded-bl outline-none focus:ring-primary bg-white text-gray-600 text-lg border"
                                data-quantity="decrease"
                              />
                              <input
                                type="number"
                                value={product.quantity}
                                max={product?.product.stock}
                                pattern="[0-9]"
                                id="product_enteredQuantity_160697"
                                className="quantity quantity-in-product border qty outline-none focus:ring-2 focus:ring-primary"
                                aria-label="Shkruani një sasi"
                                data-val="true"
                                data-val-required="The Sasia field is required."
                                name="addtocart_160697.AddToCart.EnteredQuantity"
                              />
                              <input
                                type="button"
                                value="+"
                                className="qtyplus p-0 plus rounded-tr rounded-br outline-none focus:ring-primary bg-white text-gray-600 text-lg border"
                                onClick={() =>
                                  addToCartHandler({
                                    productId: product?.product.id ?? '',
                                    quantity: 1,
                                    price: product?.price ?? 0,
                                  })
                                }
                                data-quantity="increase"
                                disabled={
                                  quantity >=
                                  (product?.product.stock
                                    ? product.product.stock
                                    : 0)
                                }
                              />
                            </div>
                            <div className="subtotal grid grid-flow-col col-span-10 md:col-span-2 justify-content-between bg-gray-100 md:bg-white rounded p-2 md:p-0">
                              {/* col-span-10 */}
                              <span className="md:hidden">Total</span>
                              <span className="product-subtotal text-base text-gray-700 font-semibold">
                                {Math.round(
                                  (product.product.priceDiscount
                                    ? product.product.priceDiscount
                                    : product.product.price) * product.quantity
                                ).toLocaleString('en-US')}
                                .00 €
                              </span>
                            </div>
                            <div className="remove-from-cart position-absolute right-0 top-0">
                              <input
                                type="checkbox"
                                className="hidden"
                                name="removefromcart"
                                id="removefromcart216330"
                                data-productid="160697"
                                value="216330"
                                aria-label="Largo"
                              />
                              <button
                                name="updatecart"
                                className="border border-transparent rounded p-1 btn-secondary btn-secondary-hover"
                                onClick={() =>
                                  handleDeleteCartProduct(product.product.id)
                                }
                              >
                                <i className="icon-delete-trash text-gray-700 text-xl">
                                  <FontAwesomeIcon icon={faTrashCan} />
                                </i>
                              </button>
                            </div>
                          </div>
                          <div
                            id="product-160697"
                            className="mt-2 md:ml-20"
                          ></div>
                        </div>
                      )
                    })}
                  </WrappingCard>
                </div>
              </div>
              <div className="side-3 sticky top-28 mb-4 md:mb-0 md:mt-0">
                <div className="cart-footer d-flex flex-col rounded shadow-md bg-white p-3 md:p-4 text-gray-700">
                  <span className="d-flex pb-3 text-sm font-medium text-gray-700">
                    Totali i porosisë:
                  </span>

                  <div className="cart-collaterals pb-3">
                    <div className="deals d-flex flex-col gap-2">
                      <div className="coupon-box d-flex flex-col gap-2">
                        <span className="text-sm text-gray-600">
                          Discount code
                        </span>

                        <div className="coupon-code d-flex">
                          <input
                            name="discountcouponcode"
                            id="discountcouponcode"
                            type="text"
                            className="discount-coupon-code border rounded flex-grow truncate mr-2"
                            placeholder="Enter your discount code here"
                            aria-label="Shkruani kodin e kuptonit të zbritjes"
                          />

                          <button
                            type="submit"
                            name="applydiscountcouponcode"
                            id="applydiscountcouponcode"
                            className="apply-discount-coupon-code-button btn text-primary border rounded border-primary hover:bg-primary transition-all duration-150 hover:text-white"
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="totals">
                    <div className="total-info">
                      <div className="cart-total d-flex flex-col border border-gray-300 rounded overflow-hidden">
                        <div className="order-subtotal-discount d-flex justify-content-between p-2 text-sm text-gray-600">
                          <span>
                            <label>Subtotal:</label>
                          </span>
                          <span>
                            <span className="value-summary text-gray-700">
                              {Math.round(
                                discountedTotalPriceWithoutVAT
                                  ? discountedTotalPriceWithoutVAT
                                  : 0
                              ).toLocaleString('en-US')}
                              .00 €
                            </span>
                          </span>
                        </div>
                        <div className="shipping-cost d-flex justify-content-between p-2 text-sm text-gray-600">
                          <span>
                            <label>Transport:</label>
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
                              {Math.round(totalTvsh).toLocaleString('en-US')}
                              .00 €
                            </span>
                          </span>
                        </div>
                        <div className="discount-total d-flex justify-content-between p-2 text-sm text-gray-600">
                          <span>
                            <label>Including discount:</label>
                          </span>
                          <span>
                            <span
                              // discount="-30.00 €"

                              className="value-summary text-gray-700 discount"
                            >
                              -
                              {Math.round(
                                discountValueInEuros ? discountValueInEuros : 0
                              ).toLocaleString('en-US')}
                              .00 €
                            </span>
                          </span>
                        </div>
                        <div className="order-total d-flex justify-content-between p-2">
                          <label className="text-gray-700 text-base font-semibold">
                            Total:
                          </label>
                          <span className="text-primary text-base font-semibold">
                            <span className="value-summary">
                              <span>
                                {Math.round(
                                  totalPriceWithVAT ? totalPriceWithVAT : 0
                                ).toLocaleString('en-US')}
                                .00 €
                              </span>
                            </span>
                          </span>
                        </div>
                      </div>

                      <div className="d-flex flex-col justify-content-between p-2 text-sm text-gray-600 border rounded mt-3">
                        <span className="pb-2">
                          <label>Arrival date:</label>
                        </span>
                        <span className="text-left">
                          <span className="value-summary text-gray-700 order-arrival">
                            {formatISODateRange2dates(3, 5)}
                          </span>
                        </span>
                      </div>
                    </div>

                    <div className="checkout-buttons mt-3">
                      {!user ? (
                        <button
                          type="submit"
                          id="checkout"
                          name="checkout"
                          value="checkout"
                          className="checkout-btn btn btn-primary w-100 btn-primary-hover"
                          onClick={goToLogin}
                          formAction="/login"
                        >
                          Login to continue
                        </button>
                      ) : (
                        <button
                          type="submit"
                          id="checkout"
                          name="checkout"
                          value="checkout"
                          disabled={!cart?.products.length ? true : false}
                          className="checkout-btn btn btn-primary w-100 btn-primary-hover"
                          onClick={
                            cart?.products.length !== 0
                              ? goToOnePageCheckout
                              : undefined
                          }
                        >
                          Continue
                        </button>
                      )}
                    </div>
                    <div className="addon-buttons"></div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="no-data w-100 d-flex flex-col justify-content-center align-items-center bg-white shadow-md p-3 md:p-4 rounded mb-3">
              <div className=" bg-opacity-25 d-flex justify-content-center bg-with-opacity align-items-center rounded-full w-32 h-32 mb-3">
                <i className="icon-cart-shopping-cancel text-primary text-6xl">
                  <FontAwesomeIcon icon={faCartShopping} />
                </i>
              </div>
              <p>Your cart is empty !</p>
              <a
                className="text-primary font-semibold text-base hover:underline"
                href="/"
              >
                Return to dashboard
              </a>
            </div>
          )}
        </>
      )}
    </WrapperWIthSpacing>
  )
}

export default Cart
