import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authService from './authService'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  countries: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
}

export const signup = createAsyncThunk(
  'auth/signup',
  async (user, thunkAPI) => {
    try {
      return await authService.signup(user)
    } catch (error) {
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

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const userLogin = createAsyncThunk('auth/userLogin', async () => {
  try {
    return await authService.userLogin()
  } catch (err) {
    console.log('err', err)
  }
})

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (dispatch) => {
    try {
      return await authService.refreshToken()
    } catch (error) {
      console.log('error', error)
    }
  }
)

export const fetchCountries = createAsyncThunk(
  'auth/fetchCountries',
  async () => {
    try {
      return await authService.fetchCountries()
    } catch (err) {
      console.log('err', err)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
    logout: (state) => {
      state.user = null
      state.isLoggedIn = false
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
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
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.message = null
      })
      .addCase(login.rejected, (state, action) => {
        state.user = null
        state.isSuccess = false
        state.isLoading = false
        state.isError = true
        state.message = action.error.message
      })
      .addCase(signup.pending, (state) => {
        state.isLoading = true
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.message = null
      })
      .addCase(signup.rejected, (state, action) => {
        state.user = null
        state.isSuccess = false
        state.isLoading = false
        state.isError = true
        state.message = action.error.message
      })
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true
        state.isError = null
        state.message = ''
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.user = action.payload
        state.isSuccess = true
        state.isLoading = false
        state.isError = false
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.user = null
        state.isSuccess = false
        state.isLoading = false
        state.isError = true
        state.message = action.error.message
      })
      .addCase(fetchCountries.pending, (state) => {
        state.isLoading = true
        state.message = null
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.countries = action.payload
        state.isSuccess = true
        state.isLoading = false
        state.isError = false
        state.message = null
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.countries = null
        state.isSuccess = false
        state.isLoading = false
        state.isError = true
        state.message = action.error.message
      })
  },
})

export const { logout, reset } = authSlice.actions
export default authSlice.reducer
