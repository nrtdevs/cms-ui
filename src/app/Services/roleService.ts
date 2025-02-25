import apiClient from '@/configs/axiosConfig'
import { toast } from 'react-toastify'
export const roleList = async () => {
  try {
    const response = await apiClient.get('/roles/list')
    return response.data
  } catch (error: any) {
    toast.error(error.response?.data?.errors)
    throw new Error(error.response?.data?.errors)
  }
}

export const createRoles = async (data: any) => {
  try {
    const response = await apiClient.post('/roles/create', data)
    return response.data
  } catch (error: any) {
    toast.error(error.response?.data?.errors)
    throw new Error(error.response?.data?.errors)
  }
}

export const permissionList = async () => {
  try {
    const response = await apiClient.get('/roles/permissions')
    return response.data
  } catch (error: any) {
    toast.error(error.response?.data?.errors)
    throw new Error(error.response?.data?.errors)
  }
}


export const roleUpdate = async (id: number, data: any) => {
  try {
    const response = await apiClient.put(`/roles/update/${id}`, data);
    return response.data;
  } catch (error: any) {
    console.log(error.response?.data);

    const errorMessage =
      error.response?.data?.errors || "An unexpected error occurred";

    toast.error(errorMessage);
  }
};


