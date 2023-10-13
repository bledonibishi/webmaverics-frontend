import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Product } from '@/helpers/types'
import ProductService from './ProductService'

type ProductState = {
  loading: boolean
  products: Product[]
  product: Product | null
  success: boolean
  error: boolean | null
  message: string | null
}

const initialState: ProductState = {
  product: null,
  products: [],
  loading: false,
  success: false,
  error: false,
  message: '',
}

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, thunkAPI) => {
    try {
      return await ProductService.fetchProducts()
    } catch (error) {
      // console.log('error', error.response.data)
      return thunkAPI.rejectWithValue('Error fetching products')
    }
  }
)

export const getProductWithId = createAsyncThunk(
  'products/getProductWithId',
  async (id: string, thunkAPI) => {
    try {
      return await ProductService.fetchProductWithId(id)
    } catch (err) {
      console.log('err', err)
      return thunkAPI.rejectWithValue('Error fetching product by ID')
    }
  }
)

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
        state.success = true
        state.error = false
        state.message = 'Success'
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = true
        state.message = 'Something went wrong. Please try againg later!'
      })
      .addCase(getProductWithId.pending, (state) => {
        state.loading = true
      })
      .addCase(getProductWithId.fulfilled, (state, { payload }) => {
        state.loading = false
        state.product = payload
        state.success = true
        state.error = false
        state.message = 'Success'
      })
      .addCase(getProductWithId.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = true
        state.message = 'Something went wrong. Please try againg later!'
      })
  },
})

export default productSlice.reducer
