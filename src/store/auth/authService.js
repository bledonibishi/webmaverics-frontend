import axiosInstance from '../../api/axiosInstance'

const API_URL = 'api/v1/users/'

const signup = async (userData) => {
  const response = await axiosInstance.post(`${API_URL}/signup`, userData)

  console.log('response.data', response.data)

  if (response.data) {
    localStorage.setItem('access_token', response.data.token)
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

const login = async (userData) => {
  const response = await axiosInstance.post(API_URL + '/login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

const userLogin = async () => {
  const response = await axiosInstance.get(`${API_URL}/self`)

  if (response.data) {
    console.log('response', response.data)
  }

  return response.data
}

const refreshToken = async () => {
  const response = await axiosInstance.get(API_URL + '/refreshToken', {
    withCredentials: true,
  })

  return response.data
}

const fetchCountries = async () => {
  const response = await axiosInstance.get('api/v1/country')

  console.log('response.data', response.data)

  return response.data
}

const authService = {
  signup,
  userLogin,
  login,
  fetchCountries,
  refreshToken,
}

export default authService
