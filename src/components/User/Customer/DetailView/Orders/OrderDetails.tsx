import { CalculateTotalPrice } from '@/Cart/components/calculateTotalPrice'
import {
  formatDateToDDMMYYYY,
  formatISODateRange,
  formatISODateToDayOfWeek,
} from '@/helpers/helpers'
import { Order, OrderProduct } from '@/helpers/types'
import { useAppDispatch } from '@/hooks/hooks'
import { getOrderWithUserID } from '@/store/orders/orderSlice'
import WrappingCard from '@/ui/WrappingCard'
import {
  faBackward,
  faPrint,
  faReorder,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { Dropdown } from 'react-bootstrap'
import { useLocation, useParams } from 'react-router-dom'
const Asus = require('@/assets/images/asus.png')

const OrderDetails = () => {
  const location = useLocation()
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const orderResponse = location.state.orders

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
                <Dropdown.Item href="#">
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
      <WrappingCard marginBtm="20px" padding="12px">
        <div className="d-flex justify-content-between border-bottom pb-2">
          <p className="text-lg">Products</p>
          <p className="text-lg">Price</p>
        </div>
        {order1.products.map((product: OrderProduct) => (
          <div className="d-flex justify-content-between product-details-div align-items-center py-2">
            <div className="d-flex align-items-center">
              <img src={Asus} alt="" className="" style={{ width: '100px' }} />
              <div className="d-flex pl-3" style={{ flexDirection: 'column' }}>
                <p className="font-normal text-lg">
                  {typeof product.product === 'string'
                    ? ''
                    : product.product.title}
                </p>
                <p className=" text-sm">Sasia: {product.quantity}</p>
              </div>
            </div>
            <div
              className="d-flex text-end"
              style={{ flexDirection: 'column' }}
            >
              <p className="font-normal text-lg">
                {typeof product.product === 'string'
                  ? ''
                  : product.product.price.toFixed(2)}{' '}
                €
              </p>
            </div>
          </div>
        ))}
      </WrappingCard>
      <WrappingCard marginBtm="20px" padding="12px">
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
      </WrappingCard>
      <WrappingCard padding="12px">
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
        </div>
      </WrappingCard>
    </>
  )
}

export default OrderDetails
