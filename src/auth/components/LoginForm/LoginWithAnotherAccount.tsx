import { useAppDispatch } from '@/hooks/hooks'
import { validateUserByEmail } from '@/store/auth/authSlice'
import LoadingBar from '@/ui/Loading/LoadingBar'
import { TextField } from '@mui/material'
import React, {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useState,
} from 'react'
import { useNavigate } from 'react-router-dom'

type props = {
  email: string
  setEmail: Dispatch<SetStateAction<string>>
}

const LoginWithAnotherAccount: FC<props> = ({ email, setEmail }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState<boolean>(false)
  const [emailError, setEmailError] = useState<string | null>(null)

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

  const continueValidation = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    validateEmail(email)

    if (emailError === '' || emailError === null) {
      try {
        const response: any = await dispatch(validateUserByEmail(email))

        if (response.payload.status === 'success') {
          navigate(`/login/verify?email=${email}`)
        } else {
          setEmailError('Validation failed')
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleEmailChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = e.target.value
    setEmail(newValue)
    validateEmail(newValue)
  }
  return (
    <fieldset>
      <div className="form-item last-item">
        <TextField
          onChange={(
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      <div className="form-item form-button last-item">
        <button
          className="btn btn-primary"
          name="button"
          value={'continue'}
          type="button"
          disabled={emailError !== ''}
          onClick={continueValidation}
        >
          {loading ? (
            <LoadingBar height="30px" size={'30px'} />
          ) : (
            <span className="btn-text">Continue</span>
          )}
        </button>
      </div>
      <div className="plain-text form-item register-link">
        <span>Don't have an account?</span>

        <a
          className="link text-primary"
          defaultValue="register"
          href="/register"
        >
          Register
        </a>
      </div>
    </fieldset>
  )
}

export default LoginWithAnotherAccount
