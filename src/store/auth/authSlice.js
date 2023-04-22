import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosInstance, axiosPrivate } from '../../api/axiosInstance'

const initialState = {
  user: null,
  isLoggedIn: false,
  isLoading: false,
  token: '',
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.isLoggedIn = false
      state.isLoading = false
      state.error = null
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
        ;(state.isLoading = true), (state.error = null)
      })
      .addCase(login.fulfilled, (state, action) => {
        ;(state.user = action.payload),
          (state.isLoggedIn = true),
          (state.isLoading = false),
          (state.error = null)
      })
      .addCase(login.rejected, (state, action) => {
        state.user = null
        state.isLoggedIn = false
        state.isLoading = false
        state.error = action.error.message
      })
      .addCase(signup.pending, (state) => {
        ;(state.isLoading = true), (state.error = null)
      })
      .addCase(signup.fulfilled, (state, action) => {
        ;(state.user = action.payload),
          (state.isLoading = false),
          (state.isLoggedIn = true),
          (state.error = null)
      })
      .addCase(signup.rejected, (state, action) => {
        ;(state.user = null), (state.isLoggedIn = false)
        ;(state.isLoading = false), (state.error = action.error.message)
      })
  },
})

export const refreshToken = () => async (dispatch) => {
  const response = await axios.get('/api/v1/user/refreshToken', {
    withCredentials: true,
  })

  console.log('response', response)

  dispatch(setAccessToken(response.data.accessToken))

  return response.data.accessToken
}

export const { logout } = authSlice.actions
export default authSlice.reducer
