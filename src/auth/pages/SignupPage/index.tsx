import React, { useState, useEffect } from 'react'
import {
  Field,
  reduxForm,
  InjectedFormProps,
  WrappedFieldProps,
} from 'redux-form'
import FormGroup from '@mui/material/FormGroup'
import {
  TextField,
  FormControl,
  Button,
  TextFieldProps,
  Box,
  InputAdornment,
  IconButton,
} from '@mui/material'
import '../LoginPage/style.css'
import '../ResetPassword/style.css'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import Gjirafa50 from '@/assets/images/gjirafa50.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEye,
  faEyeSlash,
  faMeteor,
  faTShirt,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons'
import LoadingBar from '@/ui/Loading/LoadingBar'
import { useAppDispatch } from '@/hooks/hooks'
import { signup } from '@/store/auth/authSlice'
import { toast } from 'react-toastify'
import { SignupPayload } from '@/helpers/types'
import {
  containsNumber,
  containsSpecialCharacter,
  containsUppercaseLetter,
  isPasswordLengthValid,
} from '@/helpers/helpers'

type ExternalLinksProps = {
  label: string
  icon: JSX.Element | null
}

const ExternalLinks = ({ label, icon }: ExternalLinksProps) => {
  return (
    <li className="list-inline-item">
      <div className="main-tooltip">
        <span className="tooltip-text">{label}</span>
        <a href="">
          {icon}

          <span className="link-label">{label}</span>
        </a>
      </div>
    </li>
  )
}

const RegisterPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)
  const [termsAndConditions, setTermsAndConditions] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const termsConditionsAccepted = () => {
    setTermsAndConditions((state) => !state)
  }

  const submitHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      dispatch(signup(formData)).then((action) => {
        const payload = action.payload as SignupPayload
        if (
          typeof payload === 'object' &&
          payload?.hasOwnProperty('status') &&
          payload.status === 'success'
        ) {
          toast.success('Registered successfully!')
          navigate('/')
        } else {
          console.error('Registration failed:', action.payload)
        }
      })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="auth-main-container">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <div className="inner-header  text-center">
            <div className="main-title">
              <img src={Gjirafa50} className="logo-main" alt="logo" />
              <h5 className="subtitle">Sign in to your account</h5>
            </div>
            <ul className="external-links block">
              <ExternalLinks
                label={'Register with Google'}
                icon={<FontAwesomeIcon icon={faTShirt} />}
              />
              <ExternalLinks
                label={'Register with Facebook'}
                icon={<FontAwesomeIcon icon={faMeteor} />}
              />
              <ExternalLinks label={'Register with Gjirafa'} icon={null} />
            </ul>
          </div>
          <p className="or-line">
            <span>Or</span>
          </p>
          <form className="registerform" onSubmit={submitHandler}>
            <div className="">
              <TextField
                label="First Name"
                className="mt-0"
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                // error={firstNameError}
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </div>
            <div>
              <TextField
                label="Last Name"
                className="mt-0"
                required
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                // error={firstNameError}
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="">
              <TextField
                type="email"
                label="Email"
                className="mt-0"
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
                // error={firstNameError}
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="">
              <TextField
                type={showPassword ? 'text' : 'password'}
                label="Password"
                className="mt-0"
                required
                name="password"
                value={formData.password}
                onChange={handleChange}
                // error={firstNameError}
                margin="normal"
                variant="outlined"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={toggleShowPassword} edge="end">
                        {showPassword ? (
                          <FontAwesomeIcon
                            className="text-sm"
                            icon={faEyeSlash}
                          />
                        ) : (
                          <FontAwesomeIcon className="text-sm" icon={faEye} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="form-item">
              <TextField
                type={showPassword ? 'text' : 'password'}
                label="Confirm password"
                className="mt-0"
                required
                name="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={handleChange}
                // error={firstNameError}
                margin="normal"
                variant="outlined"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={toggleShowPassword} edge="end">
                        {showPassword ? (
                          <FontAwesomeIcon
                            className="text-sm"
                            icon={faEyeSlash}
                          />
                        ) : (
                          <FontAwesomeIcon className="text-sm" icon={faEye} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div
              className={`pw-meter-container mb-5 pw-check-container ${
                formData.password.length ? 'active' : ''
              }`}
            >
              <h6 className="title">Create a password that contains:</h6>

              <p
                className={`pw_val_in pw-check-item ${
                  isPasswordLengthValid(formData.password) ? 'checked' : 'error'
                }`}
                id="pw_length"
              >
                Password must be at least 8 characters long.
              </p>
              <p
                className={`pw_val_in pw-check-item ${
                  containsSpecialCharacter(formData.password)
                    ? 'checked'
                    : 'error'
                }`}
                id="pw_character"
              >
                {' '}
                Password must contain at least one special character.
              </p>
              <p
                className={`pw_val_in pw-check-item ${
                  containsNumber(formData.password) ? 'checked' : 'error'
                }`}
                id="pw_number"
              >
                {' '}
                Password must contain at least one number.{' '}
              </p>
              <p
                className={`pw_val_in pw-check-item ${
                  containsUppercaseLetter(formData.password)
                    ? 'checked'
                    : 'error'
                }`}
                id="pw_uppercase"
              >
                Password must contain at least one uppercase letter.{' '}
              </p>
            </div>
            <div className="login-remember">
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div className="checkbox-wrapper">
                  <input
                    type="checkbox"
                    required
                    id="terms-conditions"
                    onChange={termsConditionsAccepted}
                    data-val="true"
                    data-val-required="The TermsConditionsAccepted field is required."
                    name="TermsConditionsAccepted"
                    value="true"
                  />
                  <label htmlFor="remember-me">
                    By registering an account, you agree to our{' '}
                    <a
                      href="https://gjirafa.com/Top/Terms#Term"
                      target="_blank"
                      className="link small text-primary"
                    >
                      Terms &amp; Conditions
                    </a>{' '}
                    and{' '}
                    <a
                      href="https://gjirafa.com/Top/Terms#Privacy"
                      target="_blank"
                      className="link small text-primary"
                    >
                      Privacy Policy
                    </a>
                  </label>
                </div>

                <span
                  className={`error-message mt-1 field-validation-error ${
                    termsAndConditions && 'hidden'
                  } `}
                  id="terms-validation-error"
                >
                  You need to agre to our Terms and Conditions before
                  registering.
                </span>
              </div>
            </div>
            <div className="form-item form-button">
              <button
                type="submit"
                className="btn btn-primary has-spinner"
                id="btn-register"
              >
                {loading ? (
                  <LoadingBar height="20px" size={'20px'} />
                ) : (
                  <span className="btn-text">Register</span>
                )}
              </button>
            </div>
            <div className="plain-text form-item last-item">
              <span>Already have an account?</span>
              <a className="link" href="/login/indetifier">
                Sign In
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
