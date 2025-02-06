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

// Regex for validation (defined once)
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const contactNumberRegex = /^\+91\s?\d{10}$/ // Allowing space before 10 digits

const AddUser: React.FC<AddUserProps> = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false)
  }

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
    const trimmedValue = value.trim() // Trim leading and trailing spaces

    if (!trimmedValue) {
      error = '' // Show error if the value is empty or just spaces
    } else {
      // Email validation
      if (field === 'email' && !emailRegex.test(trimmedValue)) {
        error = 'Invalid email format'
      }

      // Contact number validation
      if (field === 'contactNumber' && !contactNumberRegex.test(trimmedValue.replace(/\s/g, ''))) {
        error = 'Invalid contact number'
      }
    }

    setErrors(prevErrors => ({
      ...prevErrors,
      [field]: error
    }))
  }

  const validateAllFields = () => {
    const newErrors: { [key in keyof UserData]?: string } = {}

    if (!userData.firstName.trim()) newErrors.firstName = 'First Name is required'
    if (!userData.lastName.trim()) newErrors.lastName = 'Last Name is required'
    if (!userData.employeeId.trim()) newErrors.employeeId = 'Employee ID is required'
    if (!userData.email.trim()) newErrors.email = 'Email is required'
    else if (!emailRegex.test(userData.email.trim())) newErrors.email = 'Invalid email format'
    if (!userData.contactNumber.trim()) newErrors.contactNumber = 'Contact Number is required'
    else if (!contactNumberRegex.test(userData.contactNumber.trim().replace(/\s/g, '')))
      newErrors.contactNumber = 'Invalid contact number'
    if (!userData.password.trim()) newErrors.password = 'Password is required'
    if (!userData.position.trim()) newErrors.position = 'Position is required'
    if (!userData.employeeTypes.trim()) newErrors.employeeTypes = 'Employee Type is required'

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleAddUser = () => {
    if (validateAllFields()) {
      console.log('New user data:', userData)
      handleClose()
      setUserData(initialUserData)

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
                placeholder='+91XXXXXXXXXX'
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
