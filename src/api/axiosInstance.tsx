import useRefreshToken from '@/hooks/useRefreshToken'
import axios from 'axios'

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URL

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  // headers: { 'Content-Type': 'application/json' },
  // withCredentials: true,
})

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      // config.headers['Authorization'] = `Bearer ${token}`
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config
    if (error?.response?.status === 403 && !prevRequest?.sent) {
      prevRequest.sent = true
      const refresh = useRefreshToken()
      const newAccessToken = await refresh()
      prevRequest.headers.Authorization = `Bearer ${newAccessToken}`
      return axiosPrivate(prevRequest)
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
