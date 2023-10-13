import { useDispatch } from 'react-redux'
// import { refreshToken } from '../store/auth/authSlice'

const refreshToken = () => {
  return { test: 'test', asd: 'asd', type: 'string' }
}

const useRefreshToken = () => {
  const dispatch = useDispatch()

  const refresh = async () => {
    try {
      const accessToken = await dispatch(refreshToken())
      return accessToken
    } catch (error) {
      console.error('Failed to refresh access token:', error)
      throw error
    }
  }

  return refresh
}

export default useRefreshToken
