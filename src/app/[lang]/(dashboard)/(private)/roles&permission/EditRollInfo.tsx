'use client'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

import CustomTextInput from '@/app/Custom-Cpmponents/input/custominput'
import DialogCloseButton from '@/components/dialogs/DialogCloseButton'
import Dropdown from '@/app/Custom-Cpmponents/Select-dropdown/dropdown'

type Project = {
  name: string
  userType: string
  description: string
  permissions: string
}

type Permission = {
  id: string
  permissionname: string
  permission_group: string
}

type EditUserInfoProps = {
  open: boolean
  setOpen: (open: boolean) => void
  roleData?: Project
  groupedPermissions: { [group: string]: Permission[] }
}

const permissions: Permission[] = [
  { id: '34', permissionname: 'read', permission_group: 'Dashboard' },
  { id: '72', permissionname: 'create', permission_group: 'User' },
  { id: '58', permissionname: 'read', permission_group: 'User' },
  { id: '61', permissionname: 'update', permission_group: 'User' },
  { id: '19', permissionname: 'delete', permission_group: 'User' },
  { id: '95', permissionname: 'block', permission_group: 'User' },
  { id: '23', permissionname: 'create', permission_group: 'Bidding' },
  { id: '47', permissionname: 'read', permission_group: 'Bidding' },
  { id: '12', permissionname: 'update', permission_group: 'Bidding' },
  { id: '8', permissionname: 'approve', permission_group: 'Bidding' },
  { id: '74', permissionname: 'block', permission_group: 'Bidding' },
  { id: '63', permissionname: 'view', permission_group: 'Reporting' },
  { id: '21', permissionname: 'generate', permission_group: 'Reporting' },
  { id: '89', permissionname: 'download', permission_group: 'Reporting' },
  { id: '16', permissionname: 'create', permission_group: 'Content' },
  { id: '43', permissionname: 'edit', permission_group: 'Content' },
  { id: '77', permissionname: 'delete', permission_group: 'Content' },
  { id: '52', permissionname: 'approve', permission_group: 'Content' },
  { id: '91', permissionname: 'manage', permission_group: 'Settings' },
  { id: '35', permissionname: 'update', permission_group: 'Settings' },
  { id: '68', permissionname: 'view', permission_group: 'Settings' },
  { id: '30', permissionname: 'create', permission_group: 'Notifications' },
  { id: '59', permissionname: 'edit', permission_group: 'Notifications' },
  { id: '24', permissionname: 'delete', permission_group: 'Notifications' }
]

const EditTrackStatus = ({ open, setOpen, roleData, groupedPermissions }: EditUserInfoProps) => {
  const [roleDatas, setRoleData] = useState<Project>({
    name: '',
    userType: '',
    description: '',
    permissions: ''
  })

  const [errors, setErrors] = useState<any>({})
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])

  useEffect(() => {
    if (roleData) {
      setRoleData(roleData)
    }
  }, [roleData])

  // Form validation logic
  const formvalidation = (): boolean => {
    const validationErrors: any = {}

    if (!roleDatas.name) validationErrors.name = 'Name is required.'
    if (!roleDatas.userType) validationErrors.userType = 'User Type is required.'
    if (!roleDatas.description) validationErrors.description = 'Description is required.'
    if (!roleDatas.permissions) validationErrors.permissions = 'Permissions are required.'

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)

      return false
    }

    return true
  }

  // Handle dialog close, reset the state and errors
  const handleClose = () => {
    setOpen(false)
    setRoleData({
      name: '',
      userType: '',
      description: '',
      permissions: ''
    })
    setErrors({})
    setSelectedPermissions([])
  }

  // Handle saving the form data
  const handleSave = () => {
    if (formvalidation()) {
      console.log('Saved Data:', roleDatas)
      console.log('Selected Permissions:', selectedPermissions)
      setOpen(false)
    }
  }

  // Handle input field changes
  const handleInputChange = (field: keyof Project, value: string) => {
    setRoleData(prevData => ({
      ...prevData,
      [field]: value
    }))
    setErrors((prevErrors: any) => {
      const updatedErrors = { ...prevErrors }

      delete updatedErrors[field]

      return updatedErrors
    })
  }

  // Handle individual permission checkbox change
  const handlePermissionChange = (permissionId: string) => {
    setSelectedPermissions(prevSelected => {
      const isSelected = prevSelected.includes(permissionId)

      if (isSelected) {
        return prevSelected.filter(id => id !== permissionId)
      } else {
        return [...prevSelected, permissionId]
      }
    })
  }

  // Check if permission is selected
  const isPermissionSelected = (permissionId: string) => {
    return selectedPermissions.includes(permissionId)
  }

  // Handle select all permissions for a group
  const handleSelectAllGroup = (group: string) => {
    const groupPermissions = groupedPermissions[group]

    const allSelected = groupPermissions.every(permission => selectedPermissions.includes(permission.id))

    if (allSelected) {
      setSelectedPermissions(prevSelected =>
        prevSelected.filter(id => !groupPermissions.some(permission => permission.id === id))
      )
    } else {
      setSelectedPermissions(prevSelected =>
        [...prevSelected, ...groupPermissions.map(permission => permission.id)].filter(
          (value, index, self) => self.indexOf(value) === index
        )
      )
    }
  }

  return (
    <Dialog fullWidth open={open} onClose={handleClose} maxWidth='md' scroll='body'>
      <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
        <i className='tabler-x' />
      </DialogCloseButton>
      <DialogTitle variant='h4' className='flex gap-2 flex-col text-primary text-center'>
        Edit Tracking Information
      </DialogTitle>
      <form onSubmit={e => e.preventDefault()}>
        <DialogContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={3}>
              <CustomTextInput
                label='Name'
                value={roleDatas.name}
                onChange={value => handleInputChange('name', value)}
                error={Boolean(errors.name)}
                helperText={errors.name}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Dropdown
                label='User Type'
                options={['user', 'superadmin']}
                selectedOption={roleDatas.userType}
                onSelect={value => handleInputChange('userType', value)}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <CustomTextInput
                label='Description'
                value={roleDatas.description}
                onChange={value => handleInputChange('description', value)}
                error={Boolean(errors.description)}
                helperText={errors.description}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <CustomTextInput
                label='Permissions'
                value={roleDatas.permissions}
                onChange={value => handleInputChange('permissions', value)}
                error={Boolean(errors.permissions)}
                helperText={errors.permissions}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
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
                    {groupedPermissions && Object.keys(groupedPermissions).length > 0 ? (
                      Object.keys(groupedPermissions).map(group => {
                        const groupPermissions = groupedPermissions[group]

                        if (groupPermissions.length > 0) {
                          return (
                            <TableRow key={group}>
                              <TableCell>
                                <Box display='flex' alignItems='center' marginRight={2}>
                                  <Checkbox
                                    checked={groupPermissions.every(permission =>
                                      selectedPermissions.includes(permission.id)
                                    )}
                                    onChange={() => handleSelectAllGroup(group)}
                                  />
                                  <Typography variant='h6' style={{ marginLeft: '8px' }}>
                                    {group}
                                  </Typography>
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Box display='flex' flexWrap='wrap' alignItems='center'>
                                  {groupPermissions.map(permission => (
                                    <Box key={permission.id} display='flex' alignItems='center' marginRight={2}>
                                      <Checkbox
                                        checked={isPermissionSelected(permission.id)}
                                        onChange={() => handlePermissionChange(permission.id)}
                                        color='primary'
                                      />
                                      <Typography variant='body1' style={{ marginLeft: '8px' }}>
                                        {permission.permissionname.charAt(0).toUpperCase() +
                                          permission.permissionname.slice(1)}
                                      </Typography>
                                    </Box>
                                  ))}
                                </Box>
                              </TableCell>
                            </TableRow>
                          )
                        }

                        return null
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={2}>No permission groups available</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' color='secondary' onClick={handleClose}>
            Cancel
          </Button>
          <Button variant='contained' onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default EditTrackStatus
