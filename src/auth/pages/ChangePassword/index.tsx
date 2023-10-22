import React, { useState } from 'react'
import Logo from '@/assets/images/gjirafa50.png'
import LoadingBar from '@/ui/Loading/LoadingBar'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import './style.css'
import { ChangePasswordInput } from '@/helpers/types'
import { useAppDispatch } from '@/hooks/hooks'
import { updateMyPassword } from '@/store/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const ChangePassword = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<{
    oldPassword: string
    newPassword: string
    confirmPassword: string
  }>({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [formData, setFormData] = useState<ChangePasswordInput>({
    passwordCurrent: '',
    password: '',
    passwordConfirm: '',
  })

  console.log('formData', formData)

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const validateOldPassword = (value: string): string => {
    if (!value) {
      return 'Old Password is required'
    }
    // You can add additional validation rules for the old password if needed.
    if (value !== 'newpassword') {
      return 'Your current password is invalid'
    }
    return ''
  }

  const validatePassword = (value: string): string => {
    if (!value) {
      return 'New Password is required'
    }
    return ''
  }

  const validateConfirmPassword = (
    newPassword: string,
    value: string
  ): string => {
    if (!value) {
      return 'Confirm New Password is required'
    } else if (newPassword !== value) {
      return 'Passwords do not match'
    }
    return ''
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    const oldPasswordError = validateOldPassword(formData.passwordCurrent)
    const newPasswordError = validatePassword(formData.password)
    const confirmPasswordError = validateConfirmPassword(
      formData.password,
      formData.passwordConfirm
    )

    if (oldPasswordError || newPasswordError || confirmPasswordError) {
      setErrors({
        oldPassword: oldPasswordError,
        newPassword: newPasswordError,
        confirmPassword: confirmPasswordError,
      })
    } else {
      try {
        setErrors({ oldPassword: '', newPassword: '', confirmPassword: '' })
        const response = await dispatch(updateMyPassword(formData))

        console.log('response', response)

        // if (response.payload === 200) {
        toast.success('Password updated successfuly')
        setTimeout(() => {
          navigate('/')
        }, 2000)
        // }
      } catch (error) {
        console.log('error', error)
      }
    }
    setLoading(false)
  }

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
            <form id="formexample" onSubmit={handleSubmit}>
              <div className="resetPasswordBy" id="resetPasswordByEmail">
                <div className="form-item last-item mb-2">
                  <div className="form-item">
                    <TextField
                      label="Old Password"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      type={showPassword ? 'text' : 'password'}
                      name="passwordCurrent"
                      value={formData.passwordCurrent}
                      onChange={(e) => handleChange(e)}
                      error={!!errors.oldPassword}
                      helperText={errors.oldPassword}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={toggleShowPassword} edge="end">
                              {showPassword ? (
                                <FontAwesomeIcon icon={faEyeSlash} />
                              ) : (
                                <FontAwesomeIcon icon={faEye} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                  <div className="form-item">
                    <TextField
                      label="New Password"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={(e) => handleChange(e)}
                      error={!!errors.newPassword}
                      helperText={errors.newPassword}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={toggleShowPassword} edge="end">
                              {showPassword ? (
                                <FontAwesomeIcon icon={faEyeSlash} />
                              ) : (
                                <FontAwesomeIcon icon={faEye} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                  <div className="form-item">
                    <TextField
                      label="Confirm New Password"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      type={showPassword ? 'text' : 'password'}
                      name="passwordConfirm"
                      value={formData.passwordConfirm}
                      onChange={(e) => handleChange(e)}
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={toggleShowPassword} edge="end">
                              {showPassword ? (
                                <FontAwesomeIcon icon={faEyeSlash} />
                              ) : (
                                <FontAwesomeIcon icon={faEye} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
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
                    {loading ? (
                      <LoadingBar height="30px" size={'30px'} />
                    ) : (
                      <span className="btn-text"> Submit</span>
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

export default ChangePassword
