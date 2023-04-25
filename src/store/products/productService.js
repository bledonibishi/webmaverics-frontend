import axiosInstance from '../../api/axiosInstance'

const API_URL = '/api/v1/products'

const fetchProducts = async () => {
  const response = await axiosInstance.get(API_URL)

  return response.data.data
}
const fetchProductWithId = async (id) => {
  const response = await axiosInstance.get(API_URL + `/${id}`)

  return response.data
}

const productService = {
  fetchProducts,
  fetchProductWithId,
}

export default productService
