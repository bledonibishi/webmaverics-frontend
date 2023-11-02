import {
  Product,
  ProductCategory,
  ProductInput,
  Rating,
  RatingInput,
  ReturnRequest,
  ReturnRequestInput,
} from '@/helpers/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const returnRequestsAPI = createApi({
  reducerPath: 'returnRequestsAPI',
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
    getAll: builder.query<ReturnRequest[], void>({
      query: () => '/returnRequest',
    }),
    getAllWithUser: builder.query<ReturnRequest[], void>({
      query: () => '/returnRequest/user',
    }),
    createOne: builder.mutation<ReturnRequest, ReturnRequestInput>({
      query: (body: ReturnRequestInput) => ({
        url: '/returnRequest',
        method: 'POST',
        body: body,
      }),
    }),
  }),
})

export const { useGetAllQuery, useCreateOneMutation, useGetAllWithUserQuery } =
  returnRequestsAPI
