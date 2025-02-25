import axios from 'axios'
import { signOut } from 'next-auth/react'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

if (!apiUrl) {
  throw new Error('API URL is not defined in environment variables.')
}

const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
    Pragma: 'no-cache',
    Expires: '0'
  }
})

apiClient.interceptors.request.use(
  config => {
    const accessToken = sessionStorage.getItem('accessToken')

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

const handleUserLogout = async () => {
  try {
    // Sign out from the app
    await signOut({ callbackUrl: process.env.NEXT_PUBLIC_APP_URL })
    sessionStorage.removeItem('accessToken')
  } catch (error) {
    console.error(error)

    // Show above error in a toast like following
    // toastService.error((err as Error).message)
  }
}

apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data?.message || error.message || error)

    if (error.response?.status === 401 || error.response?.status === 403) {
      console.warn('Unauthorized! Token might have expired.')

      handleUserLogout()
    }

    return Promise.reject(error)
  }
)

export default apiClient
