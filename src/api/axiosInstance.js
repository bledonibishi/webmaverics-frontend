import axios from 'axios'
const BASE_URL = process.env.REACT_APP_SERVER_BASE_URL

const axiosInstance = axios.create({
  baseURL: BASE_URL,
})

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const token = localStorage.getItem('token')

    // if (!token) return Promise.reject(error)

    // window.location.replace('/login')

    // const originalConfig = error.config;
    if (error?.response?.status === 401 || !token) {
      localStorage.clear()
      window.location.replace('/')
    }

    //   originalConfig._retry = true;

    //   try {
    //     //refresh token

    //     const res = await axiosInstance.get("/users/me/refresh");
    //     localStorage.setItem("token", res.data.auth_token);

    //     error.config.headers.common["x-auth-token"] = res.data.auth_token;
    //     return axiosInstance.request(originalConfig);
    //   } catch (_error) {

    //     localStorage.removeItem("token");
    //     return Promise.reject(_error);
    //   }
    // }

    return Promise.reject(error)
  }
)
axiosInstance.interceptors.request.use(
  (request) => {
    request.headers = request.headers ?? {}
    const token = localStorage.getItem('token')
    if (token) request.headers['x-access-token'] = token

    return request
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosInstance
