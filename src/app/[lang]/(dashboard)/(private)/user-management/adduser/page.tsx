'use client'

import React, { useState } from 'react'

import { Box, Button, Card, Typography, Stack, Grid } from '@mui/material'
import Swal from 'sweetalert2'

import CustomTextInput from '../../../../../Custom-Cpmponents/input/custominput'
import Dropdown from '../../../../../Custom-Cpmponents/Select-dropdown/dropdown'

interface UserData {
  firstName: string
  lastName: string
  employeeId: string
  email: string
  contactNumber: string
  password: any
  company: string
  position: string
  clientName: string
  project: string
  employeeTypes: string
  activationDate: string
  endDate: string
  entitlements: string
  contactReference: any
}

interface AddUserProps {
  onClose: () => void
  parentCompanies: string[]
  projects: string[]
  employeeTypes: string[]
  entitlements: string[]
}

const positionTypes = ['Project-Manager', 'Team-Lead', 'Developer', 'Designer', 'Tester']

const AddUser: React.FC<AddUserProps> = ({ onClose }) => {
  const [userData, setUserData] = useState<UserData>({
    firstName: '',
    lastName: '',
    employeeId: '',
    email: '',
    contactNumber: '',
    password: '',
    company: '',
    position: '',
    clientName: '',
    project: '',
    employeeTypes: '',
    activationDate: '',
    endDate: '',
    entitlements: '',
    contactReference: ''
  })

  const [errors, setErrors] = useState<{ [key in keyof UserData]?: string }>({})

  const handleInputChange = (field: keyof UserData, value: string) => {
    setUserData(prevData => ({
      ...prevData,
      [field]: value
    }))

    if (errors[field]) {
      validateField(field, value)
    }
  }

  const validateField = (field: keyof UserData, value: string) => {
    let error = ''

    // Required field validation
    if (!value) {
      error = `${field} is required`
    } else {
      // Additional validations
      if (field === 'email' && !/\S+@\S+\.\S+/.test(value)) {
        error = 'Invalid email format'
      }

      if (field === 'contactNumber' && !/^\+33-\d{3}-\d{3}-\d{3}$/.test(value)) {
        error = 'Invalid contact number format (+33-xxx-xxx-xxx)'
      }
    }

    setErrors(prevErrors => ({
      ...prevErrors,
      [field]: error
    }))
  }

  const validateAllFields = () => {
    const newErrors: { [key in keyof UserData]?: string } = {}

    Object.keys(userData).forEach(key => {
      const field = key as keyof UserData
      const value = userData[field]

      if (!value) {
        newErrors[field] = `${field} is required`
      } else {
        if (field === 'email' && !/\S+@\S+\.\S+/.test(value)) {
          newErrors[field] = 'Invalid email format'
        }

        if (field === 'contactNumber' && !/^\+33-\d{3}-\d{3}-\d{3}$/.test(value)) {
          newErrors[field] = 'Invalid contact number format (+33-xxx-xxx-xxx)'
        }
      }
    })

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleAddUser = () => {
    if (validateAllFields()) {
      console.log('New user data:', userData)
      Swal.fire({
        title: 'Success!',
        text: 'User added successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
        showConfirmButton: true,
        customClass: {
          confirmButton: 'custom-swal-button'
        },
        hideClass: {
          popup: `animate__animated animate__fadeOutDown animate__faster`
        }
      }).then(() => {
        onClose()
      })
    }
  }

  return (
    <Box>
      <Grid className='flex items-center mb-5'>
        <Box
          sx={{
            height: '30px',
            width: '30px',
            borderRadius: '10px',
            alignContent: 'center'
          }}
          className='border-2 border-primary primary flex items-center justify-center '
          onClick={onClose}
        >
          <i className='tabler-arrow-narrow-left text-base p-3 text-primary font-120'></i>
        </Box>

        <Typography variant='h4' className='font-bold text-primary ml-3'>
          Add New User
        </Typography>
      </Grid>

      <Card className='p-20 shadow-lg'>
        <Stack spacing={5}>
          <Grid container spacing={6}>
            {/* First Name */}
            <Grid item xs={12} sm={4}>
              <CustomTextInput
                label='First Name'
                placeholder='First Name'
                value={userData.firstName}
                onChange={value => handleInputChange('firstName', value)}
                error={!!errors.firstName}
                helperText={errors.firstName}
                required
              />
            </Grid>

            {/* Last Name */}
            <Grid item xs={12} sm={4}>
              <CustomTextInput
                label='Last Name'
                placeholder='Last Name'
                value={userData.lastName}
                onChange={value => handleInputChange('lastName', value)}
                error={!!errors.lastName}
                helperText={errors.lastName}
                required
              />
            </Grid>

            {/* User ID */}
            <Grid item xs={12} sm={4}>
              <CustomTextInput
                label='Employee ID'
                placeholder='Employee ID'
                value={userData.employeeId}
                onChange={value => handleInputChange('employeeId', value)}
                error={!!errors.employeeId}
                helperText={errors.employeeId}
                required
              />
            </Grid>

            {/* Email */}
            <Grid item xs={12} sm={4}>
              <CustomTextInput
                label='Email'
                placeholder='Email'
                value={userData.email}
                onChange={value => handleInputChange('email', value)}
                error={!!errors.email}
                helperText={errors.email}
                required
              />
            </Grid>

            {/* Contact Number */}
            <Grid item xs={12} sm={4}>
              <CustomTextInput
                placeholder='+33-xxx-xxx-xxx'
                label='Contact Number'
                value={userData.contactNumber}
                onChange={value => handleInputChange('contactNumber', value)}
                error={!!errors.contactNumber}
                helperText={errors.contactNumber}
                required
              />
            </Grid>

            {/* Position */}
            <Grid item xs={12} sm={4}>
              <CustomTextInput
                label='Password'
                type='password'
                placeholder='Password'
                value={userData.password}
                onChange={value => handleInputChange('password', value)}
                error={!!errors.password}
                helperText={errors.password}
                required
              />
            </Grid>

            {/* Parent Company */}
            <Grid item xs={12} sm={4}>
              <Dropdown
                label='Position'
                options={positionTypes}
                selectedOption={userData.position}
                onSelect={value => handleInputChange('position', value)}
                error={!!errors.position}
                helperText={errors.position}
                required
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Dropdown
                label='Employee Type'
                options={['user']}
                selectedOption={userData.employeeTypes}
                onSelect={value => handleInputChange('employeeTypes', value)}
                error={!!errors.employeeTypes}
                helperText={errors.employeeTypes}
                required
              />
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant='contained'
              className=' bg-primary text-transparent]'
              onClick={handleAddUser}
              sx={{
                fontWeight: '600'
              }}
            >
              Add User
            </Button>
          </Box>
        </Stack>
      </Card>
    </Box>
  )
}

export default AddUser
