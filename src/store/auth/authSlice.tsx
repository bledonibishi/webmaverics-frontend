import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authService from './authService'
import {
  AuthPromise,
  ChangePasswordInput,
  LoginUserData,
  SignupUserData,
  User,
} from '@/helpers/types'

interface AuthState {
  user: User | null
  authPromise: AuthPromise | null
  isAuthenticated: boolean
  countries: any[] | null // Replace 'any' with the actual type of your countries data
  isLoading: boolean
  isSuccess: boolean
  error: string | null
  message?: string
  accessToken: string | null
  refreshToken: string | null
  validatedUserByEmail: boolean
}

const userString = localStorage.getItem('user')
const user: User = userString ? JSON.parse(userString) : null

const initialState: AuthState = {
  user: user ? user : null,
  authPromise: null,
  isAuthenticated: false,
  countries: null,
  isLoading: false,
  isSuccess: false,
  error: null,
  message: '',
  accessToken: null,
  refreshToken: null,
  validatedUserByEmail: false,
}

export const signup = createAsyncThunk(
  'auth/signup',
  async (user: User, thunkAPI) => {
    try {
      return await authService.signup(user)
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const login = createAsyncThunk(
  'auth/login',
  async (user: LoginUserData, { rejectWithValue }) => {
    try {
      const response = await authService.login(user)
      console.log('response', response)
      return response
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return rejectWithValue(error.response.data)
    }
  }
)

export const logout = createAsyncThunk('auth/logout', () => {
  authService.logout()
})

export const userLogin = createAsyncThunk('auth/userLogin', async () => {
  try {
    return await authService.userLogin()
  } catch (err) {
    console.log('err', err)
  }
})

export const refreshToken = createAsyncThunk('auth/refreshToken', async () => {
  try {
    return await authService.refreshToken()
  } catch (error) {
    console.log('error', error)
  }
})

export const fetchCountries = createAsyncThunk(
  'auth/fetchCountries',
  async () => {
    try {
      const response = await authService.fetchCountries()
      return response
    } catch (err) {
      console.log('err', err)
    }
  }
)

export const validateUserByEmail = createAsyncThunk(
  'auth/validateUserByEmail',
  async (email: string, thunkAPI) => {
    try {
      const response = await authService.validateUserByEmail(email)
      return response
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const updateMyPassword = createAsyncThunk<
  AuthPromise,
  ChangePasswordInput
>('auth/updateMyPassword', async (body, thunkAPI) => {
  try {
    const response = await authService.changePassword(body)
    return response
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.error = null
      state.message = ''
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload
        state.isAuthenticated = true
        state.isLoading = false
        state.isSuccess = true
        state.error = null
        state.message = ''
      })
      .addCase(login.rejected, (state, action) => {
        state.user = null
        state.isAuthenticated = false
        state.isSuccess = false
        state.isLoading = false
        state.error = 'Error when trying to login'
        state.message = action.error.message
      })
      .addCase(signup.pending, (state) => {
        state.isLoading = true
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload
        state.isAuthenticated = true
        state.isLoading = false
        state.isSuccess = true
        state.error = null
        state.message = ''
      })
      .addCase(signup.rejected, (state, action) => {
        state.user = null
        state.isSuccess = false
        state.isAuthenticated = false
        state.isLoading = false
        state.error = 'error while trying to signup'
        state.message = action.error.message
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null
        state.isAuthenticated = false
        state.isLoading = false
      })
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.message = ''
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.user = action.payload
        state.isSuccess = true
        state.isLoading = false
        state.error = null
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.user = null
        state.isSuccess = false
        state.isLoading = false
        state.error = 'Error in userLogin'
        state.message = action.error.message
      })
      .addCase(fetchCountries.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.countries = action.payload
        state.isSuccess = true
        state.isLoading = false
        state.error = null
        state.message = action.payload
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.countries = null
        state.isSuccess = false
        state.isLoading = false
        state.error = 'Error while trying to fetch countries'
        state.message = action.error.message
      })
      .addCase(validateUserByEmail.pending, (state) => {
        state.isLoading = true
      })
      .addCase(validateUserByEmail.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = true
        state.error = null
        state.message = payload.message
        state.validatedUserByEmail = true
      })
      .addCase(validateUserByEmail.rejected, (state, action) => {
        state.countries = null
        state.isSuccess = false
        state.isLoading = false
        state.error = 'Cannot find user with this email'
        state.message = action.error.message
        state.validatedUserByEmail = false
      })
      .addCase(updateMyPassword.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateMyPassword.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = true
        state.authPromise = payload
        state.error = null
        state.validatedUserByEmail = true
      })
      .addCase(updateMyPassword.rejected, (state, action) => {
        state.countries = null
        state.isSuccess = false
        state.isLoading = false
        state.authPromise = null
        state.error = 'Error while trying to update password'
        state.message = action.error.message
        state.validatedUserByEmail = false
      })
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer
