'use client'
import { createRoles, permissionList } from '@/app/Services/roleService'
import React, { useState, useEffect } from 'react'

import {
  Container,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Button,
  Box,
  Typography,
  Dialog,
  TableHead
} from '@mui/material'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'

// Define the types for permissions and selected permissions
type Permission = {
  permissionname: string // Changed from 'name' to 'permissionname'
  permission_group: string
  id: number
}

interface AddRoleProps {
  open: boolean
  setOpen: (open: boolean) => void
  roleData?: {
    name: string
    userType: string
    description: string
    permissions: { permission_group: string; permissions: { id: number; permissionname: string }[] }[]
  }
  onSuccess: (open: boolean) => void
}

type SelectedPermissions = {
  [key: string]: number[] // key is permission_group, value is an array of permission IDs
}

const AddRole: React.FC<AddRoleProps> = ({ open, setOpen, roleData, onSuccess }) => {
  const [userType, setUserType] = useState<string>('')
  const [name, setName] = useState<string>('') // Track the name
  const [description, setDescription] = useState<string>('') // Track the description
  const [selectedPermissions, setSelectedPermissions] = useState<SelectedPermissions>({})
  const [selectAllPermissions, setSelectAllPermissions] = useState(false)
  const [permissions, setPermissions] = useState<Permission[]>([])

  const handleClose: any = () => {
    setOpen(false)
  }

  useEffect(() => {
    const fetchRoleData = async () => {
      try {
        const data = await permissionList()

        const formattedPermission: Permission[] = data.data.map((permission: any) => ({
          permissionname: permission.name,
          permission_group: permission.group,
          id: permission.id
        }))

        setPermissions(formattedPermission)
      } catch (error) {
        console.error('Error fetching role data:', error)
      }
    }

    fetchRoleData()
  }, [])

  // Group permissions by permission_group
  const groupedPermissions = permissions.reduce(
    (acc: { [key: string]: Permission[] }, { permissionname, permission_group, id }) => {
      if (!acc[permission_group]) {
        acc[permission_group] = []
      }

      acc[permission_group].push({ permissionname, permission_group, id })

      return acc
    },
    {}
  )

  const handleSelectAllGroup = (group: string) => {
    const allSelected = groupedPermissions[group].length === (selectedPermissions[group] || []).length

    setSelectedPermissions(prev => {
      const updatedPermissions = allSelected ? [] : groupedPermissions[group].map(permission => permission.id)

      return {
        ...prev,
        [group]: updatedPermissions
      }
    })
  }

  const handlePermissionChange = (group: string, permissionId: number) => {
    setSelectedPermissions(prev => {
      const groupPermissions = prev[group] || []

      if (groupPermissions.includes(permissionId)) {
        return {
          ...prev,
          [group]: groupPermissions.filter(id => id !== permissionId)
        }
      } else {
        return {
          ...prev,
          [group]: [...groupPermissions, permissionId]
        }
      }
    })
  }

  const handleSelectAllPermissions = () => {
    const allSelected = permissions.length === Object.values(selectedPermissions).flat().length

    setSelectAllPermissions(!allSelected)
    const newSelectedPermissions: SelectedPermissions = {}

    if (!allSelected) {
      permissions.forEach(({ permission_group, id }) => {
        if (!newSelectedPermissions[permission_group]) {
          newSelectedPermissions[permission_group] = []
        }

        newSelectedPermissions[permission_group].push(id)
      })
    }

    setSelectedPermissions(newSelectedPermissions)
  }

  const isPermissionSelected = (group: string, permissionId: number) => {
    return selectedPermissions[group]?.includes(permissionId) || false
  }

  const handleSubmit = async () => {
    if (!name || !userType) {
      return
    }

    const permissionsToSubmit = Object.entries(selectedPermissions).map(([group, permissionNames]) => ({
      permission_group: group,
      permissions: permissionNames
        .map(permissionName => {
          const permission = permissions.find(p => p.id === permissionName && p.permission_group === group)

          return permission ? { permissionname: permission.permissionname, id: permission.id } : null
        })
        .filter(p => p !== null)
    }))

    const selectedPermissionIds: Number[] = permissionsToSubmit.flatMap(group =>
      group.permissions.map(permission => permission.id)
    )

    const formData = {
      name,
      userType,
      description,
      permissions: selectedPermissionIds
    }


    const response = await createRoles(formData)

    if (response.success) {
      Swal.fire({
        title: 'Success!',
        text: 'Role created submitted successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      })

    } else {
      console.error('Error creating role:', response.data)

      Swal.fire({
        title: 'Failed !',
        text: 'Role creation failed.',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }

    // Reset form
    setName('')
    setUserType('')
    setDescription('')
    setSelectedPermissions({})
    setSelectAllPermissions(false)
    onSuccess(true)
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='md' fullWidth>
      <Container className='p-8 min-h-screen'>
        <h1 className='text-2xl mb-6 text-primary'>{roleData ? 'Edit Role' : 'Add Role'}</h1>
        <Box className='space-y-4'>
          <Box className='flex items-center space-x-4 mb-4'>
            <Box className='w-1/2'>
              <TextField
                label='Name'
                placeholder='Enter Name'
                fullWidth
                value={name}
                onChange={e => setName(e.target.value)}
                InputLabelProps={{ className: 'text-gray-400' }}
                required
              />
            </Box>
            <Box className='w-1/2'>
              <FormControl fullWidth>
                <InputLabel htmlFor='userType'>User Type</InputLabel>
                <Select
                  value={userType}
                  onChange={e => setUserType(e.target.value)}
                  label='User Type*'
                  id='userType'
                  required
                >
                  <MenuItem value=''>Select UserType</MenuItem>
                  <MenuItem value='user'>User</MenuItem>
                  <MenuItem value='super_admin'>SuperAdmin</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          <Box className='mb-4'>
            <TextField
              label='Description'
              placeholder='Enter description'
              multiline
              rows={4}
              fullWidth
              value={description}
              onChange={e => setDescription(e.target.value)}
              InputLabelProps={{ className: 'text-gray-400' }}
              required
            />
          </Box>

          <Box className='flex justify-end'>
            <Checkbox checked={selectAllPermissions} onChange={handleSelectAllPermissions} color='primary' />
            <Typography className='text-primary mt-1.5'>Select All Permissions</Typography>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className='center text-primary items-right'>
                    <strong>Permission Group</strong>
                  </TableCell>
                  <TableCell className='center text-primary items-right'>
                    <strong>Permissions</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(groupedPermissions).map(group => (
                  <TableRow key={group}>
                    <TableCell>
                      <Box display='flex' alignItems='center' marginRight={2}>
                        <Checkbox
                          checked={groupedPermissions[group].length === (selectedPermissions[group]?.length || 0)}
                          onChange={() => handleSelectAllGroup(group)}
                          color='primary'
                        />
                        {group}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display='flex' flexWrap='wrap' alignItems='center'>
                        {groupedPermissions[group].map(permission => (
                          <Box key={permission.id} display='flex' alignItems='center' marginRight={2}>
                            <Checkbox
                              checked={isPermissionSelected(group, permission.id)}
                              onChange={() => handlePermissionChange(group, permission.id)}
                              color='primary'
                            />
                            <Typography variant='body1' style={{ marginLeft: '8px' }}>
                              {permission.permissionname.charAt(0).toUpperCase() + permission.permissionname.slice(1)}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box className='flex justify-end mt-4'>
            <Button variant='contained' className='ml-4 bg-primary' onClick={handleSubmit}>
              {roleData ? 'Update' : 'Save'}
            </Button>
            <Button variant='outlined' className='border-gray-500 text-gray-300 ml-4' onClick={handleClose}>
              Close
            </Button>
          </Box>
        </Box>
      </Container>
    </Dialog>
  )
}

export default AddRole
