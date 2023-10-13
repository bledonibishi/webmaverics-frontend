import React, { useState } from 'react'
import {
  Field,
  reduxForm,
  InjectedFormProps,
  WrappedFieldProps,
  getFormValues,
} from 'redux-form'
import { TextField, TextFieldProps } from '@mui/material'
import './style.css'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import Gjirafa50 from '@/assets/images/gjirafa50.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faMeteor, faTShirt } from '@fortawesome/free-solid-svg-icons'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { login } from '@/store/auth/authSlice'
import LoginIdentifier from '@/auth/components/LoginForm/LoginIdentifier'
import LoginWithAnotherAccount from '@/auth/components/LoginForm/LoginWithAnotherAccount'
import LoginVerify from '@/auth/components/LoginForm/LoginVerify'

type ExternalLinksProps = {
  label: string
  icon: JSX.Element | null
}

const ExternalLinks = React.memo(({ label, icon }: ExternalLinksProps) => {
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
})

const renderTextField: React.FC<WrappedFieldProps & TextFieldProps> = ({
  input,
  label,
  meta: { touched, error },
  value,
  ...custom
}) => {
  return (
    <TextField
      label={label}
      error={touched && error}
      helperText={touched && error ? error : ''}
      margin="normal"
      variant="outlined"
      fullWidth
      {...input}
      value={value as string}
      {...custom}
    />
  )
}

type ComponentProps = InjectedFormProps<{}, {}>

const showResults = () => {
  console.log('submitted')
}

interface ErrorResponse {
  message: string
}

const LoginPageCompoonent: React.FC<ComponentProps> = (props) => {
  const { type } = useParams()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(location.search)
  const buttonParam = queryParams.get('useAnotherAccount')
  const emailParam = queryParams.get('email')
  const validatedUser = useAppSelector((state) => state.auth)
  console.log('validatedUser', validatedUser)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState<string>(emailParam ?? '')
  const [password, setPassword] = useState<string>('')
  const [passwordError, setPasswordError] = useState<null | string>(null)

  const isAnotherAccount = buttonParam === 'True'

  const handleSubmit = async (values: any) => {
    setLoading(true)

    let userData = {
      email: email,
      password: values.password,
    }

    try {
      const action = await dispatch(login(userData))

      if (login.fulfilled.match(action)) {
        navigate('/')
      } else if (login.rejected.match(action)) {
        const errorResponse = action.payload as ErrorResponse
        console.error('Login failed:', errorResponse)

        setPasswordError(errorResponse.message)
      }
    } catch (error) {
      console.error('Dispatch error:', error)
    } finally {
      setLoading(false)
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
                label={'Sign in with Google'}
                icon={<FontAwesomeIcon icon={faTShirt} />}
              />
              <ExternalLinks
                label={'Sign in with Facebook'}
                icon={<FontAwesomeIcon icon={faMeteor} />}
              />
              <ExternalLinks label={'Sign in with Gjirafa'} icon={null} />
            </ul>
          </div>
          <p className="or-line">
            <span>Or</span>
          </p>
          <form
            className="formexample"
            onSubmit={props.handleSubmit(handleSubmit)}
          >
            {type === 'identifier' && !isAnotherAccount ? (
              <LoginIdentifier />
            ) : type === 'identifier' && isAnotherAccount ? (
              <LoginWithAnotherAccount email={email} setEmail={setEmail} />
            ) : (
              <LoginVerify
                email={email}
                renderTextField={renderTextField}
                loading={loading}
                password={password}
                passwordError={passwordError}
              />
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

const LoginPage = reduxForm<{}>({
  form: 'LoginPage',
  onSubmit: showResults,
})(LoginPageCompoonent)

export default LoginPage
