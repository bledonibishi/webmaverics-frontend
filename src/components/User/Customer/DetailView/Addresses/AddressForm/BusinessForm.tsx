import { Address } from '@/helpers/types'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { createAddress, updateAddress } from '@/store/addresses/addressesSlice'
import { fetchCountries } from '@/store/auth/authSlice'
import React, { useEffect, useState } from 'react'
import { Col, Form, FormSelect, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import {
  createTheme,
  ThemeProvider,
  Theme,
  useTheme,
} from '@mui/material/styles'
import { TextField } from '@mui/material'

type Props = {
  selectedType: string
  isEditing: boolean
  addressToEdit?: Address | null
  customTheme: (outerTheme: Theme) => Theme
}

const BusinessForm = ({
  selectedType,
  isEditing,
  addressToEdit,
  customTheme,
}: Props) => {
  const navigate = useNavigate()
  const outerTheme = useTheme()
  const dispatch = useAppDispatch()
  const { countries, user } = useAppSelector((state) => state.auth)

  const [formData, setFormData] = useState(() => {
    if (isEditing && addressToEdit) {
      return {
        name: addressToEdit.name,
        surname: addressToEdit.surname,
        company: addressToEdit.company,
        fiscalNumber: addressToEdit.fiscalNumber,
        type: addressToEdit.type,
        country: addressToEdit.country,
        city: addressToEdit.city,
        address: addressToEdit.address,
        email: addressToEdit.email,
        telephone: addressToEdit.telephone,
      }
    } else {
      return {
        name: '',
        surname: '',
        type: selectedType,
        company: '',
        fiscalNumber: '',
        country: '',
        city: '',
        address: '',
        email: '',
        telephone: '',
      }
    }
  })

  useEffect(() => {
    dispatch(fetchCountries())
  }, [])

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (isEditing) {
      if (addressToEdit?.id) {
        await dispatch(updateAddress({ id: addressToEdit?.id, body: formData }))
      }
    } else {
      await dispatch(createAddress(formData))
    }

    setFormData({
      type: '',
      name: '',
      surname: '',
      company: '',
      fiscalNumber: '',
      country: '',
      city: '',
      address: '',
      email: '',
      telephone: '',
    })

    navigate('/customer/addresses')
  }
  return (
    <Form onSubmit={handleSubmit}>
      <ThemeProvider theme={customTheme(outerTheme)}>
        <Row>
          <Col md="6">
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
          </Col>
          <Col md="6">
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
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <div className="personal-info__input">
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
          </Col>
          <Col md="6">
            <div className="personal-info__input">
              <TextField
                id="standard-basic"
                label="Company *"
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
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <div className="personal-info__input">
              <label>Country *</label>
              <FormSelect
                className="country-select"
                name="country"
                value={formData.country}
                onClick={(e) => handleChange(e)}
              >
                {countries?.map((country: any, index: number) => (
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
          </Col>
          <Col md="6">
            <div className="personal-info__input">
              <label>City *</label>
              <FormSelect
                name="city"
                value={formData.city}
                onClick={(e) => handleChange(e)}
                className="cities-select"
                aria-label="Default select example"
              >
                {countries?.map((country) =>
                  country.cities.map((city: any, index: any) => (
                    <option
                      key={index}
                      value={city._id}
                      className="selectCustom-option sort-options bg-white text-sm font-medium flex justify-center text-gray-600 light-dropdown-hover"
                    >
                      {city.name}
                    </option>
                  ))
                )}
              </FormSelect>
            </div>
          </Col>
        </Row>
        <Col md="12">
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
        </Col>
        <Row>
          <Col md="6">
            <div className="personal-info__input">
              <TextField
                id="standard-basic"
                label="E-Mail *"
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
          </Col>
          <Col md="6">
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
          </Col>
        </Row>
      </ThemeProvider>
      <div className="add-address-footer">
        <button className="btn btn-primary btn-primary-hover" type="submit">
          Ruaj
        </button>
      </div>
    </Form>
  )
}

export default BusinessForm
