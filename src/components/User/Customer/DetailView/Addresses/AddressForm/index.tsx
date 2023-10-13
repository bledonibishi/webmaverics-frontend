import React, { ChangeEvent, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import '../style.css'
import PersonForm from './PersonForm'
import BusinessForm from './BusinessForm'

const AddressForm = () => {
  const [selectedType, setSelectedType] = useState('Person')

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedType(event.target.value)
  }
  return (
    <section className="add-address-container">
      <div className="add-address-header pb-3">
        <p className="text-sm pb-2">You are buying like:</p>
        <div className="w-100 col-1">
          <div className="d-flex align-items-center border rounded-3xl w-50">
            <label
              htmlFor="person"
              className={`d-flex w-50 align-items-center justify-content-center customer-type rounded-3xl py-2 cursor-pointer ${
                selectedType === 'Person'
                  ? 'border border-primary text-primary'
                  : ''
              }`}
            >
              <input
                type="radio"
                id="person"
                value="Person"
                checked={selectedType === 'Person'}
                name="CustomerType"
                className="cursor-pointer hidden"
                data-gtm-form-interact-field-id="1"
                onChange={handleRadioChange}
              />
              <label className="cursor-pointer text-sm" htmlFor="person">
                Person
              </label>
            </label>
            <label
              htmlFor="business"
              className={`d-flex w-50 align-items-center justify-content-center customer-type rounded-3xl py-2 cursor-pointer ${
                selectedType === 'Business'
                  ? 'border border-primary text-primary'
                  : ''
              }`}
            >
              <input
                type="radio"
                id="business"
                value="Business"
                checked={selectedType === 'Bussines'}
                name="CustomerType"
                className="cursor-pointer hidden"
                data-gtm-form-interact-field-id="0"
                onChange={handleRadioChange}
              />
              <label className="cursor-pointer text-sm" htmlFor="business">
                Business
              </label>
            </label>
          </div>
        </div>
      </div>
      <div className="add-address-content ">
        {selectedType === 'Person' ? <PersonForm /> : <BusinessForm />}
      </div>
    </section>
  )
}

export default AddressForm
