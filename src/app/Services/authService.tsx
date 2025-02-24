import axios from 'axios'

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

apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data?.message || error.message || error)

    if (error.response?.status === 401) {
      console.warn('Unauthorized! Token might have expired.')
      sessionStorage.removeItem('accessToken')
      window.location.href = '/login'
    }

    return Promise.reject(error)
  }
)

export const login = async (email: string, password: string) => {
  try {
    const response = await apiClient.post('/auth/login', { email, password })

    console.log('Login Success:', response.data)

    if (response.data?.data?.accessToken) {
      sessionStorage.setItem('accessToken', response.data.data.accessToken)
    }

    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message)
  }
}

export const getUserProfile = async () => {
  try {
    const response = await apiClient.get('/user/profile')

    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message)
  }
}

export default apiClient
