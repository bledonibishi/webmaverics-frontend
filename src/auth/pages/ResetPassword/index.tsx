import axiosInstance from '@/api/axiosInstance'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { resetPassword } from '@/store/auth/authSlice'
import {
  containsNumber,
  containsSpecialCharacter,
  containsUppercaseLetter,
  isPasswordLengthValid,
} from '@/helpers/helpers'

const ResetPassword = () => {
  const dispatch = useAppDispatch()
  const { token } = useParams()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [passwordConfirmError, setPasswordConfirmError] = useState<
    string | null
  >(null)
  const [formData, setFormData] = useState({
    password: '',
    passwordConfirm: '',
  })

  console.log('formData', formData)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirmError('')
    setPasswordError('')
    const { name, value } = e.target

    setFormData({ ...formData, [name]: value })
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const submitReset = (e: any) => {
    e.preventDefault()
    try {
      if (token) {
        console.log('formData.password', formData.password === '')
        if (formData.password === '' && formData.passwordConfirm === '') {
          setPasswordError('Password should not be empty')
          setPasswordConfirmError('Confirm Password should not be emptyyyy')
        } else if (formData.password === null) {
          setPasswordError('Password should not be empty')
        } else if (
          formData.passwordConfirm === null ||
          formData.passwordConfirm === ''
        ) {
          setPasswordConfirmError('Confirm Password should not be empty')
        } else {
          dispatch(resetPassword({ body: formData, token })).then((res) => {
            console.log('res', res)

            if (res.payload.status === 'success') {
              toast.success('Password changed successfuly')
              setTimeout(() => {
                navigate('/login/identifier')
              }, 1000)
            } else {
              if (
                res.meta.arg.body.password !== res.meta.arg.body.passwordConfirm
              ) {
                setPasswordError('Passwords do not match')
                setPasswordConfirmError('Passwords do not match')
              } else {
                setPasswordError(res.payload)
                setPasswordConfirmError(res.payload)
              }
            }
          })
        }
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <div className="auth-main-container">
      <div className="auth-wrapper">
        <link href="/sign.css" rel="stylesheet"></link>
        <link href="/Identifier.css" rel="stylesheet"></link>
        <div className="alert-wrapper error fade-in "></div>
        <div className="auth-page auth-inner">
          <div className="sign-register active">
            <div className="main-title">
              <a>
                <img
                  src="https://tojnhu4mvp.gjirafa.net/profilepictures/Erk3fL5+XJTopw2dI5KVI9FK+pVHkxMPijlZx7hJrKg=/115386261.4195841.png"
                  className="logo-main"
                />
              </a>
              <h6 className="subtitle">Reset password</h6>
              <p className="plain-text mt-3">
                Your new password must be different from previous used password.
              </p>
            </div>
            <form
              id="resetPasswordForm"
              onSubmit={submitReset}
              className="form-horizontal"
            >
              <div className="form-item">
                <TextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(e)
                  }
                  helperText={passwordError}
                  error={!!passwordError}
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
                <div
                  className={`pw-meter-container pw-check-container ${
                    formData.password.length ? 'active' : ''
                  }`}
                >
                  <h6 className="title">Create a password that contains:</h6>

                  <p
                    className={`pw_val_in pw-check-item ${
                      isPasswordLengthValid(formData.password)
                        ? 'checked'
                        : 'error'
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
              </div>
              <div className="form-item">
                <TextField
                  label="Confirm password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type={showPassword ? 'text' : 'password'}
                  name="passwordConfirm"
                  value={formData.passwordConfirm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(e)
                  }
                  helperText={passwordConfirmError}
                  error={!!passwordConfirmError}
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

              <div className="form-item form-button last-item">
                <button type="submit" className="btn btn-primary">
                  Reset password
                </button>
              </div>

              <input
                name="__RequestVerificationToken"
                type="hidden"
                value="CfDJ8OjMYhxYkU5Oqb7lsqnWOacrq0IdrxMch89pNmWS8Nl-RSysVjjMZ9FU86D2HUNB1tjzR9FRraQX3RVT6H5WXU_nnl4iXSrQKT1rhlRBg6MCPgXp3FkaG4KSZKpfbEfXovYdzU-oYEfW-yTkIw5h2H0"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
