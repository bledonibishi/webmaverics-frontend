import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import productService from './productService'

const initialState = {
  loading: false,
  products: [],
  error: '',
}

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    try {
      return await productService.fetchProducts()
    } catch (err) {
      console.log('err', err)
    }
  }
)

export const getProductWithId = createAsyncThunk(
  'products/getProductWithId',
  async (id) => {
    try {
      return await productService.fetchProductWithId(id)
    } catch (err) {
      console.log('err', err)
    }
  }
)

const productSlice = createSlice({
  name: 'products',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
        state.error = ''
      })
      .addCase(fetchProducts.rejected, (action, state) => {
        state.loading = false
        state.products = []
        state.error = action.error.message
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.loading = true
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state, action) => {
          state.loading = false
          if (action.type === getProductWithId.fulfilled.type) {
            state.products = [action.payload]
          } else {
            state.products = action.payload
          }
          state.error = ''
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false
          state.products = []
          state.error = action.error.message
        }
      )
  },
})

export default productSlice.reducer
