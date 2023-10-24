import axiosInstance from '@/api/axiosInstance'
import { Order } from '@/helpers/types'

const API_URL = '/api/v1/orders'

const fetchOrders = async () => {
  try {
    const response = await axiosInstance.get(API_URL)

    return response.data
  } catch (error: any) {
    throw new Error(error)
  }
}

const createOrder = async (body: Order) => {
  try {
    const response = await axiosInstance.post(API_URL)

    return response.data
  } catch (error: any) {
    throw new Error(error)
  }
}

const OrderService = {
  createOrder,
  fetchOrders,
}

export default OrderService
