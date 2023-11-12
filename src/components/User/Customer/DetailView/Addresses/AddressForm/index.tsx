import React, { ChangeEvent, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import '../style.css'
import PersonForm from './PersonForm'
import BusinessForm from './BusinessForm'
import WrappingCard from '@/ui/WrappingCard'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { getAddressWithId } from '@/store/addresses/addressesSlice'
import LoadingBar from '@/ui/Loading/LoadingBar'
import {
  createTheme,
  ThemeProvider,
  Theme,
  useTheme,
} from '@mui/material/styles'

const customTheme = (outerTheme: Theme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '--TextField-brandBorderColor': '#E0E3E7',
            '--TextField-brandBorderHoverColor': '#B2BAC2',
            '--TextField-brandBorderFocusedColor': '#e65228',
            '& label.Mui-focused': {
              color: '#e65228',
            },
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            '&:before, &:after': {
              borderBottom: '2px solid var(--TextField-brandBorderColor)',
            },
            '&:hover:not(.Mui-disabled, .Mui-error):before': {
              borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
            },
            '&.Mui-focused:after': {
              borderBottom: '2px solid #e65228',
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            '&:before': {
              borderBottom: '1px solid var(--TextField-brandBorderColor)',
            },
            '&:hover:not(.Mui-disabled, .Mui-error):before': {
              borderBottom: '1px solid #e65228',
            },
            '&.Mui-focused:after': {
              borderBottom: '1px solid #e65228',
            },
          },
        },
      },
    },
  })

const AddressForm = () => {
  const dispatch = useAppDispatch()
  const outerTheme = useTheme()
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  const isEditing = !!id
  const { address } = useAppSelector((state) => state.address)
  const [selectedType, setSelectedType] = useState<string>('Person')

  useEffect(() => {
    if (id) {
      dispatch(getAddressWithId(id))
    }
  }, [id])
  useEffect(() => {
    if (address) {
      setLoading(true)
      setSelectedType(address.type)
      setTimeout(() => {
        setLoading(false)
      }, 1500)
    }
  }, [address?.type])

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedType(event.target.value)
  }
  return (
    <WrappingCard padding="12px">
      {loading ? (
        <section
          className="d-flex align-items-center"
          style={{ minHeight: '300px' }}
        >
          <LoadingBar height="50px" size={50} />
        </section>
      ) : (
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
                customTheme={customTheme}
              />
            ) : (
              <BusinessForm
                selectedType={selectedType}
                isEditing={isEditing}
                addressToEdit={address}
                customTheme={customTheme}
              />
            )}
          </div>
        </section>
      )}
    </WrappingCard>
  )
}

export default AddressForm
