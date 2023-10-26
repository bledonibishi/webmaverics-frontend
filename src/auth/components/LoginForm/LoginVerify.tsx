import React, { FC, useState } from 'react'
import { Field, WrappedFieldProps } from 'redux-form'
// import ArrowBottom from '@/assets/images/arrow-bottom.svg'
import { TextFieldProps } from '@mui/material'
import LoadingBar from '@/ui/Loading/LoadingBar'

type props = {
  email: string
  password: string
  renderTextField: FC<WrappedFieldProps & TextFieldProps>
  passwordError: string | null
  loading: boolean
}

const LoginVerify: FC<props> = ({
  email,
  password,
  renderTextField,
  passwordError,
  loading,
}) => {
  //   const [loading, setLoading] = useState<boolean>(false)

  return (
    <>
      <a
        href="/login/identifier"
        className="logged-user-email"
        aria-valuetext="LoginEmail"
      >
        <span>
          <div className="initials">{email.charAt(0).toUpperCase()}</div>
          {email && email}
        </span>
        {/* <img src={ArrowBottom} alt="arrow-bottom" className="arrow" /> */}
      </a>
      <fieldset>
        <div className="form-item">
          <Field
            component={renderTextField}
            name="password"
            label="Password"
            type="password"
            value={password}
            style={{ height: '52px' }}
            validate={(value: string) => {
              if (!value) {
                return 'Password is required'
              }
              return undefined
            }}
            sx={{ mb: 1 }}
            helperText={passwordError}
            error={!!passwordError}
          />
        </div>
        <div className="login-remember">
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                id="RememberLogin"
                data-val="true"
                data-val-required="The RememberLogin field is required."
                name="RememberLogin"
                value="true"
              />
              <label htmlFor="remember-me">Keep me logged in</label>
            </div>
            <a
              className="link text-primary"
              defaultValue={'forgot'}
              href="/forgotPassword"
            >
              Forgot password?
            </a>
          </div>
        </div>
        <div className="form-item form-button">
          <button
            className="btn btn-primary has-spinner"
            name="button"
            // value={'login'}
            type="submit"
          >
            {loading ? (
              <LoadingBar height="30px" size={'30px'} />
            ) : (
              <span className="btn-text">Sign in</span>
            )}
          </button>
        </div>
      </fieldset>
    </>
  )
}

export default LoginVerify
