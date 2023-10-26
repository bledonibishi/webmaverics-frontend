import React, { ChangeEvent, useState } from 'react'
import Logo from '@/assets/images/gjirafa50.png'
import { Field } from 'redux-form'
import { TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { validateUserByEmail } from '@/store/auth/authSlice'
import LoadingBar from '@/ui/Loading/LoadingBar'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [emailError, setEmailError] = useState<string | null>(null)
  const { isLoading } = useAppSelector((state) => state.auth)

  const validateEmail = (value: string) => {
    if (!value) {
      setEmailError('Email is required')
    } else {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

      if (!emailRegex.test(value)) {
        setEmailError('Invalid email address')
      } else {
        setEmailError('')
      }
    }
  }
  const handleEmailChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = e.target.value
    setEmail(newValue)
    // validateEmail(newValue)
  }

  const continueValidation = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    validateEmail(email)

    if (emailError === '' || emailError === null) {
      try {
        await dispatch(validateUserByEmail(email))
      } catch (error) {
        setEmailError('Validation failed')
      } finally {
        setLoading(false)
      }
    }
  }

  console.log('loading', loading)

  return (
    <div className="auth-main-container">
      <div className="auth-wrapper">
        <div className="auth-page auth-inner">
          <div className="sign-register active">
            <div className="main-title">
              <a>
                <img src={Logo} className="logo-main" />
              </a>
              <h5 className="subtitle">Forgot your password?</h5>
              <div className="mt-3">
                <p className="plain-text mb-0">
                  Enter the email address you used when you joined and we’ll
                  send you instructions to reset your password.
                </p>
              </div>
            </div>
            <form id="formexample" onSubmit={continueValidation}>
              <input
                type="hidden"
                // value="/connect/authorize/callback?client_id=80b05d04-adf1-409f-afca-337769ebbdd6&amp;redirect_uri=https%3A%2F%2Fgjirafa50.com%2F&amp;response_type=code&amp;scope=openid%20gjirafa50_api%20profile%20email&amp;code_challenge=cDNsw3lpwpIkLznIShJ9dEqy7r0Qh6_k61d9Wudy5_I&amp;code_challenge_method=S256&amp;response_mode=form_post&amp;nonce=638334795330148298.ZjBkZDkxODYtMDljZS00ZjFmLWJlNzMtYTg4NGZmMzFmZDRiYmJjY2ViNDAtNTQxZS00YWNhLTgzOWYtNGNjNzRjN2Y4MjVk&amp;state=CfDJ8BavmJPrX4dBnzAs_5ATawxv9FGZyuLEIJyUc7N1iYUhWtGYb8q_oGKmQZvTh5xNRf2Shm5J2YWNvmG4lTrVd7xMRvVIPopLK-uAHXGZ4-n94CtlYMLPOP-v5q6XrZVA3x5Q-PJNOEaxQ2bBi2yMA_onx1SpiwrbOPPdon_3rhg0qpi139rdaB5DdwSAmCuZ25q2xdBeQilaz_hifSBOuVW4WEZ--3bww5eOOoDn0-LiNFm7YohEt9hRp3j-TYYpqFjTbx_fi4Bg4VZdIh1ug-2_ZO8Cqdbgrt3Xzi2urDAJr4ri4Z3Scmtw20WQSo6-cNTD0UCHt7kE7ywNdue_eiVRasmJmh3vfkitgRv2LuXHFSgBoh9fNMvQQ74Nj-BynKdFGCaQ5k6vviIFV5x6aHA&amp;x-client-SKU=ID_NETSTANDARD2_0&amp;x-client-ver=6.15.1.0"
                id="ReturnUrl"
                name="ReturnUrl"
              />
              <div className="resetPasswordBy" id="resetPasswordByEmail">
                <div className="form-item last-item mb-2">
                  <div className="form-item">
                    <TextField
                      onChange={(
                        e: React.ChangeEvent<
                          HTMLInputElement | HTMLTextAreaElement
                        >
                      ) => handleEmailChange(e)}
                      label={'Email'}
                      helperText={emailError}
                      variant="outlined"
                      required
                      fullWidth
                      value={email}
                      error={!!emailError}
                    />
                  </div>
                  <span
                    className="error-message mt-1 field-validation-valid"
                    data-valmsg-for="Email"
                    data-valmsg-replace="true"
                  ></span>
                </div>
                <div className="form-button form-item">
                  <button type="submit" className="btn btn-primary has-spinner">
                    {/* <img src="/images/oval.svg" className="spinner-icon" /> */}
                    {isLoading ? (
                      <LoadingBar height="30px" size={'30px'} />
                    ) : (
                      <span className="btn-text">Send reset instructions</span>
                    )}
                  </button>
                </div>
                <div className="text-center">
                  <a className="link" href="">
                    Return to Sign In
                  </a>
                </div>
              </div>
              <input
                name="__RequestVerificationToken"
                type="hidden"
                value="CfDJ8OjMYhxYkU5Oqb7lsqnWOaeR4-WhAdPG_oxCU1H4sTUTdaoRjm1HJ3CQpWbAV-R7gi9l7-yl3HLK6ywd1uFCzIUu2n7Sg9g5z2df9eI3cDo7XWFiZ_XMtgb8EiE0LFYefiWF3PG45_Ulo3nrZtqDGo8"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
