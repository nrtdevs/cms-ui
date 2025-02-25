'use client'

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
  TableHead,
  SelectChangeEvent
} from '@mui/material'
import { permissionList, roleUpdate } from '@/app/Services/roleService'
import Swal from 'sweetalert2'

type Permission = {
  permissionname: string
  permission_group: string
  id: number
}

interface AddRoleProps {
  open: boolean
  setOpen: (open: boolean) => void
  roleData?: {
    id: number
    name: string
    userType: string
    description: string
    permissions: { permission_group: string; permissions: { id: number; permissionname: string }[] }[]
  }
  onSuccess: (open: boolean) => void
}

type SelectedPermissions = {
  [key: string]: number[]
}

const EditTrackStatus: React.FC<AddRoleProps> = ({ open, setOpen, roleData, onSuccess }) => {
  const [userType, setUserType] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [selectedPermissions, setSelectedPermissions] = useState<SelectedPermissions>({})
  const [selectAllPermissions, setSelectAllPermissions] = useState(false)
  const [permissions, setPermissions] = useState<Permission[]>([])

  useEffect(() => {
    if (roleData) {
      setName(roleData.name)
      setUserType(roleData.userType)
      setDescription(roleData.description)

      const newSelectedPermissions: SelectedPermissions = {}
      roleData.permissions.forEach(group => {
        newSelectedPermissions[group.permission_group] = group.permissions.map(p => p.id)
      })
      setSelectedPermissions(newSelectedPermissions)
    }
  }, [roleData])

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

  const handleClose = () => {
    setOpen(false)
  }

  // const permissions: Permission[] = [
  //   { id: 1, permissionname: 'read', permission_group: 'Dashboard' },
  //   { id: 2, permissionname: 'create', permission_group: 'User' },
  //   { id: 3, permissionname: 'read', permission_group: 'User' },
  //   { id: 4, permissionname: 'update', permission_group: 'User' },
  //   { id: 5, permissionname: 'approve', permission_group: 'User' },
  //   { id: 6, permissionname: 'block', permission_group: 'User' },
  //   { id: 7, permissionname: 'create', permission_group: 'Bidding' },
  //   { id: 8, permissionname: 'read', permission_group: 'Bidding' },
  //   { id: 9, permissionname: 'update', permission_group: 'Bidding' },
  //   { id: 10, permissionname: 'approve', permission_group: 'Bidding' },
  //   { id: 74, permissionname: 'block', permission_group: 'Bidding' },
  //   { id: 30, permissionname: 'create', permission_group: 'Reporting' },
  //   { id: 59, permissionname: 'edit', permission_group: 'Reporting' },
  //   { id: 24, permissionname: 'delete', permission_group: 'Reporting' },
  //   { id: 30, permissionname: 'create', permission_group: 'Content' },
  //   { id: 59, permissionname: 'edit', permission_group: 'Content' },
  //   { id: 24, permissionname: 'delete', permission_group: 'Content' },
  //   { id: 30, permissionname: 'create', permission_group: 'Settings' },
  //   { id: 59, permissionname: 'edit', permission_group: 'Settings' },
  //   { id: 24, permissionname: 'delete', permission_group: 'Settings' },
  //   { id: 30, permissionname: 'create', permission_group: 'Notifications' },
  //   { id: 59, permissionname: 'edit', permission_group: 'Notifications' },
  //   { id: 24, permissionname: 'delete', permission_group: 'Notifications' }
  // ]

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

      return { ...prev, [group]: updatedPermissions }
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

  const handleUserTypeChange = (event: SelectChangeEvent<string>) => {
    const selectedType = event.target.value
    setUserType(selectedType)

    // Set permissions based on user type
    if (selectedType === 'superadmin') {
      // Select all permissions for Super Admin
      const allPermissions: SelectedPermissions = {}
      permissions.forEach(({ permission_group, id }) => {
        if (!allPermissions[permission_group]) {
          allPermissions[permission_group] = []
        }
        allPermissions[permission_group].push(id)
      })
      setSelectedPermissions(allPermissions)
      setSelectAllPermissions(true) // Make sure the 'Select All Permissions' checkbox is checked
    } else {
      // Only set "user" permissions
      // const userPermissions = permissions.filter(p => p.permission_group === 'User');
      // const userPermissionsSelected: SelectedPermissions = { User: userPermissions.map(p => p.id) };
      // setSelectedPermissions(userPermissionsSelected);
      setSelectAllPermissions(true) // Uncheck the 'Select All Permissions' checkbox for user
    }
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
      description,
      permissions: selectedPermissionIds
    }


    const response = await roleUpdate(roleData?.id || 1, formData)

    if (response) {
      Swal.fire({
        title: 'Success!',
        text: 'Role created submitted successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      })

    }
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
                label='Name *'
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
                <Select value={userType} onChange={handleUserTypeChange} label='User Type' id='userType' disabled>
                  <MenuItem value='user'>User</MenuItem>
                  <MenuItem value='super_admin'>Super Admin</MenuItem>
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
export default EditTrackStatus
