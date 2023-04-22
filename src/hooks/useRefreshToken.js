import { useDispatch } from 'react-redux'
import { refreshToken } from '../store/auth/authSlice'

const useRefreshToken = () => {
  const dispatch = useDispatch()

  const refresh = async () => {
    const accessToken = await dispatch(refreshToken())
    return accessToken
  }

  return refresh
}

export default useRefreshToken
