import React, { useEffect, useState } from 'react'
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
import PaginationComponent from '@/helpers/Pagination'
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
  const dispatch = useAppDispatch()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterOption, setFilterOption] = useState('all')
  const { orders } = useAppSelector((state) => state.orders)
  const [filteredOptionData, setFilteredOptionData] = useState<Order[]>([])
  const [orderData, setOrderData] = useState<Order[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const ordersPerPage = 5

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const indexOfLastOrder = currentPage * ordersPerPage
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
  const currentOrders = orderData.slice(indexOfFirstOrder, indexOfLastOrder)

  useEffect(() => {
    dispatch(getOrderWithUserID())
  }, [])

  useEffect(() => {
    if (filterOption === 'all') {
      setFilteredOptionData(orders)
    } else if (filterOption === 'pending') {
      setFilteredOptionData(
        orders.filter((order) => order.status === 'pending')
      )
    } else if (filterOption === 'processed') {
      setFilteredOptionData(
        orders.filter((order) => order.status === 'processed')
      )
    } else if (filterOption === 'completed') {
      setFilteredOptionData(
        orders.filter((order) => order.status === 'completed')
      )
    } else if (filterOption === 'rejected') {
      setFilteredOptionData(
        orders.filter((order) => order.status === 'rejected')
      )
    }
  }, [filterOption, orders])

  useEffect(() => {
    if (searchQuery !== '') {
      let data = filteredOptionData.map((order) => ({
        ...order,
        products: order.products.filter((orderProduct: OrderProduct) => {
          if (typeof orderProduct.product === 'string') {
            return orderProduct.product
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          } else {
            return orderProduct.product.title
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          }
        }),
      }))

      data = data.filter((order) => order.products.length > 0)
      setOrderData(data)
    } else {
      setOrderData(filteredOptionData)
    }
  }, [searchQuery, filteredOptionData])

  return (
    <div className="orders-list">
      <WrappingCard marginBtm="20px" padding="12px">
        <div className="d-flex justify-content-between orders-header">
          <p className="text-lg">Porosite</p>
          <div className="d-flex align-items-center">
            <FormSelect
              className="addresses-select"
              aria-label="Default select example"
              onChange={(e) => setFilterOption(e.target.value)}
              value={filterOption}
            >
              <option
                value={'all'}
                className="selectCustom-option sort-options bg-white text-sm font-medium flex justify-center text-gray-600 light-dropdown-hover"
              >
                All
              </option>
              <option
                className="selectCustom-option sort-options bg-white text-sm font-medium flex justify-center text-gray-600 light-dropdown-hover"
                value={'pending'}
              >
                Pending
              </option>
              <option
                className="selectCustom-option sort-options bg-white text-sm font-medium flex justify-center text-gray-600 light-dropdown-hover"
                value={'processed'}
              >
                Processed
              </option>
              <option
                className="selectCustom-option sort-options bg-white text-sm font-medium flex justify-center text-gray-600 light-dropdown-hover"
                value={'completed'}
              >
                Completed
              </option>
              <option
                className="selectCustom-option sort-options bg-white text-sm font-medium flex justify-center text-gray-600 light-dropdown-hover"
                value={'rejected'}
              >
                Rejected
              </option>
            </FormSelect>
            <InputGroup>
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <InputGroup.Text
                id="inputGroup-sizing-small"
                // onClick={() => searchHandler()}
              >
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
            </InputGroup>
          </div>
        </div>
      </WrappingCard>
      {currentOrders.length ? (
        currentOrders.map((order) => (
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
      {currentOrders.length ? (
        <WrappingCard padding="12px">
          <div className="w-100 d-flex justify-content-end">
            <PaginationComponent
              totalItems={orderData.length}
              itemsPerPage={5}
              onPageChange={handlePageChange}
            />
          </div>
        </WrappingCard>
      ) : null}
    </div>
  )
}

export default Orders
