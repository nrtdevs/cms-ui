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
import Typography from '@mui/material/Typography'
import CustomTextInput from '@/app/Custom-Cpmponents/input/custominput'
import DialogCloseButton from '@/components/dialogs/DialogCloseButton'
import Dropdown from '@/app/Custom-Cpmponents/Select-dropdown/dropdown'

import Swal from 'sweetalert2'

// Regex for validation (defined once)
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA009]{2,}$/
const contactNumberRegex = /^\+91\s?\d{10}$/ // Allowing space before 10 digits

interface Project {
  id: string
  firstname: string
  lastname: string
  email: string
  employeeId: string
  contact: string
  position: string
  company: string
  employeeType: string
}

type EditUserInfoProps = {
  open: boolean
  setOpen: (open: boolean) => void
  data?: Project
}

const EditUserInfo = ({ open, setOpen, data }: EditUserInfoProps) => {
  const [projectData, setProjectData] = useState<Project>({
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    employeeId: '',
    contact: '',
    position: '',
    company: '',
    employeeType: ''
  })

  const [tags, setTags] = useState<string>('') // Updated to be a string instead of an array
  const [file, setFile] = useState<File | null>(null) // Define the file state
  const [errors, setErrors] = useState<any>({})

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile) // Update file state
  }

  useEffect(() => {
    if (data) {
      setProjectData(data)

      // Ensure position is always a string
      if (typeof data.position === 'string') {
        setTags(data.position) // Use the string directly
      } else {
        setTags('') // Fallback to an empty string for non-string types
      }
    }
  }, [data])

  const handleClose = () => {
    setOpen(false)
    resetForm()
  }

  const resetForm = () => {
    setProjectData({
      id: '',
      firstname: '',
      lastname: '',
      email: '',
      employeeId: '',
      contact: '',
      position: '',
      company: '',
      employeeType: ''
    })
    setTags('') // Reset tags to an empty string
    setErrors({})
  }

  const validateField = (field: keyof Project, value: string) => {
    let error = ''
    const trimmedValue = value.trim() // Trim leading and trailing spaces
    // Validate required fields
    if (!trimmedValue) {
      error = `${capitalizeFirstLetter(field)} is required.`
    }

    // Email validation
    if (field === 'email' && trimmedValue && !emailRegex.test(trimmedValue)) {
      error = 'Invalid email format'
    }

    // Contact number validation
    if (field === 'contact' && trimmedValue && !contactNumberRegex.test(trimmedValue.replace(/\s/g, ''))) {
      error = 'Invalid contact number'
    }

    setErrors((prevErrors: { [key: string]: string }) => ({
      ...prevErrors,
      [field]: error
    }))
  }

  const validateAllFields = () => {
    const newErrors: { [key in keyof Project]?: string } = {}

    // Validate required fields
    if (!projectData.firstname.trim()) newErrors.firstname = 'First Name is required'
    if (!projectData.lastname.trim()) newErrors.lastname = 'Last Name is required'
    if (!projectData.employeeId.trim()) newErrors.employeeId = 'Employee ID is required'
    if (!projectData.email.trim()) newErrors.email = 'Email is required'
    else if (!emailRegex.test(projectData.email.trim())) newErrors.email = 'Invalid email format'
    if (!projectData.contact.trim()) newErrors.contact = 'Contact Number is required'
    else if (!contactNumberRegex.test(projectData.contact.trim().replace(/\s/g, '')))
      newErrors.contact = 'Invalid contact number'
    if (!projectData.company.trim()) newErrors.company = 'Company is required'
    if (!projectData.employeeType.trim()) newErrors.employeeType = 'Employee Type is required'
    if (!tags.trim()) newErrors.position = 'Position is required'

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    // Validate all fields before saving
    if (validateAllFields()) {
      const updatedProjectData = {
        ...projectData,
        position: tags.trim() // Ensure the position is trimmed
      }

      // Reset form after save
      resetForm()

      // Close the dialog
      setOpen(false)
    }
  }

  // Utility function to capitalize the first letter of each word (for dynamic error messages)
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const options = [
    'Project Director',
    'Senior Developer',
    'Marketing Director',
    'Project Manager',
    'Product Manager',
    'Senior Designer'
  ]

  const handleInputChange = (field: keyof Project, value: string) => {
    setProjectData(prevData => {
      const updatedData = {
        ...prevData,
        [field]: value
      }

      // Clear the error if the field is filled
      if (value.trim() && errors[field]) {
        setErrors((prevErrors: { [x: string]: any }) => {
          const { [field]: _, ...rest } = prevErrors
          return rest
        })
      }
      console.log('Updated Project Data:', updatedData)

      Swal.fire({
        title: 'Success!',
        text: 'User edit successfully!',
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

      return updatedData
    })

    // Validate individual field
    validateField(field, value)
  }

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      maxWidth='md'
      scroll='body'
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
        <i className='tabler-x' />
      </DialogCloseButton>
      <DialogTitle variant='h4' className='flex gap-2 flex-col text-primary text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
        Edit User Information
        <Typography component='span' className='flex flex-col text-center'>
          Editing user details will initiate a privacy audit.
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

            <Grid item xs={12} sm={6}>
              <CustomTextInput
                label='Employee ID'
                placeholder='Employee ID'
                value={projectData.employeeId}
                onChange={e => handleInputChange('employeeId', e)}
                error={Boolean(errors.employeeId)}
                helperText={errors.employeeId}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomTextInput
                label='First Name'
                placeholder='First Name'
                value={projectData.firstname}
                onChange={value => handleInputChange('firstname', value)}
                error={Boolean(errors.firstname)}
                helperText={errors.firstname}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomTextInput
                label='Last Name'
                placeholder='Last Name'
                value={projectData.lastname}
                onChange={e => handleInputChange('lastname', e)}
                error={Boolean(errors.lastname)}
                helperText={errors.lastname}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomTextInput
                label='Company'
                placeholder='Company'
                value={projectData.company}
                onChange={value => handleInputChange('company', value)}
                error={Boolean(errors.company)}
                helperText={errors.company}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomTextInput
                label='Employee Type'
                placeholder='Employee Type'
                value={projectData.employeeType}
                onChange={value => handleInputChange('employeeType', value)}
                error={Boolean(errors.employeeType)}
                helperText={errors.employeeType}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Dropdown
                label='Position Types'
                onSelect={e => handleInputChange('position', e)}
                options={options}
                selectedOption={projectData.position}
                error={Boolean(errors.position)}
                helperText={errors.position}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomTextInput
                label='Email'
                placeholder='Email'
                value={projectData.email}
                onChange={value => handleInputChange('email', value)}
                error={Boolean(errors.email)}
                helperText={errors.email}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomTextInput
                label='Contact Number'
                placeholder='Contact Number'
                value={projectData.contact}
                onChange={e => handleInputChange('contact', e)}
                error={Boolean(errors.contact)}
                helperText={errors.contact}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
          <Button variant='contained' onClick={handleSave} type='submit'>
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

export default EditUserInfo
