import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import './style.css'
import WrappingCard from '@/ui/WrappingCard'
import UserInfoHeader from '@/components/User/Customer/DetailView/Header/UserInfoHeader'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { UserInfoTypes } from '@/helpers/types'
import { TextField } from '@mui/material'
import { format } from 'date-fns'
import {
  createTheme,
  ThemeProvider,
  Theme,
  useTheme,
} from '@mui/material/styles'
import { updateMe } from '@/store/auth/authSlice'
import { toast } from 'react-toastify'
import LoadingBar from '@/ui/Loading/LoadingBar'

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

const UserInfo = () => {
  const dispatch = useAppDispatch()
  const outerTheme = useTheme()
  const [loading, setLoading] = useState(false)
  const { user } = useAppSelector((state) => state.auth)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState<UserInfoTypes>({
    name: '',
    surname: '',
    birthdate: undefined,
    gender: undefined,
  })

  useEffect(() => {
    if (user && !formSubmitted) {
      console.log('Setting form data:', {
        name: user.user.name,
        surname: user.user.surname,
        birthdate: new Date(user.user.birthdate || ''),
        gender: user.user.gender,
      })

      setFormData({
        name: user.user.name,
        surname: user.user.surname,
        birthdate: new Date(user.user.birthdate || ''),
        gender: user.user.gender,
      })
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === 'gender' && value !== 'male' && value !== 'female') {
      return
    }

    if (name === 'birthdate') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: new Date(value),
      }))
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }))
    }
  }
  console.log('formData.birthdate', formData.birthdate)

  const submitForm = async (e: React.ChangeEvent<HTMLFormElement>) => {
    setLoading(true)
    e.preventDefault()

    try {
      await dispatch(updateMe(formData)).then((res) => {
        console.log('res', res)
        toast.success('Your data has been changed successfully')
        const storageUser = JSON.parse(localStorage.getItem('user') || '{}')
        const userObject = {
          refreshToken: localStorage.getItem('user.refreshToken'),
          status: 'success',
          token: localStorage.getItem('token'),
          user: {
            ...storageUser.user,
            name: res.payload.name,
            surname: res.payload.surname,
            birthdate: res.payload.birthdate,
            gender: res.payload.gender,
          },
        }
        localStorage.setItem('user', JSON.stringify(userObject))
        setLoading(false)
        window.location.reload()
      })
      setFormSubmitted(true)
      // console.log('submitted', formData)
    } catch (error) {
      setLoading(false)
      console.log('error', error)
    }
  }

  return (
    <div className="account-page">
      <WrappingCard padding="12px" marginBtm="20px">
        <UserInfoHeader />
      </WrappingCard>
      <WrappingCard marginBtm="20px" padding="12px">
        <form className="personal-info__details" onSubmit={submitForm}>
          <ThemeProvider theme={customTheme(outerTheme)}>
            <div className="personal-info_topdiv">
              <TextField
                id="standard-basic"
                label="FirstName *"
                variant="standard"
                type="text"
                className={`w-100 customer-info-input valid `}
                name="name"
                value={formData.name}
                onChange={handleChange}
              />

              <TextField
                id="standard-basic"
                label="LastName *"
                variant="standard"
                type="text"
                className="w-100 customer-info-input valid"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
              />

              <TextField
                id="standard-basic"
                label="Eamil *"
                variant="standard"
                type="email"
                className="w-100 customer-info-input valid"
                name="email"
                value={user?.user.email}
                disabled={true}
                onChange={handleChange}
              />

              <TextField
                id="standard-basic"
                label="Birthdate *"
                variant="standard"
                type="date"
                className="w-100 customer-info-input valid"
                placeholder="DD/MM/YYYY"
                name="birthdate"
                value={
                  formData.birthdate instanceof Date &&
                  !isNaN(formData.birthdate.getTime())
                    ? format(formData.birthdate, 'yyyy-MM-dd')
                    : 'DD/MM/YYYY'
                }
                onChange={handleChange}
              />
            </div>
            <div className="personal-info_topdiv">
              <div key={`inline-radio`} className="mb-3">
                <Form.Check
                  inline
                  name="male"
                  type={'radio'}
                  label="Male"
                  id={`inline-radio-${formData.gender}`}
                  onChange={handleChange}
                  value="male"
                  checked={formData.gender === 'male'}
                />
                <Form.Check
                  inline
                  name="female"
                  type={'radio'}
                  label="Female"
                  id={`inline-radio-${formData.gender}`}
                  onChange={handleChange}
                  value={'female'}
                  checked={formData.gender === 'female'}
                />
              </div>
            </div>
          </ThemeProvider>
          <button className="btn btn-primary btn-primary-hover" type="submit">
            {loading ? <LoadingBar height="20px" size={20} /> : 'SAVE'}
          </button>
        </form>
      </WrappingCard>
    </div>
  )
}

export default UserInfo
