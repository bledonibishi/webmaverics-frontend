import { formatISODateRange2dates } from '@/helpers/helpers'
import React from 'react'

type OrderTotalTypes = {
  totalPriceWithVAT: number | undefined
  discountedTotalPriceWithoutVAT: number
  totalTvsh: number
  discountValueInEuros: number | undefined
  shippingMethod: string
}

const OrdersTotal: React.FC<OrderTotalTypes> = ({
  discountedTotalPriceWithoutVAT,
  shippingMethod,
  totalTvsh,
  discountValueInEuros,
  totalPriceWithVAT,
}) => {
  return (
    <div className="d-flex flex-col rounded shadow-md mb-3 bg-white p-3 md:p-4">
      <span className="d-flex pb-3 md:pb-4 text-sm text-gray-700 font-medium">
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
                  {Math.round(
                    discountedTotalPriceWithoutVAT
                      ? discountedTotalPriceWithoutVAT
                      : 0
                  ).toLocaleString()}
                  .00 €
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
                <span className="text-gray-700">{totalTvsh?.toFixed(2)} €</span>
              </span>
            </div>
            <div className="discount-total d-flex justify-content-between p-2 text-sm text-gray-600">
              <span>
                <label>Duke përfshirë zbritjen:</label>
              </span>
              <span>
                <span className="value-summary text-gray-700 discount">
                  -
                  {Math.round(
                    discountValueInEuros ? discountValueInEuros : 0
                  ).toLocaleString()}
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
                    ).toLocaleString()}
                    .00 €
                  </span>
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
                {formatISODateRange2dates(3, 5)}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrdersTotal
