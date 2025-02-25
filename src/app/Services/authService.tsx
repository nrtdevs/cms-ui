import apiClient from '@/configs/axiosConfig'
import { toast } from 'react-toastify'

export const login = async (email: string, password: string) => {
  try {
    const response = await apiClient.post('/auth/login', { email, password })

    console.log('Login Success:', response.data)

    if (response.data?.data?.accessToken) {
      sessionStorage.setItem('accessToken', response.data.data.accessToken)
    }

    return response.data
  } catch (error: any) {
    toast.error(error.response?.data?.errors)

    throw new Error(error.response?.data?.message)
  }
}

export const getUserProfile = async () => {
  try {
    const response = await apiClient.get('/user/profile')

    return response.data
  } catch (error: any) {
    toast.error(error.response?.data?.errors)

    throw new Error(error.response?.data?.message)
  }
}

export default apiClient
