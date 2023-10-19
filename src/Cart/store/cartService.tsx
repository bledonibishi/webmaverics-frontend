import { CartItemProduct } from '@/helpers/types'
import axiosInstance from '../../api/axiosInstance'
import io from 'socket.io-client'
const socket = io('http://localhost:5000')

const API_URL = 'api/v1/cart'

const getCartProducts = async (): Promise<CartItemProduct[]> => {
  const response = await axiosInstance.get(API_URL)

  return response.data
}

const addToCart = async (
  cartItems: CartItemProduct
): Promise<CartItemProduct> => {
  console.log('cartItems', cartItems)

  return cartItems
  // const items = cartItems[0]

  // if (cartItems.length === 0) {
  //   console.log('cartItems is empty, request will not be sent.')

  // }
  // const response = await axiosInstance.post(API_URL + '/addToCart', {
  //   user: `${items.userId}`,
  //   items: [
  //     {
  //       product: `${items.productId}`,
  //       quantity: items.quantity,
  //       price: items.price,
  //     },
  //   ],
  // })

  // if (response.data) {
  // socket.emit('cartUpdated', {
  //   userId: items.userId,
  //   price: items.price,
  //   productId: items.productId,
  //   quantity: items.quantity,
  // })
  // return response.data
  // }
}

// const removeProduct = async (id: number | string) => {
//   const response = await axiosInstance.delete(API_URL + `/${id}`)
//   console.log('respons', response)

//   if (response.data) {
//     socket.emit('removeCartProduct', {
//       productId: id,
//     })
//     return response.data
//   }
// }
// const decreaseQuantity = async (id: number | string) => {
//   const response = await axiosInstance.patch(API_URL + `/${id}`)
//   console.log('respons', response)

//   if (response.data) {
//     socket.emit('decreaseQuantity', {
//       productId: id,
//     })
//     return response.data
//   }
// }

const cartService = {
  addToCart,
  getCartProducts,
  // removeProduct,
  // decreaseQuantity,
}

export default cartService
