'use client'

import React, { useEffect, useState } from 'react'

import { useParams, useRouter } from 'next/navigation'

import { Box, Button, Card, Typography, Stack, Grid } from '@mui/material'
import Swal from 'sweetalert2'

import Dropdown from '../../../../../../Custom-Cpmponents/Select-dropdown/dropdown'
import CustomTextInput from '../../../../../../Custom-Cpmponents/input/custominput'
import DatePickerInput from '../../../../../../Custom-Cpmponents/input/Datepickerinput'

interface UserData {
  id: number
  firstName: string
  lastName: string
  userId: string
  email: string
  contact: string
  contactNumber: string
  contactReference: string
  position: string
  company: string
  parentCompany: string
  clientName: string
  project: string
  employeeType: string
  activationDate: string
  endDate: string
  entitlements: string
}

const users = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  firstName: `First Name ${index + 1}`,
  lastName: `Last Name ${index + 1}`,
  userId: `P${String(index + 1).padStart(5, '0')}`,
  email: `user${index + 1}@example.com`,
  contact: `Contact ${index + 1}`,
  contactNumber: `+33-700-555-${String(200 + index)}`,
  company: `Company ${index + 1}`,
  position: [
    'Project Director',
    'Senior Developer',
    'Marketing Director',
    'Project Manager',
    'Product Manager',
    'Senior Designer'
  ][index % 6],
  parentCompany: ['FCC Construcción', 'TechCorp', 'DesignPro', 'FilmCo', 'BuildWorks'][index % 5],
  clientName: `Client ${index + 1}`,
  project: ['Project A', 'Project B', 'Project C', 'Project D'][index % 3],
  contactReference: `Contact Ref ${index + 1}`,
  employeeType: ['Full-Time', 'Part-Time', 'Locally Hired', 'Freelancer', 'Contractor'][index % 5],
  entitlements: ['Standard', 'Premium', 'Custom'][index % 5],
  activationDate: `2024-01-01`,
  endDate: `2024-12-31`
}))

const UserUpdate: React.FC = () => {
  const { slug } = useParams()
  const router = useRouter()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [errors, setErrors] = useState<{ [key in keyof UserData]?: string }>({})

  const entitlementOptions = ['Standard', 'Premium', 'Custom']
  const projectOptions = ['Project A', 'Project B', 'Project C', 'Project D']
  const employeeTypes = ['Full-Time', 'Part-Time', 'Locally Hired', 'Freelancer', 'Contractor']

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
    if (!userData?.parentCompany) newErrors.parentCompany = 'Parent Company is required'
    if (!userData?.clientName) newErrors.clientName = 'Client Name is required'
    if (!userData?.project) newErrors.project = 'Project is required'
    if (!userData?.contactReference) newErrors.contactReference = 'Contact Reference is required'
    if (!userData?.employeeType) newErrors.employeeType = 'Employee Type is required'
    if (!userData?.entitlements) newErrors.entitlements = 'Entitlements are required'
    if (!userData?.activationDate) newErrors.activationDate = 'Activation Date is required'
    if (!userData?.endDate) newErrors.endDate = 'End Date is required'

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

            {/* Position */}
            <Grid item xs={12} sm={4}>
              <CustomTextInput
                label='Position'
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
                required
              />
            </Grid>

            {/* Client Name */}
            <Grid item xs={12} sm={4}>
              <CustomTextInput
                label='Client Name'
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
              onClick={handleUpdate}
              sx={{
                backgroundColor: '#cbff8c',
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
