import axiosInstance from '@/api/axiosInstance'
import { Product } from '@/helpers/types'

const API_URL = '/api/v1/products'

// interface ProductResponse {
//   data: Product[]
// }

const fetchProducts = async (): Promise<Product[]> => {
  const response = await axiosInstance.get(API_URL)

  return response.data.data
}
const fetchProductWithId = async (id: string): Promise<Product> => {
  try {
    const response = await axiosInstance.get(API_URL + `/${id}`)
    console.log('response', response)
    return response.data
  } catch (error) {
    throw new Error('Error fetching product by ID')
  }
}

const ProductService = {
  fetchProducts,
  fetchProductWithId,
}

export default ProductService
