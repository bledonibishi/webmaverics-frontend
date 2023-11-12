import { CartItem, Product, addToCartType } from '@/helpers/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URL

export const cartsAPI = createApi({
  reducerPath: 'cartsAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    getCartProducts: builder.query<CartItem, void>({
      query: () => `/api/v1/cart`,
      // providesTags: ['CartProducts' ],
    }),
    addToCartQuery: builder.mutation<void, addToCartType>({
      query: (items) => ({
        url: 'api/v1/cart/addToCart',
        method: 'POST',
        body: {
          items: [
            {
              product: `${items.productId}`,
              quantity: items.quantity,
              price: items.price,
            },
          ],
        },
      }),
    }),
    decreaseCartQuantity: builder.mutation({
      query: (id) => ({
        url: `/api/v1/cart/${id}`,
        method: 'PATCH',
      }),
    }),
    deleteCartProduct: builder.mutation({
      query: (id) => ({
        url: `/api/v1/cart/${id}`,
        method: 'DELETE',
      }),
    }),
    clearCart: builder.mutation({
      query: () => ({
        url: `/api/v1/cart/clear/cart`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useGetCartProductsQuery,
  useDeleteCartProductMutation,
  useAddToCartQueryMutation,
  useClearCartMutation,
  useDecreaseCartQuantityMutation,
} = cartsAPI
