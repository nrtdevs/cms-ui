'use client'

import React, { useState, useEffect } from 'react'

import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Modal,
  TextField,
  Checkbox,
  CircularProgress,
  Snackbar
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'

const RolesPermissionsPage: React.FC = () => {
  const [roles, setRoles] = useState<any[]>([])
  const [permissions, setPermissions] = useState<any[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedRole, setSelectedRole] = useState<any>(null)
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null)

  const { control, handleSubmit, reset, setValue } = useForm()

  // Fetch roles and permissions on component mount
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsLoading(true)

    try {
      const [rolesResponse, permissionsResponse] = await Promise.all([fetch('/api/roles'), fetch('/api/permissions')])

      const rolesData = await rolesResponse.json()
      const permissionsData = await permissionsResponse.json()

      setRoles(rolesData)
      setPermissions(permissionsData)
    } catch (error) {
      console.error('Failed to fetch data:', error)
      setSnackbarMessage('Failed to load roles or permissions.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditRole = (role: any) => {
    setSelectedRole(role)
    setValue('name', role.name)
    setValue(
      'permissions',
      role.permissions.map((p: any) => p.id)
    )
    setIsModalVisible(true)
  }

  const handleDeleteRole = async (roleId: string) => {
    try {
      await fetch(`/api/roles/${roleId}`, { method: 'DELETE' })
      setSnackbarMessage('Role deleted successfully.')
      fetchData()
    } catch (error) {
      console.error('Failed to delete role:', error)
      setSnackbarMessage('Failed to delete role.')
    }
  }

  const onSubmit = async (values: any) => {
    try {
      const method = selectedRole ? 'PUT' : 'POST'
      const url = selectedRole ? `/api/roles/${selectedRole.id}` : '/api/roles'

      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name,
          permissions: values.permissions
        })
      })

      setSnackbarMessage(selectedRole ? 'Role updated successfully.' : 'Role created successfully.')
      setIsModalVisible(false)
      reset()
      setSelectedRole(null)
      fetchData()
    } catch (error) {
      console.error('Failed to save role:', error)
      setSnackbarMessage('Failed to save role.')
    }
  }

  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <h1 className='text-2xl font-bold mb-4'>Roles and Permissions</h1>

      <Button variant='contained' color='primary' onClick={() => setIsModalVisible(true)} className='mb-4'>
        Add Role
      </Button>

      {isLoading ? (
        <div className='flex justify-center items-center h-64'>
          <CircularProgress />
        </div>
      ) : (
        <TableContainer className='bg-white shadow-md rounded'>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className='font-bold'>Role Name</TableCell>
                <TableCell className='font-bold'>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles.map(role => (
                <TableRow key={role.id}>
                  <TableCell>{role.name}</TableCell>
                  <TableCell>
                    <Button variant='text' color='primary' onClick={() => handleEditRole(role)}>
                      Edit
                    </Button>
                    <Button variant='text' color='error' onClick={() => handleDeleteRole(role.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Modal
        open={isModalVisible}
        onClose={() => {
          setIsModalVisible(false)
          reset()
          setSelectedRole(null)
        }}
        className='flex items-center justify-center'
      >
        <div className='bg-white p-6 rounded shadow-md w-96'>
          <h2 className='text-xl font-semibold mb-4'>{selectedRole ? 'Edit Role' : 'Add Role'}</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name='name'
              control={control}
              defaultValue=''
              rules={{ required: 'Role name is required' }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label='Role Name'
                  variant='outlined'
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  className='mb-4'
                />
              )}
            />
            <div className='mb-4'>
              <label className='font-semibold mb-2 block'>Permissions</label>
              {permissions.map(permission => (
                <div key={permission.id} className='flex items-center mb-2'>
                  <Controller
                    name='permissions'
                    control={control}
                    defaultValue={[]}
                    render={({ field }) => (
                      <Checkbox
                        value={permission.id}
                        checked={field.value.includes(permission.id)}
                        onChange={e => {
                          const newValue = e.target.checked
                            ? [...field.value, permission.id]
                            : field.value.filter((id: string) => id !== permission.id)

                          field.onChange(newValue)
                        }}
                      />
                    )}
                  />
                  <span>{permission.name}</span>
                </div>
              ))}
            </div>
            <div className='flex justify-end'>
              <Button
                onClick={() => {
                  setIsModalVisible(false)
                  reset()
                  setSelectedRole(null)
                }}
                className='mr-2'
              >
                Cancel
              </Button>
              <Button type='submit' variant='contained' color='primary'>
                {selectedRole ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </div>
      </Modal>

      <Snackbar
        open={!!snackbarMessage}
        autoHideDuration={3000}
        onClose={() => setSnackbarMessage(null)}
        message={snackbarMessage}
      />
    </div>
  )
}

export default RolesPermissionsPage
