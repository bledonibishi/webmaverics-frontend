import React, { useEffect } from 'react'
import WrappingCard from '../../../../../ui/WrappingCard'
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRight,
  faReorder,
  faSearch,
} from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { Form, FormSelect, InputGroup } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { getOrderWithUserID } from '@/store/orders/orderSlice'
import { Order, OrderProduct } from '@/helpers/types'
import { Image, formatDateToDDMMYYYY } from '@/helpers/helpers'
const AsusImage = require('../../../../../assets/images/asus.png')

type OrderCardProps = {
  id: string
  sericalNumber: string
  completionDate: string
  status: string
  price: Number
  products: OrderProduct[]
  orders: Order[]
}

const OrderCard = ({
  id,
  sericalNumber,
  completionDate,
  status,
  price,
  products,
  orders,
}: OrderCardProps) => {
  const navigate = useNavigate()

  const handleDetails = (id: string) => {
    navigate(`/customer/orderdetails/${id}`, { state: { orders: orders } })
  }

  console.log('products', products)

  return (
    <>
      <div className="d-flex align-items-center justify-content-between border-primary-gray">
        <div className="d-flex order-info-div">
          <p>#{sericalNumber}</p>

          <p>{formatDateToDDMMYYYY(completionDate)}</p>
          {/* <p>{completionDate.toLocaleDateString()}</p> */}
          <p className={`${status} fw-bold`}>{status}</p>
          {price && <p>{price.toFixed(2)} €</p>}
        </div>
        <p
          className="d-flex align-items-center hover-primary cursor-pointer"
          onClick={() => handleDetails(id)}
        >
          Details <FontAwesomeIcon icon={faArrowRight} className="pl-1 w-75" />
        </p>
      </div>

      <div className="d-flex justify-content-start flex-wrap gap-3 p-3 md:p-4 p-3 md:-4 ">
        {products.map((prod) => (
          <div
            title="Set montimi Solarix M6, 4 dado, 4 bulona, 4 rondele, SM6        "
            className="d-flex align-items-center justify-content-center rounded bg-white w-16 h-16 p-1 border border-gray-300"
          >
            <a
              href="set-montimi-solarix-m6-4-dado-4-bulona-4-rondele-sm6"
              className="d-flex justify-content-center align-items-center w-100 h-100"
            >
              <Image
                src={
                  typeof prod.product === 'string'
                    ? ''
                    : prod.product.imageCover || ''
                }
                alt="imageCover"
                className="max-w-full max-h-full"
              />
            </a>
          </div>
        ))}
      </div>
    </>
  )
}

const Orders = () => {
  const completionDate = new Date()
  const dispatch = useAppDispatch()
  const price = 21.0
  const { orders } = useAppSelector((state) => state.orders)
  console.log('orders', orders)

  useEffect(() => {
    dispatch(getOrderWithUserID())
  }, [])
  return (
    <div className="orders-list">
      <WrappingCard marginBtm="20px" padding="12px">
        <div className="d-flex justify-content-between orders-header">
          <p className="text-lg">Porosite</p>
          <div className="d-flex align-items-center">
            <FormSelect
              className="addresses-select"
              aria-label="Default select example"
            >
              <option className="selectCustom-option sort-options bg-white text-sm font-medium flex justify-center text-gray-600 light-dropdown-hover">
                Te gjitha
              </option>
              <option
                className="selectCustom-option sort-options bg-white text-sm font-medium flex justify-center text-gray-600 light-dropdown-hover"
                value="1"
              >
                Ne pritje
              </option>
              <option
                className="selectCustom-option sort-options bg-white text-sm font-medium flex justify-center text-gray-600 light-dropdown-hover"
                value="2"
              >
                Duke u procesuar
              </option>
              <option
                className="selectCustom-option sort-options bg-white text-sm font-medium flex justify-center text-gray-600 light-dropdown-hover"
                value="3"
              >
                Kompletuar
              </option>
              <option
                className="selectCustom-option sort-options bg-white text-sm font-medium flex justify-center text-gray-600 light-dropdown-hover"
                value="3"
              >
                Anuluar
              </option>
            </FormSelect>
            <InputGroup>
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
              <InputGroup.Text id="inputGroup-sizing-small">
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
            </InputGroup>
          </div>
        </div>
      </WrappingCard>
      {orders.length ? (
        orders.map((order) => (
          <WrappingCard marginBtm={'20px'} padding="12px">
            <OrderCard
              id={order._id}
              sericalNumber={order.orderCode}
              completionDate={order.arrivalDate}
              status={order.status}
              price={order.totalOrderPrice}
              products={order.products}
              orders={orders}
            />
          </WrappingCard>
        ))
      ) : (
        <div className="no-data w-100 bg-white rounded shadow-md d-flex flex-col align-items-center px-4 py-5">
          <div className="w-32 h-32 rounded-full bg-gray-100 d-flex align-items-center justify-content-center mb-4">
            <i className="icon-megaphone text-6xl text-gray-600">
              <FontAwesomeIcon icon={faReorder} />
            </i>
          </div>
          <p className="font-medium text-base tablet:text-lg text-center break-words">
            Ju ende nuk keni bërë ndonjë porosi
          </p>
          <p className="text-sm tablet:text-base text-center break-words">
            Kontrolloni përsëri pas blerjes së ardhshme.
          </p>
        </div>
      )}
      {orders.length ? (
        <WrappingCard padding="12px">Pagination</WrappingCard>
      ) : null}
    </div>
  )
}

export default Orders
