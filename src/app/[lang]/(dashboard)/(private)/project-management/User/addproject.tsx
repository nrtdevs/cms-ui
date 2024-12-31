import React, { useState } from 'react'

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, Typography } from '@mui/material'

import CustomTagInput from '@/app/Custom-Cpmponents/input/customtaginput'
import CustomTextInput from '@/app/Custom-Cpmponents/input/custominput'
import DatePickerInput from '@/app/Custom-Cpmponents/input/Datepickerinput'
import CustomDescriptionInput from '@/app/Custom-Cpmponents/input/customdescriptioinput'
import CustomFileUpload from '@/app/Custom-Cpmponents/Upload-file/CustomfileUpload'

interface AddProjectInfoProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const AddProjectInfo: React.FC<AddProjectInfoProps> = ({ open, setOpen }) => {
  const [project, setProject] = useState<{
    projectname: string
    projectdescription: string
    skills: string[]
    bidammount: string
    platform: string
    bid_date: string
    activation_date: string
    end_date: string
    clientname: string
    clientemail: string
    clientcontact: string
    clientcompany: string
    status: string
  }>({
    projectname: '',
    projectdescription: '',
    skills: [],
    bidammount: '',
    platform: '',
    bid_date: '',
    activation_date: '',
    end_date: '',
    clientname: '',
    clientemail: '',
    clientcontact: '',
    clientcompany: '',
    status: ''
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({}) // Track errors
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [file, setFile] = useState<File | null>(null) // Define the file state

  const options = ['React', 'Node.js', 'Angular', 'Vue', 'JavaScript']

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile) // Update file state
  }

  const handleChange = (name: string, value: string) => {
    setProject(prev => ({
      ...prev,
      [name]: value
    }))

    // Remove error if field is filled
    if (value && errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }))
    }
  }

  const validateEmail = (email: string) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/

    return emailPattern.test(email)
  }

  const validatePhoneNumber = (phone: string) => {
    const phonePattern = /^\+([1-9]{1}[0-9]{1,2})\d{10}$/ // Country code followed by 10 digit number

    return phonePattern.test(phone)
  }

  const handleSave = () => {
    const newErrors: { [key: string]: string } = {}

    // Validate required fields
    if (!project.projectname) newErrors.projectname = 'Project Name is required'
    if (!project.bidammount) newErrors.bidammount = 'Bid Amount is required'
    if (!project.clientname) newErrors.clientname = 'Client Name is required'
    if (!project.clientcontact) newErrors.clientcontact = 'Client Contact is required'

    if (!project.clientemail) {
      newErrors.clientemail = 'Client Email is required'
    } else if (!validateEmail(project.clientemail)) {
      newErrors.clientemail = 'Valid Client Email is required'
    }

    if (!project.clientcontact || !validatePhoneNumber(project.clientcontact))
      newErrors.clientcontact = 'Valid Client Contact with country code is required'
    if (!project.bid_date) newErrors.bid_date = 'Bid Date is required' // Error for Bid Date
    if (project.skills.length === 0) newErrors.skills = 'At least one skill is required' // Error for Skills

    // If errors exist, set them in the state
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsSubmitted(true)

      return
    }

    console.log({
      ...project,
      skills: project.skills
    })

    setOpen(false)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSkillsChange = (newSkills: string[]) => {
    setProject(prev => ({
      ...prev,
      skills: newSkills
    }))

    // Remove error for skills if any skill is added
    if (newSkills.length > 0 && errors.skills) {
      setErrors(prevErrors => ({
        ...prevErrors,
        skills: ''
      }))
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='md'>
      <DialogTitle variant='h4' className='flex gap-2 flex-col text-primary text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
        Add Project Information
        <Typography component='span' className='flex flex-col text-center'>
          Please enter the details for the new project.
        </Typography>
      </DialogTitle>
      <form onSubmit={e => e.preventDefault()}>
        <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
          <Grid container spacing={5}>
            {/* Project Details Section */}
            <Grid item xs={12}>
              <Typography variant='h6' className='text-primary font-bold'>
                Project Details
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextInput
                label='Project Name'
                placeholder='Project Name'
                value={project.projectname}
                required
                onChange={value => handleChange('projectname', value)}
                error={isSubmitted && !!errors.projectname} // Show error if submitted
                helperText={isSubmitted && errors.projectname ? errors.projectname : undefined} // Show error message if exists
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomTagInput
                label='Skills'
                tags={project.skills}
                onChange={handleSkillsChange}
                options={options}
                placeholder='Type a tag and press Enter'
                required
                error={isSubmitted && !!errors.skills} // Show error if no skills
                helperText={isSubmitted && errors.skills ? errors.skills : undefined}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomTextInput
                label='Bid Amount'
                placeholder='Bid Amount'
                type='number'
                value={project.bidammount}
                onChange={value => handleChange('bidammount', value)}
                required
                error={isSubmitted && !!errors.bidammount}
                helperText={isSubmitted && errors.bidammount ? errors.bidammount : undefined}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomTextInput
                label='Platform'
                placeholder='Platform'
                value={project.platform}
                onChange={value => handleChange('platform', value)}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <DatePickerInput
                label='Bid Date'
                type='date'
                value={project.bid_date}
                onChange={value => handleChange('bid_date', value)}
                required
                error={isSubmitted && !!errors.bid_date} // Show error if bid date is empty
                helperText={isSubmitted && errors.bid_date ? errors.bid_date : undefined}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomFileUpload
                label='Upload Project File'
                onChange={handleFileChange}
                fileName={file ? file.name : ''}
                error={file === null}
                helperText={file === null ? 'Please upload a file.' : ''}
              />
            </Grid>

            {/* Client Details Section */}
            <Grid item xs={12}>
              <Typography variant='h6' className='mt-2 text-primary font-bold'>
                Client Details
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextInput
                label='Client Name'
                placeholder='Client Name'
                value={project.clientname}
                onChange={value => handleChange('clientname', value)}
                required
                error={isSubmitted && !!errors.clientname}
                helperText={isSubmitted && errors.clientname ? errors.clientname : undefined}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextInput
                placeholder='Client Email'
                label='Client Email'
                value={project.clientemail}
                onChange={value => handleChange('clientemail', value)}
                required
                error={isSubmitted && !!errors.clientemail}
                helperText={isSubmitted && errors.clientemail ? errors.clientemail : undefined} // Show error for invalid or missing email
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextInput
                label='Client Contact'
                placeholder='+919874561230'
                value={project.clientcontact}
                onChange={value => handleChange('clientcontact', value)}
                required
                error={isSubmitted && !!errors.clientcontact}
                helperText={isSubmitted && errors.clientcontact ? errors.clientcontact : undefined}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextInput
                label='Client Company'
                placeholder='Client Company'
                value={project.clientcompany}
                onChange={value => handleChange('clientcompany', value)}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomDescriptionInput
                label='Project Description'
                placeholder='Project Description'
                value={project.projectdescription}
                onChange={value => handleChange('projectdescription', value)}
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

export default AddProjectInfo
