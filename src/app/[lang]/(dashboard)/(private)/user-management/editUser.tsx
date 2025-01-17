
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
      setProjectData(data);

      // Ensure position is always a string
      if (typeof data.position === 'string') {
        setTags(data.position); // Use the string directly
      } else {
        setTags(''); // Fallback to an empty string for non-string types
      }
    }
  }, [data]);

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

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
    });
    setTags(''); // Reset tags to an empty string
    setErrors({});
  };

  const handleSave = () => {
    const validationErrors: Record<string, string> = {};

    // Helper function to validate email
    const validateEmail = (email: string) => {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      return emailPattern.test(email)
    }

    // Helper function to validate phone number (Indian format)
    const validatePhone = (phone: string) => {
      const phonePattern = /^\d{10}$/
      return phonePattern.test(phone)
    }

    // Required field validation (use an array of required fields)
    const requiredFields: Array<keyof Project> = [
      'id',
      'firstname',
      'lastname',
      'email',
      'employeeId',
      'contact',
      'company',
      'employeeType'
    ]

    requiredFields.forEach(field => {
      if (!projectData[field]) {
        validationErrors[field] = `${capitalizeFirstLetter(field)} is required.`
      }
    })

    // Specific field validations
    if (projectData.email && !validateEmail(projectData.email)) {
      validationErrors.email = 'Please enter a valid email address.'
    }

    if (projectData.contact && !validatePhone(projectData.contact)) {
      validationErrors.contact = 'Please enter a valid phone number (e.g., +919876543210).'
    }

    // Skills validation (tags)
    if (!tags) {
      validationErrors.position = 'Position is required.'
    }

    // If there are validation errors, set them to the state and exit
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    // If validation passed, proceed with saving data
    const updatedProjectData = { ...projectData, position: tags }
    // Perform further actions with updatedProjectData if needed (e.g., API call)

    // Reset form after save
    resetForm();

    // Close the dialog
    setOpen(false);
  };

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
      if (value && errors[field]) {
        setErrors((prevErrors: { [x: string]: any }) => {
          const { [field]: _, ...rest } = prevErrors
          return rest
        })
      }

      return updatedData
    })
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
        Edit Project Information
        <Typography component='span' className='flex flex-col text-center'>
          Editing project details will initiate a privacy audit.
        </Typography>
      </DialogTitle>
      <form onSubmit={e => e.preventDefault()}>
        <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='h6' className='text-primary font-bold'>
                Project Details
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomTextInput
                label='Employee ID'
                placeholder='Employee ID'
                value={projectData.employeeId}
                onChange={e => handleInputChange('employeeId', e)}
                error={Boolean(errors.userId)}
                helperText={errors.userId}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomTextInput
                label='First Name'
                placeholder='First Name'
                value={projectData.firstname}
                onChange={value => handleInputChange('firstname', value)}
                error={Boolean(errors.firstName)}
                helperText={errors.firstName}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomTextInput
                label='Last Name'
                placeholder='Last Name'
                value={projectData.lastname}
                onChange={e => handleInputChange('lastname', e)}
                error={Boolean(errors.lastName)}
                helperText={errors.lastName}
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
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomTextInput
                label='Email'
                placeholder='Email'
                value={projectData.email}
                onChange={value => handleInputChange('email', value)}
                required
                error={Boolean(errors.email)}
                helperText={errors.email}
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
