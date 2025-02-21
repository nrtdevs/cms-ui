

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

type Permission = {
  permissionname: string
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
}

type SelectedPermissions = {
  [key: string]: number[]
}

const EditTrackStatus: React.FC<AddRoleProps> = ({ open, setOpen, roleData }) => {
  const [userType, setUserType] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [selectedPermissions, setSelectedPermissions] = useState<SelectedPermissions>({})
  const [selectAllPermissions, setSelectAllPermissions] = useState(false)

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

  const handleClose = () => {
    setOpen(false)
  }

  const permissions: Permission[] = [
    { id: 34, permissionname: 'read', permission_group: 'Dashboard' },
    { id: 23, permissionname: 'create', permission_group: 'User' },
    { id: 47, permissionname: 'read', permission_group: 'User' },
    { id: 12, permissionname: 'update', permission_group: 'User' },
    { id: 8, permissionname: 'approve', permission_group: 'User' },
    { id: 74, permissionname: 'block', permission_group: 'User' },
    { id: 23, permissionname: 'create', permission_group: 'Bidding' },
    { id: 47, permissionname: 'read', permission_group: 'Bidding' },
    { id: 12, permissionname: 'update', permission_group: 'Bidding' },
    { id: 8, permissionname: 'approve', permission_group: 'Bidding' },
    { id: 74, permissionname: 'block', permission_group: 'Bidding' },
    { id: 30, permissionname: 'create', permission_group: 'Reporting' },
    { id: 59, permissionname: 'edit', permission_group: 'Reporting' },
    { id: 24, permissionname: 'delete', permission_group: 'Reporting' },
    { id: 30, permissionname: 'create', permission_group: 'Content' },
    { id: 59, permissionname: 'edit', permission_group: 'Content' },
    { id: 24, permissionname: 'delete', permission_group: 'Content' },
    { id: 30, permissionname: 'create', permission_group: 'Settings' },
    { id: 59, permissionname: 'edit', permission_group: 'Settings' },
    { id: 24, permissionname: 'delete', permission_group: 'Settings' },
    { id: 30, permissionname: 'create', permission_group: 'Notifications' },
    { id: 59, permissionname: 'edit', permission_group: 'Notifications' },
    { id: 24, permissionname: 'delete', permission_group: 'Notifications' }
  ]

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

  const handleSubmit = () => {
    if (!name || !userType) {
      alert('Name and UserType are required fields.')
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

    const formData = {
      name,
      userType,
      description,
      permissions: permissionsToSubmit
    }

    console.log('Form submitted with the following data:', formData)

    setName('')
    setUserType('')
    setDescription('')
    setSelectedPermissions({})
    setSelectAllPermissions(false)
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
                <Select value={userType} onChange={handleUserTypeChange} label='User Type' id='userType' required>
                  <MenuItem value='user'>User</MenuItem>
                  <MenuItem value='superadmin'>Super Admin</MenuItem>
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
