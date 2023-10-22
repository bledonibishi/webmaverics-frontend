import { Address } from '@/helpers/types'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { createAddress, updateAddress } from '@/store/addresses/addressesSlice'
import { fetchCountries } from '@/store/auth/authSlice'
import React, { useState, useEffect } from 'react'
import { Col, Form, FormSelect, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

type Props = {
  selectedType: string
  isEditing: boolean
  addressToEdit?: Address | null
}

const PersonForm = ({ selectedType, isEditing, addressToEdit }: Props) => {
  console.log('selectedType', selectedType)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { countries, user } = useAppSelector((state) => state.auth)

  const [formData, setFormData] = useState(() => {
    if (isEditing && addressToEdit) {
      return {
        name: addressToEdit.name,
        surname: addressToEdit.surname,
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
      name: '',
      surname: '',
      type: '',
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
      <Row>
        <Col md="6">
          <div className="personal-info__input">
            <label>Emri *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => handleChange(e)}
            />
            <p className="text-danger pb-2 text-xs">
              Hapësira 'Emri' nuk duhet të jetë e zbrazët!
            </p>
          </div>
        </Col>
        <Col md="6">
          <div className="personal-info__input">
            <label>Lastname *</label>
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={(e) => handleChange(e)}
            />
            <p className="text-danger pb-2 text-xs hidden">
              Hapësira 'Lastname' nuk duhet të jetë e zbrazët!
            </p>
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
          <label>Address *</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={(e) => handleChange(e)}
          />
          <p className="text-danger pb-2 text-xs hidden">
            Hapësira 'Lastname' nuk duhet të jetë e zbrazët!
          </p>
        </div>
      </Col>
      <Row>
        <Col md="6">
          <div className="personal-info__input">
            <label>E-mail *</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={(e) => handleChange(e)}
            />
            <p className="text-danger pb-2 text-xs hidden">
              Hapësira 'Emri' nuk duhet të jetë e zbrazët!
            </p>
          </div>
        </Col>
        <Col md="6">
          <div className="personal-info__input">
            <label>Telephone number *</label>
            <input
              type="text"
              name="telephone"
              onChange={(e) => handleChange(e)}
              value={formData.telephone}
            />
            <p className="text-danger pb-2 text-xs hidden">
              Hapësira 'Lastname' nuk duhet të jetë e zbrazët!
            </p>
          </div>
        </Col>
      </Row>
      <div className="add-address-footer">
        <button className="btn btn-primary" type="submit">
          Ruaj
        </button>
      </div>
    </Form>
  )
}

export default PersonForm
