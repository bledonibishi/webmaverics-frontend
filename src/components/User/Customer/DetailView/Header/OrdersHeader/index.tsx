import React from 'react'
import { Form, FormSelect, InputGroup } from 'react-bootstrap'
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const OrdersHeader = () => {
  return (
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
  )
}

export default OrdersHeader
