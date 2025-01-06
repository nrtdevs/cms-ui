'use client'

import React, { useState } from 'react'

import { Button, Typography, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
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
  position: string
  employeeTypes: string
}

interface AddUserProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const positionTypes = ['Project-Manager', 'Team-Lead', 'Developer', 'Designer', 'Tester']

const AddUser: React.FC<AddUserProps> = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false)
  }

  // Initial empty data state
  const initialUserData: UserData = {
    firstName: '',
    lastName: '',
    employeeId: '',
    email: '',
    contactNumber: '',
    password: '',
    position: '',
    employeeTypes: ''
  }

  const [userData, setUserData] = useState<UserData>(initialUserData)
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

    // Loop through each field in userData
    Object.keys(userData).forEach(key => {
      const field = key as keyof UserData
      const value = userData[field]

      // Skip validation for unnecessary fields and perform validation only for required ones
      if (!value) {
        // If value is empty, mark it as required
        newErrors[field] = `${field} is required`
      } else {
        // Only perform validations on required fields (do not check if field is optional)
        if (field === 'email' && !/\S+@\S+\.\S+/.test(value)) {
          newErrors[field] = 'Invalid email format'
        }

        if (field === 'contactNumber' && !/^\+33-\d{3}-\d{3}-\d{3}$/.test(value)) {
          newErrors[field] = 'Invalid contact number format (+33-xxx-xxx-xxx)'
        }
      }
    })

    setErrors(newErrors)

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0
  }


  const handleAddUser = () => {
    if (validateAllFields()) {
      console.log('New user data:', userData)

      // Close dialog immediately
      handleClose()

      // Reset form data
      setUserData(initialUserData)

      // Show success Swal
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
          popup: 'animate__animated animate__fadeOutDown animate__faster'
        }
      })
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='md'>
      <DialogTitle variant='h4' className='flex gap-2 flex-col text-primary text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
        Add User Details
        <Typography component='span' className='flex flex-col text-center'>
          Please enter the details for the new user.
        </Typography>
      </DialogTitle>
      <form onSubmit={e => e.preventDefault()}>
        <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
          <Grid container spacing={5}>
            {/* User Details Section */}
            <Grid item xs={12}>
              <Typography variant='h6' className='text-primary font-bold'>
                User Details
              </Typography>
            </Grid>
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
        </DialogContent>
        <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
          <Button variant='contained' onClick={handleAddUser} type='submit'>
            Save
          </Button>
          <Button variant='tonal' color='secondary' type='reset' onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default AddUser
