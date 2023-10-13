import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import cartService from './cartService'

const initialState = {
  isLoading: false,
  cart: [],
  isError: null,
  message: '',
}

export const getCartProducts = createAsyncThunk(
  'cart/getCartProducts',
  async () => {
    try {
      const res = await cartService.getCartProducts()
      return res
    } catch (error) {
      console.log('error', error)
    }
  }
)

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (cartItems) => {
    try {
      return await cartService.addToCart(cartItems)
    } catch (error) {
      console.log('error', error)
    }
  }
)

export const removeProduct = createAsyncThunk(
  'cart/removeProduct',
  async (id) => {
    try {
      const res = await cartService.removeProduct(id)
      return res
    } catch (error) {
      console.log('error', error)
      throw error
    }
  }
)
export const decreaseQuantity = createAsyncThunk(
  'cart/decreaseQuantity',
  async (id) => {
    try {
      const res = await cartService.decreaseQuantity(id)
      return res
    } catch (error) {
      console.log('error', error)
      throw error
    }
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.isLoading = false
      state.cart = []
      state.isError = null
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCartProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.cart = action.payload
        state.isError = false
        state.message = 'success'
      })
      .addCase(getCartProducts.rejected, (state, action) => {
        state.isLoading = false
        state.cart = []
        state.isError = true
        state.message = 'Something went wrong '
      })
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false
        if (Array.isArray(action.payload)) {
          state.cart = [...state.cart, ...action.payload]
        } else {
          state.cart?.push(action.payload)
        }
        state.isError = false
        state.message = 'success'
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false
        state.cart = []
        state.isError = true
        state.message = 'Something went wrong '
      })
      .addCase(removeProduct.pending, (state) => {
        state.isLoading = true
        state.isError = false
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.cart = state.cart.filter(
          (item) => item._id !== action.payload._id
        )
        state.isError = false
        state.message = 'success'
      })
      .addCase(removeProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(decreaseQuantity.pending, (state) => {
        state.isLoading = true
        state.isError = false
      })
      .addCase(decreaseQuantity.fulfilled, (state, action) => {
        const productId = action.payload._id
        const productIndex = state.cart.findIndex(
          (item) => item._id === productId
        )

        if (productIndex !== -1) {
          const updatedQuantity = state.cart[productIndex].quantity - 1

          if (updatedQuantity === 0) {
            // Remove the product from the cart if the quantity becomes zero
            state.cart.splice(productIndex, 1)
          } else {
            // Update the quantity of the product
            state.cart[productIndex].quantity = updatedQuantity
          }

          state.isError = false
          state.message = 'success'
        }
      })
      .addCase(decreaseQuantity.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { clearCart } = cartSlice.actions
export default cartSlice.reducer
