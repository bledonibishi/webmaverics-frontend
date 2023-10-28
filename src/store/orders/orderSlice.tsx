import { Order, OrderInput } from '@/helpers/types'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import OrderService from './orderService'

type InitialStateTypes = {
  orders: Order[]
  isLoading: boolean
  isSuccess: boolean
  error: string | null
}

const initialState: InitialStateTypes = {
  orders: [],
  isLoading: false,
  isSuccess: false,
  error: null,
}

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  try {
    const response = await OrderService.fetchOrders()
    return response.data
  } catch (error) {
    throw error
  }
})

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (newOrder: OrderInput) => {
    try {
      console.log('newOrder', newOrder)
      const response = await OrderService.createOrder(newOrder)
      console.log('response', response)
      return response
    } catch (error) {
      throw error
    }
  }
)

export const getOrderWithUserID = createAsyncThunk(
  'orders/getOrderWithUserID',
  async () => {
    try {
      return await OrderService.fetchOrderWithUserID()
    } catch (error) {
      throw error
    }
  }
)

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.orders = action.payload
        state.error = null
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.error = action.error.message ?? null
      })
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.orders.push(action.payload)
        state.error = null
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.error = action.error.message ?? null
      })
      .addCase(getOrderWithUserID.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getOrderWithUserID.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.orders = action.payload
        state.error = null
      })
      .addCase(getOrderWithUserID.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.error = action.error.message ?? null
      })
  },
})

export default orderSlice.reducer
