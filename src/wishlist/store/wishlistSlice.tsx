import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Product } from '@/helpers/types'
import WishlistService from './wishlistService'

type WishlistState = {
  isLoading: boolean
  error: string | null
  message: string | null
  products: Product[]
}

type GetCartProductsSuccessPayload = Product[]

type GetCartProductsErrorPayload = {
  error: string
}

const initialState: WishlistState = {
  isLoading: false,
  error: null,
  message: '',
  products: [],
}

export const getWishlistProducts = createAsyncThunk<
  GetCartProductsSuccessPayload,
  void,
  {
    rejectValue: GetCartProductsErrorPayload
  }
>('wishlist/getProducts', async (_, { rejectWithValue }) => {
  try {
    const res = await WishlistService.getProducts()
    return res as GetCartProductsSuccessPayload
  } catch (error) {
    console.error('Error fetching wishlist products:', error)
    return rejectWithValue({
      error: 'An error occurred while fetching cart products.',
    })
  }
})

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWishlistProducts.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getWishlistProducts.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.products = payload
      state.error = null
      state.message = 'success'
    })
    builder.addCase(getWishlistProducts.rejected, (state, { payload }) => {
      state.isLoading = false
      state.products = []
      state.error = null
      state.message = 'error'
    })
  },
})

export default wishlistSlice.reducer
