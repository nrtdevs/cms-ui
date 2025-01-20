'use client'

import React, { useState, useEffect } from 'react'

import {
  Container,
  Typography,
  Box,
  Dialog,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Checkbox,
  Card,
  CardContent
} from '@mui/material'

interface ViewRoleProps {
  open: boolean
  setOpen: (open: boolean) => void
  roleData?: {
    usertype: string
    name: string
    permissionname: string
    userType: string
    description: string
    permissions: { permission_group: string; permissions: { id: number; name: string }[] }[]
  }
}

const ViewRoleInfo: React.FC<ViewRoleProps> = ({ open, setOpen, roleData }) => {
  const [selectedPermissions, setSelectedPermissions] = useState<Record<string, number[]>>({})

  useEffect(() => {
    if (roleData) {
      const initialPermissions: Record<string, number[]> = {}

      roleData.permissions?.forEach(group => {
        initialPermissions[group.permission_group] = (group.permissions || []).map(p => p.id)
      })

      setSelectedPermissions(initialPermissions)
    }
  }, [roleData])

  console.log('roleData.permissions:', roleData?.permissions)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='md' fullWidth>
      <Container className='p-8'>
        <Box className='space-y-8'>
          {/* Title */}
          <Typography variant='h4' color='primary' fontWeight='bold' className='mb-6'>
            Role Details
          </Typography>

          {/* Role Information Section */}
          <Card variant='outlined' sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant='h6' color='textSecondary' className='mb-4'>
                <strong>Role Information</strong>
              </Typography>
              <Box className='grid grid-cols-2 gap-6'>
                <Box>
                  <Typography variant='body1'>
                    <strong>Name:</strong> {roleData?.name}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant='body1'>
                    <strong>User Type:</strong> {roleData?.userType}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Description Section */}
          <Card variant='outlined' sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant='h6' color='textSecondary' className='mb-4'>
                <strong>Description</strong>
              </Typography>
              <Typography variant='body1'>{roleData?.description}</Typography>
            </CardContent>
          </Card>

          {/* Permissions Table */}
          <Card variant='outlined' sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant='h6' color='textSecondary' className='mb-4'>
                <strong>Permissions</strong>
              </Typography>
              <TableContainer>
                <Table>
                  <TableBody>
                    {(roleData?.permissions || []).map(({ permission_group, permissions }) => (
                      <TableRow key={permission_group}>
                        <TableCell className='font-semibold'>{permission_group}</TableCell>
                        <TableCell>
                          {(permissions || []).map(permission => (
                            <Box key={permission.id} display='flex' alignItems='center' className='mb-2'>
                              <Checkbox
                                checked={selectedPermissions[permission_group]?.includes(permission.id) || false}
                                disabled
                              />
                              <Typography variant='body2'>{permission.name}</Typography>
                            </Box>
                          ))}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>

          {/* Close Button */}
          <Box display='flex' justifyContent='flex-end'>
            <Button
              onClick={handleClose}
              variant='contained'
              color='primary'
              sx={{
                paddingX: 4,
                paddingY: 2,
                '&:hover': {
                  backgroundColor: '#3f51b5'
                }
              }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Container>
    </Dialog>
  )
}

export default ViewRoleInfo
