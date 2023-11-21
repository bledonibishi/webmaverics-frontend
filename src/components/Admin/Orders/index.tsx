import PaginationComponent from '@/helpers/Pagination'
import { Image, formatDateToDDMMYYYY } from '@/helpers/helpers'
import { Order, OrderProduct } from '@/helpers/types'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { getAllOrders, updateOrderStatus } from '@/store/orders/orderSlice'
import LoadingBar from '@/ui/Loading/LoadingBar'
import WrapperWIthSpacing from '@/ui/WrapperWIthSpacing'
import WrappingCard from '@/ui/WrappingCard'
import { faReorder, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Dropdown, Form, FormSelect, InputGroup } from 'react-bootstrap'

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
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()

  const updateStatusHandler = async (e: any, id: string, action: string) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await dispatch(
        updateOrderStatus({ orderID: id, action: action })
      )

      if (updateOrderStatus.fulfilled.match(response)) {
        dispatch(getAllOrders())
      }

      setLoading(false)
    } catch (error) {
      console.log('Error during API call:', error)
      setLoading(false)
    }
  }

  return (
    <>
      <div className="d-flex align-items-center justify-content-between border-primary-gray">
        <div className="d-flex order-info-div">
          <p>#{sericalNumber}</p>

          <p>{formatDateToDDMMYYYY(completionDate)}</p>
          <p className={`${status} fw-bold`}>
            {!loading ? status : <LoadingBar height="10px" size={10} />}
          </p>
          {price && <p>{price.toFixed(2)} €</p>}
        </div>

        <Dropdown>
          <Dropdown.Toggle
            className="custom-button fw-bold"
            variant={status}
            id="dropdown-basic"
          >
            {!loading ? status : <LoadingBar height="20px" size={20} />}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              className={`rejected fw-bold`}
              onClick={(e) => updateStatusHandler(e, id, 'deny')}
            >
              Deny
            </Dropdown.Item>
            <Dropdown.Item
              className={`approved fw-bold`}
              onClick={(e) => updateStatusHandler(e, id, 'complete')}
            >
              Complete
            </Dropdown.Item>
            <Dropdown.Item
              className={`pending fw-bold`}
              onClick={(e) => updateStatusHandler(e, id, 'processed')}
            >
              Processed
            </Dropdown.Item>
            <Dropdown.Item
              className={`pending fw-bold`}
              onClick={(e) => updateStatusHandler(e, id, 'setPending')}
            >
              Pending
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
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
    dispatch(getAllOrders())
  }, [])

  useEffect(() => {
    if (filterOption === 'all') {
      setFilteredOptionData(orders)
    } else if (filterOption === 'pending') {
      setFilteredOptionData(
        orders.filter((order: Order) => order.status === 'pending')
      )
    } else if (filterOption === 'processed') {
      setFilteredOptionData(
        orders.filter((order: Order) => order.status === 'processed')
      )
    } else if (filterOption === 'completed') {
      setFilteredOptionData(
        orders.filter((order: Order) => order.status === 'completed')
      )
    } else if (filterOption === 'rejected') {
      setFilteredOptionData(
        orders.filter((order: Order) => order.status === 'rejected')
      )
    }
  }, [filterOption, orders])

  useEffect(() => {
    if (searchQuery !== '') {
      let data = filteredOptionData.map((order: Order) => ({
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

      data = data.filter((order: Order) => order.products.length > 0)
      setOrderData(data)
    } else {
      setOrderData(filteredOptionData)
    }
  }, [searchQuery, filteredOptionData])

  return (
    <WrapperWIthSpacing>
      <div className="page-title-top mb-3 md:mb-6 page-title pointer-events-none w-100 text-start md:text-left text-primary text-lg font-medium">
        Blerje e sigurtë
      </div>
      <div className="position-relative">
        <div className="">
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
                    <InputGroup.Text id="inputGroup-sizing-small">
                      <FontAwesomeIcon icon={faSearch} />
                    </InputGroup.Text>
                  </InputGroup>
                </div>
              </div>
            </WrappingCard>
            {currentOrders.length ? (
              currentOrders.map((order: Order) => (
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
        </div>
      </div>
    </WrapperWIthSpacing>
  )
}

export default Orders
