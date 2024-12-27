'use client'

import React, { useState } from 'react'

import { Box, Button, Card, Typography, Stack, Grid } from '@mui/material'
import Swal from 'sweetalert2'

import CustomTextInput from '../../../../../Custom-Cpmponents/input/custominput'
import Dropdown from '../../../../../Custom-Cpmponents/Select-dropdown/dropdown'
import DatePickerInput from '../../../../../Custom-Cpmponents/input/Datepickerinput'

interface UserData {
  firstName: string
  lastName: string
  userId: string
  email: string
  contactNumber: string
  position: string
  company: string
  parentCompany: string
  clientName: string
  project: string
  employeeType: string
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

const entitlementOptions = ['Standard', 'Premium', 'Custom']
const projectOptions = ['Project A', 'Project B', 'Project C', 'Project D']
const employeeTypes = ['Full-Time', 'Part-Time', 'Locally Hired', 'Freelancer', 'Contractor']

const AddUser: React.FC<AddUserProps> = ({ onClose }) => {
  const [userData, setUserData] = useState<UserData>({
    firstName: '',
    lastName: '',
    userId: '',
    email: '',
    contactNumber: '',
    position: '',
    company: '',
    parentCompany: '',
    clientName: '',
    project: '',
    employeeType: '',
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
                label='User ID'
                placeholder='User ID'
                value={userData.userId}
                onChange={value => handleInputChange('userId', value)}
                error={!!errors.userId}
                helperText={errors.userId}
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
                label='Position'
                placeholder='Position'
                value={userData.position}
                onChange={value => handleInputChange('position', value)}
                error={!!errors.position}
                helperText={errors.position}
                required
              />
            </Grid>

            {/* Parent Company */}
            <Grid item xs={12} sm={4}>
              <Dropdown
                label='Parent Company'
                options={['FCC Construcción', 'TechCorp', 'DesignPro', 'FilmCo', 'BuildWorks']}
                selectedOption={userData.parentCompany}
                onSelect={value => handleInputChange('parentCompany', value)}
                error={!!errors.parentCompany}
                helperText={errors.parentCompany}
              />
            </Grid>

            {/* Client Name */}
            <Grid item xs={12} sm={4}>
              <CustomTextInput
                label='Client Name'
                placeholder='Client Name'
                value={userData.clientName}
                onChange={value => handleInputChange('clientName', value)}
                error={!!errors.clientName}
                helperText={errors.clientName}
                required
              />
            </Grid>

            {/* Project */}
            <Grid item xs={12} sm={4}>
              <Dropdown
                label='Project'
                options={projectOptions}
                selectedOption={userData.project}
                onSelect={value => handleInputChange('project', value)}
                error={!!errors.project}
                helperText={errors.project}
                required
              />
            </Grid>

            {/* Contact Reference */}
            <Grid item xs={12} sm={4}>
              <CustomTextInput
                label='Contact Reference'
                placeholder='Contact Reference'
                value={userData.contactReference}
                onChange={value => handleInputChange('contactReference', value)}
                error={!!errors.contactReference}
                helperText={errors.contactReference}
                required
              />
            </Grid>

            {/* Employee Type */}
            <Grid item xs={12} sm={4}>
              <Dropdown
                label='Employee Type'
                options={employeeTypes}
                selectedOption={userData.employeeType}
                onSelect={value => handleInputChange('employeeType', value)}
                error={!!errors.employeeType}
                helperText={errors.employeeType}
                required
              />
            </Grid>

            {/* Entitlements */}
            <Grid item xs={12} sm={4}>
              <Dropdown
                label='Entitlements'
                options={entitlementOptions}
                selectedOption={userData.entitlements}
                onSelect={value => handleInputChange('entitlements', value)}
                error={!!errors.entitlements}
                helperText={errors.entitlements}
                required
              />
            </Grid>

            {/* Activation Date */}
            <Grid item xs={12} sm={4}>
              <DatePickerInput
                label='Activation Date'
                value={userData.activationDate}
                onChange={value => handleInputChange('activationDate', value)}
                error={!!errors.activationDate}
                helperText={errors.activationDate}
                required
              />
            </Grid>

            {/* End Date */}
            <Grid item xs={12} sm={4}>
              <DatePickerInput
                label='End Date'
                value={userData.endDate}
                onChange={value => handleInputChange('endDate', value)}
                error={!!errors.endDate}
                helperText={errors.endDate}
                required
              />
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant='contained'
              className='text-primary bg-#cbff8c] focus:bg-[#cbff8c] hover:bg-[#cbff8c]'
              onClick={handleAddUser}
              sx={{
                backgroundColor: '#cbff8c',
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
