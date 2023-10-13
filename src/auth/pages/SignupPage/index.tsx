import React, { useState, useEffect } from 'react'
import {
  Field,
  reduxForm,
  InjectedFormProps,
  WrappedFieldProps,
} from 'redux-form'
import FormGroup from '@mui/material/FormGroup'
import { TextField, FormControl, Button, TextFieldProps } from '@mui/material'
import '../LoginPage/style.css'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import Gjirafa50 from '@/assets/images/gjirafa50.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMeteor,
  faTShirt,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons'
import LoadingBar from '@/ui/Loading/LoadingBar'

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

const renderTextField: React.FC<WrappedFieldProps & TextFieldProps> = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    label={label}
    error={touched && error}
    helperText={error}
    margin="normal"
    variant="outlined"
    fullWidth
    {...input}
    {...custom}
    // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
    //   input.onChange(e.target.value)
    // }}
  />
)

type ComponentProps = InjectedFormProps<{}, {}>

const showResults = () => {
  console.log('submitted')
}

const RegisterPageCompoonent: React.FC<ComponentProps> = (props) => {
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [firstNameError, setFirstNameError] = useState(false)
  const [lastNameError, setLastNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [termsAndConditions, setTermsAndConditions] = useState(false)

  const handleSubmit = (event: any) => {
    event.preventDefault()

    setEmailError(false)
    setPasswordError(false)

    if (firstName == '') {
      setFirstNameError(true)
    }
    if (lastName == '') {
      setLastNameError(true)
    }
    if (email == '') {
      setEmailError(true)
    }
    if (password == '') {
      setPasswordError(true)
    }

    if (email && password) {
      console.log(email, password)
    }
  }

  const termsConditionsAccepted = () => {
    setTermsAndConditions((state) => !state)
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
          <form className="registerform">
            <div className="">
              {/* <Field
                component={renderTextField}
                label="First Name"
                className="mt-0"
                required
                name="firstName"
                error={firstNameError} */}
              <TextField
                label="First Name"
                className="mt-0"
                required
                name="firstName"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                error={firstNameError}
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </div>
            <div>
              <Field
                component={renderTextField}
                label="Last Name"
                className="form-control"
                required
                name="lastName"
                error={lastNameError}
              />
            </div>
            <div className="">
              <Field
                name="email"
                component={renderTextField}
                label="Email"
                required
                type="email"
                error={emailError}
              />
            </div>
            <div className="form-item">
              <Field
                name="password"
                component={renderTextField}
                label="Password"
                required
                type="password"
                error={passwordError}
              />
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
                onClick={() => setLoading(true)}
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

const RegisterPage = reduxForm<{}>({
  form: 'RegisterPage',
  onSubmit: showResults,
})(RegisterPageCompoonent)

export default RegisterPage
