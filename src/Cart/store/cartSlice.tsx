import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CartItem, CartItemProduct } from '@/helpers/types'
import cartService from './cartService'

type initialStateTypes = {
  isLoading: boolean
  cart: CartItemProduct[]
  cartItem: CartItemProduct | null
  error: null | string | boolean
  message: string
}

const initialState: initialStateTypes = {
  isLoading: false,
  cart: [],
  cartItem: null,
  error: null,
  message: '',
}

type GetCartProductsErrorPayload = {
  error: string
}

export const getCartProducts = createAsyncThunk<
  CartItemProduct[],
  void,
  {
    rejectValue: GetCartProductsErrorPayload
  }
>('cart/getCartProducts', async (_, { rejectWithValue }) => {
  try {
    const res = await cartService.getCartProducts()
    return res
  } catch (error) {
    console.error('Error fetching wishlist products:', error)
    return rejectWithValue({
      error: 'An error occurred while fetching cart products.',
    })
  }
})

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (cartItems: CartItemProduct, thunkAPI) => {
    try {
      return await cartService.addToCart(cartItems)
    } catch (error) {
      return thunkAPI.rejectWithValue('Error fetching products')
    }
  }
)

// export const removeProduct = createAsyncThunk(
//   'cart/removeProduct',
//   async (id: string | number, thunkAPI) => {
//     try {
//       const res = await cartService.removeProduct(id)
//       return res
//     } catch (error) {
//       return thunkAPI.rejectWithValue('Error fetching products')
//     }
//   }
// )
// export const decreaseQuantity = createAsyncThunk(
//   'cart/decreaseQuantity',
//   async (id: string | number, thunkAPI) => {
//     try {
//       const res = await cartService.decreaseQuantity(id)
//       return res
//     } catch (error) {
//       return thunkAPI.rejectWithValue('Error fetching products')
//     }
//   }
// )

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.isLoading = false
      state.cart = []
      state.error = null
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
        state.message = 'success'
      })
      .addCase(getCartProducts.rejected, (state, action) => {
        state.isLoading = false
        state.cart = []
        state.error = true
        state.message = 'Something went wrong '
      })
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false
        // if (Array.isArray(action.payload)) {
        //   state.cart = [...state.cart, ...action.payload]
        // } else {
        //   state.cart?.push(action.payload)
        // }
        state.cartItem = action.payload
        state.error = false
        state.message = 'success'
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false
        state.cart = []
        state.error = true
        state.message = 'Something went wrong '
      })
    // .addCase(removeProduct.pending, (state) => {
    //   state.isLoading = true
    //   state.error = false
    // })
    // .addCase(removeProduct.fulfilled, (state, action) => {
    //   state.isLoading = false
    //   // state.cart = state.cart.filter(
    //   //   (item) => item._id !== action.payload._id
    //   // )
    //   state.error = false
    //   state.message = 'success'
    // })
    // .addCase(removeProduct.rejected, (state, action) => {
    //   state.isLoading = false
    //   state.error = true
    //   state.message = 'Rejected'
    // })
    // .addCase(decreaseQuantity.pending, (state) => {
    //   state.isLoading = true
    //   state.error = false
    // })
    // .addCase(decreaseQuantity.fulfilled, (state, action) => {
    //   const productId = action.payload._id
    //   const productIndex = state.cart.findIndex(
    //     (item) => item._id === productId
    //   )

    //   if (productIndex !== -1) {
    //     const updatedQuantity = state.cart[productIndex].quantity - 1

    //     if (updatedQuantity === 0) {
    //       // Remove the product from the cart if the quantity becomes zero
    //       state.cart.splice(productIndex, 1)
    //     } else {
    //       // Update the quantity of the product
    //       state.cart[productIndex].quantity = updatedQuantity
    //     }

    //     state.isError = false
    //     state.message = 'success'
    //   }
    // })
    // .addCase(decreaseQuantity.rejected, (state, action) => {
    //   state.isLoading = false
    //   state.error = true
    //   state.message = 'rejected'
    // })
  },
})

export const { clearCart } = cartSlice.actions
export default cartSlice.reducer
