import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import './cart.css'
import { useDispatch, useSelector } from 'react-redux'
import WrapperWIthSpacing from '@/ui/WrapperWIthSpacing'
import WrappingCard from '@/ui/WrappingCard'
import Apple from '@/assets/images/productIMG1.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { useNavigate } from 'react-router-dom'
import { getCartProducts } from '../store/cartSlice'
import { useGetCartProductsQuery } from '../store/cartAPI'
import { CartItemProduct, Product } from '@/helpers/types'

const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.user)
  const {
    data: cart,
    refetch,
    isLoading: cartLoading,
  } = useGetCartProductsQuery()

  useEffect(() => {
    dispatch(getCartProducts())
  }, [])

  console.log('cart?.products', cart?.products)

  const goToLogin = () => {
    navigate('/login/identifier')
  }
  const goToOnePageCheckout = () => {
    navigate('/onepagecheckout#opc-billing')
  }
  const calculateTotalPrice = (items: CartItemProduct[] | undefined) => {
    const VAT_RATE = 0.18

    const priceAfterDiscount = items?.reduce(
      (totalPrice: number, cartItem: CartItemProduct) => {
        const discountPercentage = cartItem.product.discount || 0
        const originalPrice = cartItem.product.price
        const discountedPrice =
          originalPrice - (originalPrice * discountPercentage) / 100
        return totalPrice + discountedPrice
      },
      0
    )

    const discountValueInEuros = items?.reduce(
      (totalDiscountInEuros: number, cartItem: CartItemProduct) => {
        const discountPercentage = cartItem.product.discount || 0
        const originalPrice = cartItem.product.price
        const discountedPrice =
          originalPrice - (originalPrice * discountPercentage) / 100
        const discountInEuros = originalPrice - discountedPrice
        return totalDiscountInEuros + discountInEuros
      },
      0
    )

    console.log(
      'discount value in euros',
      Math.floor(discountValueInEuros ? discountValueInEuros : 0)
    )

    const zbritja = 6

    const totalTvsh = items
      ? items?.reduce((total: number, cartItem: CartItemProduct) => {
          return (
            total +
            cartItem.product.priceDiscount * cartItem.quantity * VAT_RATE
          )
        }, 0)
      : 0

    const totalPriceWithVAT = items?.reduce(
      (total: number, cartItem: CartItemProduct) => {
        return total + cartItem.product.priceDiscount * cartItem.quantity
      },
      0
    )

    const totalPriceWithoutVAT = items
      ? items.reduce((total: number, cartItem: CartItemProduct) => {
          const itemPrice = cartItem.product.price * cartItem.quantity
          return total + itemPrice
        }, 0)
      : 0
    const discountedTotalPriceWithoutVAT = totalPriceWithoutVAT - totalTvsh

    return {
      totalPriceWithoutVAT,
      totalPriceWithVAT,
      totalTvsh,
      zbritja,
      discountValueInEuros,
      priceAfterDiscount,
      discountedTotalPriceWithoutVAT,
    }
  }
  const {
    totalPriceWithoutVAT,
    totalPriceWithVAT,
    totalTvsh,
    zbritja,
    discountValueInEuros,
    priceAfterDiscount,
    discountedTotalPriceWithoutVAT,
  } = calculateTotalPrice(cart?.products)

  return (
    <WrapperWIthSpacing>
      <div className="page-title-top md:mb-6 page-title pointer-events-none w-100 text-left md:text-left text-primary text-lg font-medium">
        Shporta
      </div>
      <div className="cart-container mb-5">
        <div className="center-3 ">
          <div className="page shopping-cart-page ">
            <WrappingCard padding="0" marginBtm="20px">
              <ul className="w-100 md:grid grid-flow-col grid-cols-10 gap-2 position-relative text-gray-700 font-semibold text-sm border-b border-gray-300 px-3 py-3">
                <li className="product col-span-4">Produktet:</li>
                <li className="unit-price col-span-2">Çmimi:</li>
                <li className="quantity col-span-2">Sasia:</li>
                <li className="subtotal col-span-2">Total:</li>
                <li className="remove-from-cart absolute right-4 top-3">
                  <a
                    className="rounded p-1 btn-secondary btn-secondary-hover border border-transparent"
                    href="/deleteCartItems/1"
                  >
                    <i
                      title="Largo te gjitha produktet nga shporta"
                      className="icon-delete-trash text-gray-700 text-xl"
                      //  onclick="sendRemoveListEvent('[{&quot;Sku&quot;:&quot;272523app&quot;,&quot;VendorName&quot;:&quot;&quot;,&quot;Picture&quot;:{&quot;Id&quot;:0,&quot;ImageUrl&quot;:&quot;https://hhstsyoejx.gjirafa.net/gjirafa50core/images/56e7f672-9169-49cf-ac52-f99809bd64bb/56e7f672-9169-49cf-ac52-f99809bd64bb.jpeg&quot;,&quot;ThumbImageUrl&quot;:null,&quot;FullSizeImageUrl&quot;:null,&quot;ImageUrlWithoutExt&quot;:&quot;https://hhstsyoejx.gjirafa.net/gjirafa50core/images/56e7f672-9169-49cf-ac52-f99809bd64bb/56e7f672-9169-49cf-ac52-f99809bd64bb&quot;,&quot;Title&quot;:&quot;Shfaq detaje për Apple iPhone 15, 128GB, Black&quot;,&quot;AlternateText&quot;:&quot;Foto e Apple iPhone 15, 128GB, Black&quot;,&quot;CustomProperties&quot;:{}},&quot;ProductId&quot;:160697,&quot;ProductName&quot;:&quot;Apple iPhone 15, 128GB, Black&quot;,&quot;ProductSeName&quot;:&quot;apple-iphone-15-128gb-black&quot;,&quot;UnitPrice&quot;:&quot;1,099.50 €&quot;,&quot;UnitPriceWithoutDiscount&quot;:null,&quot;SubTotal&quot;:&quot;1,099.50 €&quot;,&quot;Discount&quot;:null,&quot;MaximumDiscountedQty&quot;:null,&quot;Quantity&quot;:1,&quot;AllowedQuantities&quot;:[],&quot;AttributeInfo&quot;:&quot;&quot;,&quot;RecurringInfo&quot;:null,&quot;RentalInfo&quot;:null,&quot;AllowItemEditing&quot;:false,&quot;DisableRemoval&quot;:false,&quot;Warnings&quot;:[],&quot;HasWarranty&quot;:true,&quot;SciHasWarranty&quot;:null,&quot;WarrantyPrice&quot;:null,&quot;SciWarrantyPrice&quot;:&quot;0.00 €&quot;,&quot;IsValid&quot;:true,&quot;Id&quot;:216330,&quot;CustomProperties&quot;:{}},{&quot;Sku&quot;:&quot;304984&quot;,&quot;VendorName&quot;:&quot;&quot;,&quot;Picture&quot;:{&quot;Id&quot;:0,&quot;ImageUrl&quot;:&quot;https://hhstsyoejx.gjirafa.net/gjirafa50core/images/4b2bb16f-11a7-482f-a01c-4cc873512f87/4b2bb16f-11a7-482f-a01c-4cc873512f87.jpeg&quot;,&quot;ThumbImageUrl&quot;:null,&quot;FullSizeImageUrl&quot;:null,&quot;ImageUrlWithoutExt&quot;:&quot;https://hhstsyoejx.gjirafa.net/gjirafa50core/images/4b2bb16f-11a7-482f-a01c-4cc873512f87/4b2bb16f-11a7-482f-a01c-4cc873512f87&quot;,&quot;Title&quot;:&quot;Shfaq detaje për Maus Logitech G Pro X Superlight, i bardhë&quot;,&quot;AlternateText&quot;:&quot;Foto e Maus Logitech G Pro X Superlight, i bardhë&quot;,&quot;CustomProperties&quot;:{}},&quot;ProductId&quot;:14559,&quot;ProductName&quot;:&quot;Maus Logitech G Pro X Superlight, i bardhë&quot;,&quot;ProductSeName&quot;:&quot;maus-logitech-g-pro-x-superlight-i-bardhe&quot;,&quot;UnitPrice&quot;:&quot;119.50 €&quot;,&quot;UnitPriceWithoutDiscount&quot;:&quot;149.50 €&quot;,&quot;SubTotal&quot;:&quot;119.50 €&quot;,&quot;Discount&quot;:&quot;30.00 €&quot;,&quot;MaximumDiscountedQty&quot;:null,&quot;Quantity&quot;:1,&quot;AllowedQuantities&quot;:[],&quot;AttributeInfo&quot;:&quot;&quot;,&quot;RecurringInfo&quot;:null,&quot;RentalInfo&quot;:null,&quot;AllowItemEditing&quot;:false,&quot;DisableRemoval&quot;:false,&quot;Warnings&quot;:[],&quot;HasWarranty&quot;:true,&quot;SciHasWarranty&quot;:null,&quot;WarrantyPrice&quot;:&quot;9.50 €&quot;,&quot;SciWarrantyPrice&quot;:&quot;0.00 €&quot;,&quot;IsValid&quot;:true,&quot;Id&quot;:216334,&quot;CustomProperties&quot;:{}}]','cart')"
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
                  originalPrice - (originalPrice * discountPercentage) / 100
                const discountValueInEurosIN = originalPrice - discountedPrice

                return (
                  <div className="border-b last:border-none border-gray-300 py-4 relative px-1 md:px-2 py-3">
                    <div className="w-100 grid grid-cols-10 grid-flow-row md:grid-flow-col table-content align-items-start gap-2 position-relative">
                      <div className=" md:col-span-4 grid grid-flow-col pb-2 md:pb-2 justify-content-start align-items-center">
                        {/* col-span-10 */}
                        <a
                          className="d-flex w-16 h-16 align-items-center justify-content-center small-image-container mr-4"
                          href="/apple-iphone-15-128gb-black"
                        >
                          <img
                            className="max-w-full max-h-full position-relative"
                            alt="Foto e Apple iPhone 15, 128GB, Black"
                            src={Apple}
                            // srcset="https://hhstsyoejx.gjirafa.net/gjirafa50core/images/56e7f672-9169-49cf-ac52-f99809bd64bb/56e7f672-9169-49cf-ac52-f99809bd64bb.webp?w=64"
                            title="Shfaq detaje për Apple iPhone 15, 128GB, Black"
                          />
                        </a>
                        <div className="product text-left">
                          <a
                            href="/apple-iphone-15-128gb-black"
                            className="product-name cart-product-name hover:text-primary product-title-lines text-sm"
                          >
                            {product.product.title}
                          </a>
                          <div className="sku pt-2 text-gray-600 text-xs">
                            SKU: 272523app
                          </div>
                        </div>
                      </div>
                      <div className="unit-price md:col-span-2">
                        {/*  col-span-6 */}
                        <span className="product-unit-price font-semibold text-left text-base text-gray-700">
                          {product.product.priceDiscount.toFixed(2)}€
                        </span>

                        {product.product.discount !== 0 && (
                          <div className="discount text-center md:text-left d-flex md:flex-col">
                            <span className="text-primary text-xs font-medium">
                              * Ju kurseni:
                            </span>
                            <span className="text-primary text-sm font-semibold pl-3">
                              {Math.floor(discountValueInEurosIN) || 0}.00 €
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="quantity  md:col-span-2 d-flex align-items-center  md:justify-start">
                        {/* col-span-4 */}
                        <input
                          type="button"
                          value="-"
                          className="qty-click-input qtyminus minus outline-none border border-gray-300 bg-white text-gray-600 text-xl rounded-tl rounded-bl"
                          data-quantity="decrease"
                        />
                        <input
                          name="itemquantity216330"
                          id="itemquantity216330"
                          type="number"
                          value="1"
                          className="qty qty-input w-1/3 text-center rounded-md focus-visible:ring-primary border border-gray-300 text-gray-700 font-semibold"
                          aria-label="Sasia"
                          data-productid="160697"
                          data-itemid="216330"
                          min="1"
                          max="1000"
                        />
                        <input
                          type="button"
                          value="+"
                          className="qty-click-input qtyplus plus outline-none bg-white border border-gray-300 text-gray-600 text-xl rounded-tr rounded-br"
                          data-quantity="increase"
                        />
                      </div>
                      <div className="subtotal grid grid-flow-col  md:col-span-2 justify-content-between bg-gray-100 md:bg-white rounded p-2 md:p-0">
                        {/* col-span-10 */}
                        <span className="md:hidden">Total</span>
                        <span className="product-subtotal text-base text-gray-700 font-semibold">
                          {product.product.priceDiscount.toFixed(2)}
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
                          // onclick="SendDeleteFromCartEvent('160697',`Apple iPhone 15, 128GB, Black`,'1,099.50 €','1','cart');$('#removefromcart216330').attr('checked', true).change();"
                        >
                          <i className="icon-delete-trash text-gray-700 text-xl">
                            <FontAwesomeIcon icon={faTrashCan} />
                          </i>
                        </button>
                      </div>
                    </div>
                    <div id="product-160697" className="mt-2 md:ml-20"></div>
                  </div>
                )
              })}
            </WrappingCard>
          </div>
          <div className="shopping-cart-flex bg-white rounded shadow-md md:p-4 p-3 w-100 d-flex justify-center text-gray-700 flex-col md:flex-row items-center mb-4">
            <i className="icon-shield-gjirafa-flex text-6xl text-primary"></i>
            <div className="flex flex-col md:ml-4">
              <span className="mb-2 font-semibold text-base">GjirafaFLEX</span>
              <p className="text-sm">
                GjirafaFLEX është shërbim shtesë që ne e ofrojmë si zgjidhje të
                shpejtë nëse keni defekt me produktin brenda periudhës 1 vjeçare
                të garancionit, pa pasur nevojë për pritje te serviset e
                autorizuara. Përmes këtij shërbimi, ju do të kontaktoheni brenda
                24 orëve prej momentit të pranimit të produktit te ne, nëse
                produkti mund të servisohet, ta merrni të ri apo të keni kredi
                në të njejtën vlerë të produktit. Pastaj do të lajmëroheni për
                periudhën e pranimi të produktit të servisuar, të ri apo kthimit
                të tij.
              </p>
              <p className="pt-2 text-xs text-gray-600">
                *Defektet përfshijnë vetëm ato fabrike, dhe jo dëmet fizike që
                mund të i shkaktohen produktit.
              </p>
            </div>
          </div>
        </div>
        <div className="side-3 sticky top-28 mb-4 md:mb-0 md:mt-0">
          <form
            method="post"
            encType="multipart/form-data"
            id="shopping-cart-form"
            action="/cart"
          >
            <form
              method="post"
              encType="multipart/form-data"
              id="shopping-cart-form"
              action="/cart"
            >
              <form
                method="post"
                encType="multipart/form-data"
                id="shopping-cart-form"
                action="/cart"
              >
                <form
                  method="post"
                  encType="multipart/form-data"
                  id="shopping-cart-form"
                  action="/cart"
                >
                  <div className="cart-footer d-flex flex-col rounded shadow-md bg-white p-3 md:p-4 text-gray-700">
                    <span className="d-flex pb-3 text-sm font-medium text-gray-700">
                      Totali i porosisë:
                    </span>

                    <div className="cart-collaterals pb-3">
                      <div className="deals d-flex flex-col gap-2">
                        <div className="coupon-box d-flex flex-col gap-2">
                          <span className="text-sm text-gray-600">
                            Kodi i zbritjes
                          </span>

                          <div className="coupon-code d-flex">
                            <input
                              name="discountcouponcode"
                              id="discountcouponcode"
                              type="text"
                              className="discount-coupon-code border rounded flex-grow truncate mr-2"
                              placeholder="Shkruani kodin tuaj të zbritjes këtu"
                              aria-label="Shkruani kodin e kuptonit të zbritjes"
                            />

                            <button
                              type="submit"
                              name="applydiscountcouponcode"
                              id="applydiscountcouponcode"
                              className="apply-discount-coupon-code-button btn text-primary border rounded border-primary hover:bg-primary transition-all duration-150 hover:text-white"
                            >
                              Apliko
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
                              <label>Nëntotali:</label>
                            </span>
                            <span>
                              <span className="value-summary text-gray-700">
                                {discountedTotalPriceWithoutVAT.toFixed(2)} €
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
                                // discount="-30.00 €"

                                className="value-summary text-gray-700 discount"
                              >
                                -{discountValueInEuros?.toFixed(2)}€
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

                        <div className="d-flex flex-col justify-content-between p-2 text-sm text-gray-600 border rounded mt-3">
                          <span>
                            <label>Koha e arritjes:</label>
                          </span>
                          <span className="text-left">
                            <span
                              className="value-summary text-gray-700 order-arrival"
                              estimated-date="19.10.2023 11:05:31 e paradites"
                            >
                              19 tetor 2023 - 20 tetor 2023
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
                            // return;=""
                            onClick={goToLogin}
                            formAction="/login"
                          >
                            Kyçuni për të vazhduar
                          </button>
                        ) : (
                          <button
                            type="submit"
                            id="checkout"
                            name="checkout"
                            value="checkout"
                            className="checkout-btn btn btn-primary w-100 btn-primary-hover"
                            onClick={goToOnePageCheckout}
                          >
                            Continue
                          </button>
                        )}
                      </div>
                      <div className="addon-buttons"></div>
                    </div>
                  </div>
                  <input
                    name="__RequestVerificationToken"
                    type="hidden"
                    value="CfDJ8BavmJPrX4dBnzAs_5ATawx70WUs3I1uK9g0ObqKVBQ9uIBhB7vpXR94NFR2ijSINtzGxxtsf3AQ0TdqihrceMIqLrOstnAha85fq9WbWfOh1D1AgaY3yVERTTpitg3NAJO0_bjXGGYVANYzWG_NXis"
                  />
                </form>

                <input
                  name="__RequestVerificationToken"
                  type="hidden"
                  value="CfDJ8BavmJPrX4dBnzAs_5ATawwb4I1dRmt7jgbJx8-NdFgIs-ZOQVuS_gpAj25vtzBZF1VQxrC9wZxlU-gQc-pWS-xWBxNOeXZ8t07nc7G7wrXo-CoeB1VS6jHmn_EvIXGSgyVO0FGP7ac2I0Bg0kxrA1Y"
                />
              </form>

              <input
                name="__RequestVerificationToken"
                type="hidden"
                value="CfDJ8BavmJPrX4dBnzAs_5ATawwsN-tiX58CCSVweAu74G_7wA8gxLYWQSyR5o93tnSHafZyibNdqI2Juk2K-jp7MykZfgxqIomrH9krTIqYi-x9CaAoHezlIW_0hWiREF1rrxUYLUL0YY4JEfPdUBGbm3I"
              />
            </form>

            <input
              name="__RequestVerificationToken"
              type="hidden"
              value="CfDJ8BavmJPrX4dBnzAs_5ATawxVHdI10n6bAF5V4QTsAu0f9MdObBCMhxO9v14iv0BsYiWtG1FrxPoWLXgb3Lqs4NlJaL485658HKFXE84Mk0yHyJ2WUw4mTh9Hq2s-VUWg6Nrod55pWWQgjUiaHNHr_uU"
            />
          </form>
        </div>
      </div>
    </WrapperWIthSpacing>
  )
}

export default Cart
