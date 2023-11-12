import { CreateAddress, NewAddressCheckout } from '@/helpers/types'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { fetchCountries } from '@/store/auth/authSlice'
import { TextField } from '@mui/material'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Col, FormSelect, Row } from 'react-bootstrap'

type AddressFormsTypes = {
  formData: CreateAddress
  setFormData: React.Dispatch<React.SetStateAction<CreateAddress>>
  setSelectedType: React.Dispatch<React.SetStateAction<string>>
  selectedType: string
  countries: any[] | null
  handleChange: (e: any) => void
}

const AddressForms: React.FC<AddressFormsTypes> = ({
  formData,
  setFormData,
  setSelectedType,
  selectedType,
  countries,
  handleChange,
}) => {
  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedType(event.target.value)
  }

  return (
    <div
      className={`section new-billing-address`}
      id="billing-new-address-form"
    >
      <div className="enter-address">
        <div className="edit-address  flex-col gap-4 tablet:grid tablet:grid-cols-2 mb-4">
          <div className="w-100  flex-col col-span-2 tablet:grid tablet:grid-cols-2">
            <span className="text-sm font-normal pb-1 text-xs text-gray-700 col-span-2">
              Ju jeni duke blerë si:
            </span>
            <div className="w-100 col-span-1">
              <div className="d-flex align-items-center  border rounded-3xl w-75">
                <label
                  htmlFor="person"
                  className={`d-flex align-items-center py-2 justify-content-center flex-grow customer-type rounded-3xl cursor-pointer ${
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
                  <label
                    className="cursor-pointer text-sm"
                    htmlFor="individual"
                  >
                    Individ
                  </label>
                </label>
                <label
                  htmlFor="bussines"
                  className={`d-flex align-items-center py-2 justify-content-center flex-grow customer-type rounded-3xl cursor-pointer ${
                    selectedType === 'Bussines'
                      ? 'border border-primary text-primary'
                      : ''
                  }`}
                >
                  <input
                    type="radio"
                    id="bussines"
                    value="Bussines"
                    checked={selectedType === 'Bussines'}
                    name="CustomerType"
                    className="cursor-pointer hidden"
                    data-gtm-form-interact-field-id="2"
                    onChange={handleRadioChange}
                  />
                  <label className="cursor-pointer text-sm" htmlFor="business">
                    Biznes
                  </label>
                </label>
              </div>
            </div>
          </div>
          <div className="personal-info__input">
            <TextField
              id="standard-basic"
              label="FirstName *"
              variant="standard"
              type="text"
              className={`w-100 customer-info-input valid `}
              name="name"
              value={formData.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e)
              }
            />
          </div>
          <div className="personal-info__input">
            <TextField
              id="standard-basic"
              label="LastName *"
              variant="standard"
              type="text"
              className="w-100 customer-info-input valid"
              name="surname"
              value={formData.surname}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e)
              }
            />
          </div>
          <div
            className={`personal-info__input ${
              selectedType === 'Bussines' ? 'd-flex' : 'hidden'
            } flex-col `}
          >
            <TextField
              id="standard-basic"
              label="Company *"
              variant="standard"
              type="text"
              className="w-100 customer-info-input valid"
              name="company"
              value={formData.company}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e)
              }
            />
          </div>
          <div
            className={`personal-info__input ${
              selectedType === 'Bussines' ? 'd-flex' : 'hidden'
            } flex-col`}
          >
            <TextField
              id="standard-basic"
              label="Fiscal number *"
              variant="standard"
              type="text"
              className="w-100 customer-info-input valid"
              name="fiscalNumber"
              value={formData.fiscalNumber}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e)
              }
            />
          </div>
          <div className="personal-info__input">
            <label>Country *</label>
            <FormSelect
              className="country-select"
              name="country"
              value={formData.country}
              onClick={(e: any) => handleChange(e)}
            >
              {countries?.map((country: any, index: any) => (
                <option
                  key={index}
                  value={country._id}
                  className="selectCustom-option sort-options bg-white text-sm font-medium flex justify-center text-gray-600 light-dropdown-hover"
                >
                  {country.name}
                </option>
              ))}
            </FormSelect>
          </div>
          <div className="personal-info__input">
            <label>City *</label>
            <FormSelect
              name="city"
              value={formData.city}
              onChange={(e) => handleChange(e)}
              className="cities-select"
              // aria-label="Default select example"
            >
              {countries?.map((country) =>
                country.cities.map((city: any, index: any) => (
                  <option
                    key={city._id}
                    value={city._id}
                    // data-id={city._id}
                    className="selectCustom-option sort-options bg-white text-sm font-medium d-flex justify-content-center text-gray-600 light-dropdown-hover"
                  >
                    {city.name}
                  </option>
                ))
              )}
            </FormSelect>
          </div>
          <div className="inputs col-span-2 d-flex flex-col">
            <div className="personal-info__input">
              <TextField
                id="standard-basic"
                label="Address *"
                variant="standard"
                type="text"
                className="w-100 customer-info-input valid"
                name="address"
                value={formData.address}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(e)
                }
              />
            </div>
          </div>

          <div className="personal-info__input">
            <TextField
              id="standard-basic"
              label="Email *"
              variant="standard"
              type="text"
              className="w-100 customer-info-input valid"
              name="email"
              value={formData.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e)
              }
            />
          </div>
          <div className="personal-info__input">
            <TextField
              id="standard-basic"
              label="Telephone *"
              variant="standard"
              type="text"
              className="w-100 customer-info-input valid"
              name="telephone"
              value={formData.telephone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e)
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddressForms
