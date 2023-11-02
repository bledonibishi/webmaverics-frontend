import { CalculateTotalPrice } from '@/Cart/components/calculateTotalPrice'
import {
  Image,
  formatDateToDDMMYYYY,
  formatISODateRange,
  formatISODateToDayOfWeek,
} from '@/helpers/helpers'
import { Order, OrderProduct } from '@/helpers/types'
import { useAppDispatch } from '@/hooks/hooks'
import { getOrderWithUserID } from '@/store/orders/orderSlice'
import { useCreateOneMutation } from '@/store/returnRequests/returnRequestAPI'
import WrappingCard from '@/ui/WrappingCard'
import {
  faBackward,
  faPrint,
  faReorder,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { useLocation, useParams } from 'react-router-dom'
import ReturnRequestModal from './ReturnRequestModal'
const Asus = require('@/assets/images/asus.png')

const OrderDetails = () => {
  const location = useLocation()
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const orderResponse = location.state.orders

  const [returnRequestModal, setReturnRequestModal] = useState(false)

  const order1 = orderResponse.find((order: Order) => order._id === id)
  console.log('order', order1)

  const totalPriceInfo = CalculateTotalPrice(order1?.products)
  const {
    totalPriceWithoutVAT,
    totalPriceWithVAT,
    totalTvsh,
    discountValueInEuros,
    priceAfterDiscount,
    discountedTotalPriceWithoutVAT,
  } = totalPriceInfo

  return (
    <>
      <WrappingCard marginBtm="20px" padding="12px">
        <div className="d-flex align-items-center justify-content-between">
          <p className="text-lg">
            Porosia:{' '}
            <span className="text-primary font-semibold">
              #{order1.orderCode}
            </span>
          </p>
          <div className="d-flex">
            <button className="btn btn-primary btn-primary-hover">
              <FontAwesomeIcon icon={faReorder} className="pr-2" />
              Reorder
            </button>
            <Dropdown>
              <Dropdown.Toggle
                className="btn bg-primary-lightBackground border-white text-primary ml-3"
                id="dropdown-basic"
              >
                ...
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#">
                  {' '}
                  <FontAwesomeIcon icon={faPrint} className="pr-2" /> Print
                </Dropdown.Item>
                <Dropdown.Item
                  href="#"
                  onClick={() => setReturnRequestModal(true)}
                >
                  <FontAwesomeIcon icon={faBackward} className="pr-2" />
                  Make a Request for return
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </WrappingCard>
      <WrappingCard marginBtm="20px" padding="12px">
        <div className="text-center">
          <p
            className="text-lg font-semibold"
            style={{ paddingBottom: '12px' }}
          >
            Order status
          </p>
          <p>
            Order date:{' '}
            <strong>{formatDateToDDMMYYYY(order1.orderDate)}</strong>
          </p>
          <p>
            Date of shipment:{' '}
            <strong>{formatISODateRange(order1.arrivalDate, 3)}</strong>
          </p>
        </div>
      </WrappingCard>
      <div
        className="bg-white shadow-md "
        style={{ padding: '12px', marginBottom: '22px' }}
      >
        <div className="d-flex justify-content-between border-bottom pb-2">
          <p className="text-lg">Products</p>
          <p className="text-lg">Price</p>
        </div>
        {order1.products.map((product: OrderProduct) => (
          <div className="d-flex justify-content-between grid-flow-row md:grid-flow-col grid-cols-4 align-items-center border-b last:border-none border-gray-300 p-4 md:px-0 last:pb-0">
            <div className="col-span-3 d-flex align-items-center gap-3 md:gap-4">
              <div className="w-12 h-12 md:w-16 md:h-16 d-flex justify-content-center align-items-center small-image-container">
                <Image
                  src={
                    typeof product.product === 'string'
                      ? ''
                      : product.product.imageCover || ''
                  }
                  alt="imageCover"
                  className="max-w-full max-h-full position-relative"
                />
              </div>
              <div className="d-flex flex-col gap-1 tablet:gap-2 tablet:h-auto">
                <a
                  className="product-name text-sm font-medium text-gray-700 text-left"
                  href="/set-montimi-solarix-m6-4-dado-4-bulona-4-rondele-sm6"
                >
                  {' '}
                  {typeof product.product === 'string'
                    ? ''
                    : product.product.title}{' '}
                </a>
                <p className="text-xs text-gray-700">
                  Sasia: <span className="font-medium">{product.quantity}</span>
                </p>
              </div>
            </div>
            <div className="col-span-1 d-flex flex-col align-items-end gap-1 tablet:gap-2 whitespace-nowrap justify-content-end text-sm font-semibold text-gray-700">
              <p className="">
                {' '}
                {typeof product.product === 'string'
                  ? ''
                  : product.product.price.toFixed(2)}{' '}
                €
              </p>
            </div>
          </div>
        ))}
      </div>
      <div
        className="bg-white shadow-md "
        style={{ padding: '12px', marginBottom: '22px' }}
      >
        <div className="border-bottom">
          <div className="d-flex justify-content-between pb-3">
            <p>Subtotal:</p>
            <p>{discountedTotalPriceWithoutVAT.toFixed(2)} €</p>
          </div>
          <div className="d-flex justify-content-between pb-3">
            <p>Discount:</p>
            <p>-{discountValueInEuros?.toFixed(2)} €</p>
          </div>
          <div className="d-flex justify-content-between pb-3">
            <p>Transport:</p>
            <p className="text-success">{order1.transportMode}</p>
          </div>
          <div className="d-flex justify-content-between pb-3">
            <p>TAX:</p>
            <p>{order1.tvsh.toFixed(2)} €</p>
          </div>
        </div>
        <div className="d-flex justify-content-between pb-3">
          <p>Total:</p>
          <p className="text-primary">{order1.totalOrderPrice.toFixed(2)} €</p>
        </div>
      </div>

      {/* <WrappingCard padding="12px">
        <div className="order-details-transport">
          <div>
            <p className="font-semibold pb-2">Transport mode:</p>
            <p>{order1.transportMode}</p>
            <p>{order1.transportModeStatus}</p>
          </div>
          <div>
            <p className="font-semibold pb-2">Payment method:</p>
            <p>{order1.paymentMethod}</p>
            <p>{order1.paymentMethodStatus}</p>
          </div>
          <div>
            <p className="font-semibold pb-2">Transport address:</p>
            <p>{order1.addressID.name + ' ' + order1.addressID.surname}</p>
            <p>{order1.addressID.address}</p>
            <p>{order1.addressID.city}</p>
            <p>{order1.addressID.country}</p>
            <p>{order1.addressID.email}</p>
            <p>{order1.addressID.telephone}</p>
          </div>
          <div>
            <p className="font-semibold pb-2">Billing address:</p>
            <p>
              {order1.billingAddress.name + ' ' + order1.billingAddress.surname}
            </p>
            <p>{order1.billingAddress.address}</p>
            <p>{order1.billingAddress.city}</p>
            <p>{order1.billingAddress.country}</p>
            <p>{order1.billingAddress.email}</p>
            <p>{order1.billingAddress.telephone}</p>
          </div>
        </div>
        <div className="gap-2 bg-gray-100 rounded text-gray-700 p-3 mt-3">
          <div className="text text-sm font-semibold">
            Koment rreth porosisë:
          </div>
          <div className="text-sm">
            {order1.comment ? order1.comment : 'No comment'}
          </div>
        </div> */}
      <div className="order-details-area d-flex flex-col gap-y-6 p-3 md:p-6 rounded bg-white shadow-md text-sm text-gray-700">
        <div className="d-grid tablet:grid-cols-2 gap-6">
          <div className="shipping-info-wrap text-left">
            <div className="d-flex flex-col w-100 text-left mb-4">
              <span className="font-semibold mb-2">Mënyra e transportit:</span>
              <span className="flex-1">{order1.transportMode}</span>
              <span className="shipping-status col-span-6">
                {order1.transportModeStatus}
              </span>
            </div>
            <div className="shipping-info">
              <div className="title mb-2">
                <span className="font-semibold text-sm">
                  Adresa e transportit:
                </span>
              </div>
              <ul className="info-list grid grid-cols-6">
                <li className="name col-span-6 capitalize truncate">
                  {order1.addressID.name + ' ' + order1.addressID.surname}
                </li>
                <li className="address1 col-span-6">
                  {order1.addressID.address}
                </li>
                <li className="city-state-zip col-span-6">
                  {order1.addressID.city}{' '}
                </li>
                <li className="country col-span-6">
                  {order1.addressID.country}
                </li>
                <li className="email col-span-6 truncate">
                  {order1.addressID.email}
                </li>
                <li className="phone col-span-6">
                  {order1.addressID.telephone}
                </li>
              </ul>
            </div>
          </div>
          <div className="d-flex flex-col gap-6">
            <div className="d-flex flex-col ">
              <ul className="payment-method-info d-grid grid-cols-6">
                <li className="payment-method col-span-6 font-semibold mb-2">
                  Mënyra e pagesës:
                </li>
                <li className="payment-method col-span-6">
                  {order1.paymentMethod}
                </li>
                <li className="payment-method-status col-span-6">
                  {order1.paymentMethodStatus}
                </li>
              </ul>
            </div>
            <div className="billing-info-wrap text-left">
              <div className="billing-info text-gray-700">
                <div className="title mb-2">
                  <span className="font-semibold text-sm">
                    Adresa e faturimit:
                  </span>
                </div>
                <ul className="info-list grid grid-cols-6">
                  <li className="name col-span-6 capitalize truncate">
                    {order1.billingAddress.name +
                      ' ' +
                      order1.billingAddress.surname}
                  </li>
                  <li className="address1 col-span-6">
                    {order1.billingAddress.address}
                  </li>
                  <li className="city-state-zip col-span-6">
                    {order1.billingAddress.city}{' '}
                  </li>
                  <li className="country col-span-6">
                    {order1.billingAddress.country}
                  </li>
                  <li className="email col-span-6 truncate">
                    {order1.billingAddress.email}
                  </li>
                  <li className="phone col-span-6">
                    {order1.billingAddress.telephone}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="gap-2 bg-gray-100 rounded text-gray-700 p-3 mt-3">
            <div className="text text-sm font-semibold">
              Koment rreth porosisë:
            </div>
            <div className="text-sm">
              {order1.comment ? order1.comment : 'No comment'}
            </div>
          </div>
        </div>
        {returnRequestModal && (
          <ReturnRequestModal
            show={returnRequestModal}
            onHide={() => setReturnRequestModal(false)}
            order={order1._id}
            productsDetails={order1.products}
          />
        )}
      </div>
      {/* </WrappingCard> */}
    </>
  )
}

export default OrderDetails
