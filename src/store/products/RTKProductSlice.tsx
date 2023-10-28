import {
  Product,
  ProductCategory,
  ProductInput,
  Rating,
  RatingInput,
} from '@/helpers/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productsAPI = createApi({
  reducerPath: 'productsAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => '/products',
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
    }),
    createProduct: builder.mutation<Product, ProductInput>({
      query: (product: ProductInput) => ({
        url: '/products/createProduct',
        method: 'POST',
        body: product,
      }),
    }),
    getRatingsWithUserId: builder.query<Rating[], string>({
      query: (id) => `/ratings/user/${id}`,
    }),
    createRating: builder.mutation<Rating, RatingInput>({
      query: (ratingInput) => ({
        url: `/ratings/${ratingInput.productID}`,
        method: 'POST',
        body: ratingInput,
      }),
    }),
    getRatingWithProductId: builder.query<Rating[], string>({
      query: (id) => `/ratings/${id}`,
    }),
    getProductCategories: builder.query<ProductCategory[], void>({
      query: () => `/products/categories`,
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useCreateRatingMutation,
  useGetRatingWithProductIdQuery,
  useGetRatingsWithUserIdQuery,
  useGetProductCategoriesQuery,
} = productsAPI
