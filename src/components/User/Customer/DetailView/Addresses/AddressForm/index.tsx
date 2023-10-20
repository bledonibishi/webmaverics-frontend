import React, { ChangeEvent, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import '../style.css'
import PersonForm from './PersonForm'
import BusinessForm from './BusinessForm'
import WrappingCard from '@/ui/WrappingCard'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { getAddressWithId } from '@/store/addresses/addressesSlice'

const AddressForm = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const isEditing = !!id
  const { address } = useAppSelector((state) => state.address)
  const [selectedType, setSelectedType] = useState<string>(
    address?.type ?? 'Person'
  )

  useEffect(() => {
    if (id) {
      dispatch(getAddressWithId(id))
    }
  }, [id])

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedType(event.target.value)
  }
  return (
    <WrappingCard padding="12px">
      <section className="add-address-container ">
        <div className="add-address-header pb-3">
          <p className="text-sm pb-2">You are buying like:</p>
          <div className="w-75 p-0 m-0">
            <div
              className="d-flex align-items-center border rounded-3xl w-50 p-0 m-0"
              style={{ height: '40px' }}
            >
              <label
                htmlFor="person"
                className={`d-flex h-100 w-50 m-0 align-items-center justify-content-center customer-type rounded-3xl  cursor-pointer ${
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
                className={`d-flex h-100 w-50 m-0 align-items-center justify-content-center customer-type rounded-3xl  cursor-pointer ${
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
          {selectedType === 'Person' ? (
            <PersonForm
              selectedType={selectedType}
              isEditing={isEditing}
              addressToEdit={address}
            />
          ) : (
            <BusinessForm
              selectedType={selectedType}
              isEditing={isEditing}
              addressToEdit={address}
            />
          )}
        </div>
      </section>
    </WrappingCard>
  )
}

export default AddressForm
