import { Product } from '@/helpers/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type CreateProductResponse = {
  product: Product
}

export const productsAPI = createApi({
  reducerPath: 'productsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => '/products',
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
    }),
    createProduct: builder.mutation<Product, Product>({
      query: (product) => ({
        url: '/products',
        method: 'POST',
        body: product,
      }),
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
} = productsAPI
