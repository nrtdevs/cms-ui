'use client'

import React, { useEffect, useState } from 'react'

import { useParams, useRouter } from 'next/navigation'

import { Box, Button, Card, Typography, Stack, Grid } from '@mui/material'
import Swal from 'sweetalert2'
import Dropdown from '../../../../../../Custom-Cpmponents/Select-dropdown/dropdown'

import CustomTextInput from '../../../../../../Custom-Cpmponents/input/custominput'

interface UserData {
  id: number
  firstName: string
  lastName: string
  userId: string
  email: string
  contactNumber: string
  position: string
  positionTypes: string
}
const positionTypes = [
  'Project Director',
  'Senior Developer',
  'Marketing Director',
  'Project Manager',
  'Product Manager',
  'Senior Designer'
]

const users = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  firstName: `First Name ${index + 1}`,
  lastName: `Last Name ${index + 1}`,
  userId: `P${String(index + 1).padStart(5, '0')}`,
  email: `user${index + 1}@example.com`,
  contactNumber: `+33-700-555-${String(200 + index)}`,

  position: [
    'Project Director',
    'Senior Developer',
    'Marketing Director',
    'Project Manager',
    'Product Manager',
    'Senior Designer'
  ][index % 6]
}))

const UserUpdate: React.FC = () => {
  const { slug } = useParams()
  const router = useRouter()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [errors, setErrors] = useState<{ [key in keyof UserData]?: string }>({})

  useEffect(() => {
    const user = users.find(user => user.userId === String(slug))

    setUserData(user || null)
  }, [slug])

  const handleInputChange = (field: keyof UserData, value: string) => {
    if (userData) {
      setUserData(prevData => ({
        ...prevData!,
        [field]: value
      }))
    }
  }

  const handleValidation = () => {
    const newErrors: { [key in keyof UserData]?: string } = {}

    if (!userData?.firstName) newErrors.firstName = 'First Name is required'
    if (!userData?.lastName) newErrors.lastName = 'Last Name is required'
    if (!userData?.userId) newErrors.userId = 'User ID is required'
    if (!userData?.email) newErrors.email = 'Email is required'
    if (!userData?.contactNumber) newErrors.contactNumber = 'Contact Number is required'
    if (!userData?.position) newErrors.position = 'Position is required'

    // Simple email format validation
    if (userData?.email && !/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = 'Invalid email format'
    }

    // Simple contact number format validation (example)
    if (userData?.contactNumber && !/^\+33-\d{3}-\d{3}-\d{3}$/.test(userData.contactNumber)) {
      newErrors.contactNumber = 'Invalid contact number format (+33-xxx-xxx-xxx)'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleUpdate = () => {
    if (handleValidation()) {
      console.log('Updated user data:', userData)
      Swal.fire({
        title: 'Success!',
        text: 'User updated successfully!',
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
        router.push('/user-management')
      })
    }
  }

  if (!userData) {
    return (
      <Box className='container mx-auto p-6'>
        <Typography variant='h6' color='error'>
          User not found.
        </Typography>
      </Box>
    )
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
          onClick={() => router.push('/user-management')}
        >
          <i className='tabler-arrow-narrow-left text-base p-3 text-primary font-120'></i>
        </Box>

        <Typography variant='h4' className='font-bold text-primary ml-3'>
          Update User - {slug}
        </Typography>
      </Grid>

      <Card className='p-20 shadow-lg'>
        <Stack spacing={5}>
          <Grid container spacing={6}>
            {/* First Name */}
            <Grid item xs={12} sm={4}>
              <CustomTextInput
                label='First Name'
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
                label='Contact Number'
                value={userData.contactNumber}
                onChange={value => handleInputChange('contactNumber', value)}
                error={!!errors.contactNumber}
                helperText={errors.contactNumber}
                required
              />
            </Grid>

            {/*  position  */}

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
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant='contained'
              className='bg-primary '
              onClick={handleUpdate}
              sx={{
                fontWeight: '600'
              }}
            >
              Update User
            </Button>
          </Box>
        </Stack>
      </Card>
    </Box>
  )
}

export default UserUpdate
