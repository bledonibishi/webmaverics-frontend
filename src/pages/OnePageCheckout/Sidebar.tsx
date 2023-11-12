import { Image, formatISODateRange2dates } from '@/helpers/helpers'
import { Address, CartItem, Product } from '@/helpers/types'
import React from 'react'
import BillingInfo from './BillingInfo'
import ShippingInfo from './ShippingInfo'
import { CalculateTotalPrice } from '@/Cart/components/calculateTotalPrice'
import OrdersTotal from './OrdersTotal'
import CartProducts from './CartProducts'

type SidebarTypes = {
  cart: CartItem | undefined
  selectedAddress: Address | undefined
  transportAddress: Address | undefined
  paymentMethod: string
  shippingMethod: string
}

const Sidebar: React.FC<SidebarTypes> = ({
  cart,
  selectedAddress,
  paymentMethod,
  transportAddress,
  shippingMethod,
}) => {
  const totalPriceInfo = CalculateTotalPrice(cart?.products)
  const {
    totalPriceWithVAT,
    totalTvsh,
    discountValueInEuros,
    discountedTotalPriceWithoutVAT,
  } = totalPriceInfo

  const defaultCartItem: CartItem = {
    status: '',
    results: 0,
    products: [],
  }
  return (
    <div className="side-3 sticky top-28 mb-4 md:mb-0  md:mt-0">
      <div className="w-100">
        <div className="order-summary-content d-flex flex-col-reverse">
          <div className="order-summary-content d-flex flex-col-reverse">
            <div className="order-review-data rounded bg-white shadow-md d-flex flex-col md:p-3 p-2 overflow-hidden">
              <BillingInfo
                selectedAddress={selectedAddress}
                paymentMethod={paymentMethod}
              />
              <ShippingInfo
                transportAddress={transportAddress}
                shippingMethod={shippingMethod}
              />
            </div>

            <form id="shopping-cart-form">
              <OrdersTotal
                shippingMethod={shippingMethod}
                totalPriceWithVAT={totalPriceWithVAT}
                discountedTotalPriceWithoutVAT={discountedTotalPriceWithoutVAT}
                totalTvsh={totalTvsh}
                discountValueInEuros={discountValueInEuros}
              />
              <CartProducts cart={cart ? cart : defaultCartItem} />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
