import apiClient from "@/configs/axiosConfig"
export const roleList = async () => {
  try {
    const response = await apiClient.get('/roles/list')

    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.error)
  }
}

export const createRoles = async(data:any) =>{
  try{
    const response = await apiClient.post('/roles/create',data)
  }catch(error:any){
    throw new Error(error.response?.data?.error)
  }
}

export const permissionList = async () => {
  try {
    const response = await apiClient.get('/roles/permissions')
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.error)
  }
}
