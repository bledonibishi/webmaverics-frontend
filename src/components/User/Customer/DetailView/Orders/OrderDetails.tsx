import WrappingCard from '@/ui/WrappingCard'
import {
  faBackward,
  faPrint,
  faReorder,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Dropdown } from 'react-bootstrap'
const Asus = require('@/assets/images/asus.png')

const OrderDetails = () => {
  const order = {
    id: '212527',
    date: '12.03.2022',
    shipmentDate: '13 mars - 14 mars',
    image: 'test.png',
    description: 'Dëgjuese QCY T1C, të zeza',
    price: 19.5,
    quantity: 1,
    transport: 'Free transport',
    total: 39.0,
    discount: 20.0,
    tax: 2.97,
    gjirafaFlex: 1.5,
  }

  const transportMode = {
    status: 'submitted',
    mode: 'gjirafaSwift',
  }

  const paymentMode = {
    status: 'payed',
    mode: 'Paguaj me para në dorë',
  }

  const transportAddress = {
    name: 'Bledon',
    lastname: 'Ibishi',
    address: 'Hamdi gashi',
    city: 'vushtrri',
    country: 'kosove',
    email: 'bledonibishi1@gmail.com',
    telephone: '045223091',
  }
  const billingAddress = {
    name: 'Bledon',
    lastname: 'Ibishi',
    address: 'Hamdi gashi',
    city: 'vushtrri',
    country: 'kosove',
    email: 'bledonibishi1@gmail.com',
    telephone: '045223091',
  }

  const commentAboutOrder = {
    comment: 'bledonibishi',
  }
  return (
    <>
      <WrappingCard marginBtm="20px" padding="12px">
        <div className="d-flex align-items-center justify-content-between">
          <p className="text-lg">
            Porosia:{' '}
            <span className="text-primary font-semibold">#{order.id}</span>
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
          <p>Order date: {order.date}</p>
          <p>Date of shipment: {order.shipmentDate}</p>
        </div>
      </WrappingCard>
      <WrappingCard marginBtm="20px" padding="12px">
        <div className="d-flex justify-content-between border-bottom pb-2">
          <p className="text-lg">Products</p>
          <p className="text-lg">Price</p>
        </div>
        <div className="d-flex justify-content-between product-details-div align-items-center pt-2">
          <div className="d-flex align-items-center">
            <img src={Asus} alt="" className="" />
            <div className="d-flex pl-3" style={{ flexDirection: 'column' }}>
              <p className="font-normal text-lg">{order.description}</p>
              <p className=" text-sm">Sasia: {order.quantity}</p>
            </div>
          </div>
          <div className="d-flex text-end" style={{ flexDirection: 'column' }}>
            <p className="font-normal text-lg">{order.price} $</p>
            <p className="text-primary text-sm">
              GjirafaFLEX({order.gjirafaFlex + '$'})
            </p>
          </div>
        </div>
      </WrappingCard>
      <WrappingCard marginBtm="20px" padding="12px">
        <div className="border-bottom">
          <div className="d-flex justify-content-between pb-3">
            <p>Subtotal:</p>
            <p>{order.total.toFixed(2)} $</p>
          </div>
          <div className="d-flex justify-content-between pb-3">
            <p>Discount:</p>
            <p>-{order.discount.toFixed(2)} $</p>
          </div>
          <div className="d-flex justify-content-between pb-3">
            <p>Transport:</p>
            <p className="text-success">{order.transport}</p>
          </div>
          <div className="d-flex justify-content-between pb-3">
            <p>TAX:</p>
            <p>{order.tax} $</p>
          </div>
          <div className="d-flex justify-content-between pb-3">
            <p>GjirafaFlex:</p>
            <p>{order.gjirafaFlex} $</p>
          </div>
        </div>
        <div className="d-flex justify-content-between pb-3">
          <p>Total:</p>
          <p className="text-primary">21.00 $</p>
        </div>
      </WrappingCard>
      <WrappingCard padding="12px">
        <div className="order-details-transport">
          <div>
            <p className="font-semibold pb-2">Transport mode:</p>
            <p>{transportMode.mode}</p>
            <p>{transportMode.status}</p>
          </div>
          <div>
            <p className="font-semibold pb-2">Payment method:</p>
            <p>{paymentMode.mode}</p>
            <p>{paymentMode.status}</p>
          </div>
          <div>
            <p className="font-semibold pb-2">Transport address:</p>
            <p>{transportAddress.name + ' ' + transportAddress.lastname}</p>
            <p>{transportAddress.address}</p>
            <p>{transportAddress.city}</p>
            <p>{transportAddress.country}</p>
            <p>{transportAddress.email}</p>
            <p>{transportAddress.telephone}</p>
          </div>
          <div>
            <p className="font-semibold pb-2">Billing address:</p>
            <p>{billingAddress.name + ' ' + billingAddress.lastname}</p>
            <p>{billingAddress.address}</p>
            <p>{billingAddress.city}</p>
            <p>{billingAddress.country}</p>
            <p>{billingAddress.email}</p>
            <p>{billingAddress.telephone}</p>
          </div>
        </div>
        <div className="gap-2 bg-gray-100 rounded text-gray-700 p-3 mt-3">
          <div className="text text-sm font-semibold">
            Koment rreth porosisë:
          </div>
          <div className="text-sm">{commentAboutOrder.comment}</div>
        </div>
      </WrappingCard>
    </>
  )
}

export default OrderDetails
