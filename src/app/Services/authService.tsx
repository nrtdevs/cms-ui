import axios from 'axios'

interface LoginResponse {
  data: {
    accessToken: string
    user: {
      id: number
      email: string
      firstName: string
      lastName: string
      mobileNo: number
      roleDetails: {
        id: number
        name: string
        permissions: {
          id: number
          slug: string
        }[]
      }
    }
  }
  errors: any | null
  message: string
  meta: any | null
  success: boolean
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  if (!apiUrl) {
    throw new Error('API URL is not defined in environment variables.')
  }

  const headers: {
    'Content-Type': string
    'Cache-Control': string
    Pragma: string
    Expires: string
    Authorization?: string
  } = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
    Pragma: 'no-cache',
    Expires: '0'
  }

  const accessToken = sessionStorage.getItem('accessToken')

  if (accessToken) {
    headers['Authorization'] = accessToken
  }

  try {
    const response = await axios.post(`${apiUrl}/auth/login`, { email, password }, { headers })

    console.log('Login Success:', response.data)

    return response.data
  } catch (error: any) {
    console.error('Login Error:', error.response?.data?.message || error.message || error)

    throw new Error(error.response?.data?.message || 'An unexpected error occurred during login')
  }
}
