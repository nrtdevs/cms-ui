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
  TableHead
} from '@mui/material'

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
    permissions: { permission_group: string, permissions: { id: number, permissionname: string }[] }[]
  }
}

type SelectedPermissions = {
  [key: string]: number[] // key is permission_group, value is an array of permission IDs
}

const AddRole: React.FC<AddRoleProps> = ({ open, setOpen, roleData }) => {
  const [userType, setUserType] = useState<string>('')
  const [name, setName] = useState<string>('') // Track the name
  const [description, setDescription] = useState<string>('') // Track the description
  const [selectedPermissions, setSelectedPermissions] = useState<SelectedPermissions>({})
  const [selectAllPermissions, setSelectAllPermissions] = useState(false)



  useEffect(() => {
    // If roleData is provided (edit case), prefill the form
    if (roleData) {
      setName(roleData.name)
      setUserType(roleData.userType)
      setDescription(roleData.description)
      console.log(roleData.permissions[0].permission_group)

      // Prefill selected permissions
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

  // Example permission data
  const permissions: Permission[] = [
    { id: 34, permissionname: 'read', permission_group: 'Dashboard' },
    { id: 72, permissionname: 'create', permission_group: 'User' },
    { id: 58, permissionname: 'read', permission_group: 'User' },
    { id: 61, permissionname: 'update', permission_group: 'User' },
    { id: 19, permissionname: 'delete', permission_group: 'User' },
    { id: 95, permissionname: 'block', permission_group: 'User' },
    { id: 23, permissionname: 'create', permission_group: 'Bidding' },
    { id: 47, permissionname: 'read', permission_group: 'Bidding' },
    { id: 12, permissionname: 'update', permission_group: 'Bidding' },
    { id: 8,  permissionname: 'approve', permission_group: 'Bidding' },
    { id: 74, permissionname: 'block', permission_group: 'Bidding' },
    { id: 63, permissionname: 'view', permission_group: 'Reporting' },
    { id: 21, permissionname: 'generate', permission_group: 'Reporting' },
    { id: 89, permissionname: 'download', permission_group: 'Reporting' },
    { id: 16, permissionname: 'create', permission_group: 'Content' },
    { id: 43, permissionname: 'edit', permission_group: 'Content' },
    { id: 77, permissionname: 'delete', permission_group: 'Content' },
    { id: 52, permissionname: 'approve', permission_group: 'Content' },
    { id: 91, permissionname: 'manage', permission_group: 'Settings' },
    { id: 35, permissionname: 'update', permission_group: 'Settings' },
    { id: 68, permissionname: 'view', permission_group: 'Settings' },
    { id: 30, permissionname: 'create', permission_group: 'Notifications' },
    { id: 59, permissionname: 'edit', permission_group: 'Notifications' },
    { id: 24, permissionname: 'delete', permission_group: 'Notifications' }
  ]


  // Group permissions by permission_group
  const groupedPermissions = permissions.reduce((acc: { [key: string]: Permission[] }, { permissionname, permission_group, id }) => {
    if (!acc[permission_group]) {
      acc[permission_group] = []
    }
    acc[permission_group].push({ permissionname, permission_group, id })
    return acc
  }, {})

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

  const handleSubmit = () => {
    if (!name || !userType) {
      alert('Name and UserType are required fields.')
      return
    }

    const permissionsToSubmit = Object.entries(selectedPermissions).map(([group, permissionNames]) => ({
      permission_group: group,
      permissions: permissionNames.map(permissionName => {
        const permission = permissions.find(p => p.id === permissionName && p.permission_group === group)
        return permission ? { permissionname: permission.permissionname, id: permission.id } : null
      }).filter(p => p !== null)
    }))

    const formData = {
      name,
      userType,
      description,
      permissions: permissionsToSubmit
    }

    console.log('Form submitted with the following data:', formData)

    // Reset form
    setName('')
    setUserType('')
    setDescription('')
    setSelectedPermissions({})
    setSelectAllPermissions(false)
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
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
              />
            </Box>
            <Box className='w-1/2'>
              <FormControl fullWidth>
                <InputLabel>UserType</InputLabel>
                <Select value={userType} onChange={e => setUserType(e.target.value)}>
                  <MenuItem value=''>Select UserType</MenuItem>
                  <MenuItem value='User'>User</MenuItem>
                  <MenuItem value='SuperAdmin'>SuperAdmin</MenuItem>
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
            <Button variant='outlined' className='border-gray-500 text-gray-300' onClick={handleClose}>
              Close
            </Button>
            <Button variant='contained' className='ml-4 bg-primary' onClick={handleSubmit}>
              {roleData ? 'Update' : 'Save'}
            </Button>
          </Box>
        </Box>
      </Container>
    </Dialog>
  )
}

export default AddRole
