import React from 'react'
import WrappingCard from '../../../../../pages/Costumer/WrappingCard'
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faSearch } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { Form, FormSelect, InputGroup } from 'react-bootstrap'
const AsusImage = require('../../../../../assets/images/asus.png')

type OrderCardProps = {
  id: string
  sericalNumber: string
  completionDate: Date
  status: string
  price: Number
}

const OrderCard = ({
  id,
  sericalNumber,
  completionDate,
  status,
  price,
}: OrderCardProps) => {
  const navigate = useNavigate()

  const handleDetails = (id: string) => {
    navigate(`/customer/orderdetails/${id}`)
  }

  return (
    <>
      <div className="d-flex align-items-center justify-content-between border-primary-gray">
        <div className="d-flex order-info-div">
          <p>#{sericalNumber}</p>
          <p>{completionDate.toLocaleDateString()}</p>
          <p>{status}</p>
          <p>{price.toFixed(2)}</p>
        </div>
        <p
          className="d-flex align-items-center hover-primary cursor-pointer"
          onClick={() => handleDetails(id)}
        >
          Details <FontAwesomeIcon icon={faArrowRight} className="pl-1 w-75" />
        </p>
      </div>
      <div className="order-card-content w-100">
        <img src={AsusImage} />
      </div>
    </>
  )
}

const Orders = () => {
  const completionDate = new Date()
  const price = 21.0
  return (
    <div>
      <WrappingCard marginBtm="20px">
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
      <WrappingCard marginBtm={'20px'}>
        <OrderCard
          id="e1abb490-c5f4-45d9-b440-eea625d50709"
          sericalNumber="212527"
          completionDate={completionDate}
          status="Completed"
          price={price}
        />
      </WrappingCard>
      <WrappingCard marginBtm={'20px'}>
        <OrderCard
          id="e1abb490-c5f4-45d9-b440"
          sericalNumber="212527"
          completionDate={completionDate}
          status="Completed"
          price={price}
        />
      </WrappingCard>
      <WrappingCard>Pagination</WrappingCard>
    </div>
  )
}

export default Orders
