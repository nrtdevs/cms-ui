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

import Swal from 'sweetalert2'
import CustomTextInput from '@/app/Custom-Cpmponents/input/custominput'
import CustomTagInput from '@/app/Custom-Cpmponents/input/customtaginput'
import DialogCloseButton from '@/components/dialogs/DialogCloseButton'
import DatePickerInput from '@/app/Custom-Cpmponents/input/Datepickerinput'
import CustomFileUpload from '@/app/Custom-Cpmponents/Upload-file/CustomfileUpload'
import CustomDescriptionInput from '@/app/Custom-Cpmponents/input/customdescriptioinput'
import Dropdown from '@/app/Custom-Cpmponents/Select-dropdown/dropdown'

type Project = {
  projectname: string
  platform: string
  projectdescription: string
  bidammount: string
  skills: string[]
  anotherField?: string
  bid_date: string
  clientname: string
  clientemail: string
  clientcontact: string
  clientcompany: string
  status: string
  projectlead: string
  frontenddev: string
  backenddev: string
  currency: string
  clientlocation: string
  commission: string
}

type EditUserInfoProps = {
  open: boolean
  setOpen: (open: boolean) => void
  data?: Project
}

const EditprojectInfo = ({ open, setOpen, data }: EditUserInfoProps) => {
  const [projectData, setProjectData] = useState<Project>({
    projectname: '',
    platform: '',
    projectdescription: '',
    bidammount: '',
    skills: [],
    anotherField: '',
    bid_date: '',
    clientname: '',
    clientemail: '',
    clientcontact: '',
    clientcompany: '',
    status: '',
    projectlead: '',
    frontenddev: '',
    backenddev: '',
    currency: '',
    clientlocation: '',
    commission: ''
  })

  const [tags, setTags] = useState<string[]>([])

  const [file, setFile] = useState<File | null>(null) // Define the file state
  const [errors, setErrors] = useState<any>({})

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile) // Update file state
  }

  useEffect(() => {
    if (data) {
      setProjectData(data)
      setTags(data.skills || [])
    }
  }, [data])

  const handleClose = () => {
    setOpen(false)
    setProjectData({
      projectname: '',
      platform: '',
      projectdescription: '',
      bidammount: '',
      skills: [],
      anotherField: '',
      bid_date: '',
      clientname: '',
      clientemail: '',
      clientcontact: '',
      clientcompany: '',
      status: '',
      projectlead: '',
      frontenddev: '',
      backenddev: '',
      currency: '',
      clientlocation: '',
      commission: ''
    })
  }

  const handleSave = () => {
    // Validate required fields
    console.log('enter updated:')

    const validationErrors: any = {}

    // Check required fields
    if (!projectData.projectname.trim()) validationErrors.projectname = 'Project name is required.'
    if (!projectData.platform.trim()) validationErrors.platform = 'Platform is required.'
    if (!projectData.clientname.trim()) validationErrors.clientname = 'Client name is required.'
    if (!projectData.clientemail.trim()) validationErrors.clientemail = 'Client email is required.'
    if (!projectData.clientcontact.trim()) validationErrors.clientcontact = 'Client contact is required.'
    if (!projectData.projectdescription) validationErrors.projectdescription = 'Project description is required.'
    if (!projectData.bidammount) validationErrors.bidammount = 'Bidiing Amnt is required.'

    if (!projectData.clientlocation.trim()) validationErrors.clientlocation = 'Location is required.'
    if (!projectData.commission) validationErrors.commission = 'Please Select.'

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if (projectData.clientemail && !emailPattern.test(projectData.clientemail)) {
      validationErrors.clientemail = 'Please enter a valid email address.'
    }

    // Phone number validation (assuming Indian phone number format as an example)
    const phonePattern = /^\+([1-9]{1}[0-9]{1,2})\d{10}$/

    if (projectData.clientcontact && !phonePattern.test(projectData.clientcontact)) {
      validationErrors.clientcontact = 'Invalid phone number'
    }
    // Bid Date validation
    if (!projectData.bid_date) {
      validationErrors.bid_date = 'Bid date is required.'
    } else if (new Date(projectData.bid_date).toString() === 'Invalid Date') {
      validationErrors.bid_date = 'Please enter a valid date.'
    }


    // If there are validation errors, set them to the state
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    const updatedProjectData = { ...projectData, skills: tags }
    console.log('updatedProjectData', updatedProjectData)

    Swal.fire({
      title: 'Success!',
      text: 'Finance details added successfully!',
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

    setOpen(false)
  }

  const options = ['React', 'Node.js', 'Angular', 'Vue', 'JavaScript']

  const handleInputChange = (field: keyof Project, value: string) => {
    setProjectData(prevData => {
      const updatedData = {
        ...prevData,
        [field]: value
      }

      // Clear the error if the field is filled
      if (value && errors[field]) {
        setErrors((prevErrors: any) => {
          const updatedErrors = { ...prevErrors }
          delete updatedErrors[field]
          return updatedErrors
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
        Edit Bid Information
        <Typography component='span' className='flex flex-col text-center'>
          Editing bid details will initiate a privacy audit.
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
            <Grid item xs={12} sm={3}>
              <CustomTextInput
                label='Project Name'
                placeholder='Project Name'
                value={projectData.projectname}
                onChange={e => handleInputChange('projectname', e)}
                error={Boolean(errors.projectname)}
                helperText={errors.projectname}
              />
            </Grid>

            <Grid item xs={12} sm={2}>
              <Dropdown
                label='Currency'
                options={['USD', 'EUR', 'RUB', 'INR']}
                selectedOption={projectData.currency}
                onSelect={value => handleInputChange('currency', value)}
                required
                error={Boolean(errors.bidammount)}
                helperText={errors.bidammount}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <CustomTextInput
                label='Bid Amount'
                placeholder='Bid Amount'
                value={projectData.bidammount}
                onChange={value => handleInputChange('bidammount', value)}
                required
                error={Boolean(errors.bidammount)}
                helperText={errors.bidammount}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <CustomTextInput
                label='Platform'
                placeholder='Platform'
                value={projectData.platform}
                onChange={e => handleInputChange('platform', e)}
                error={Boolean(errors.platform)}
                helperText={errors.platform}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <DatePickerInput
                label='Bid Date'
                type='date'
                value={projectData.bid_date}
                onChange={value => handleInputChange('bid_date', value)}
                required
                error={Boolean(errors.bid_date)}
                helperText={errors.bid_date}
              />
            </Grid>

            {/* Commission DropDown */}

            <Grid item xs={12} sm={2}>
              <Dropdown
                label='Commission'
                options={['Yes', 'No']}
                selectedOption={projectData.commission}
                onSelect={value => handleInputChange('commission', value)}
                required
                error={Boolean(errors.commission)}
                helperText={errors.commission}
              />
            </Grid>

            {/* <Grid item xs={12} sm={4}>
              <CustomFileUpload
                label='Upload Project File'
                onChange={handleFileChange}
                fileName={file ? file.name : ''}
                error={file === null}
                helperText={file === null ? 'Please upload a file.' : ''}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <CustomTagInput
                label='Skills'
                tags={tags}
                onChange={setTags}
                options={options}
                placeholder='Type a tag and press Enter'
                error={Boolean(errors.skills)}
                helperText={errors.skills}
              />
            </Grid> */}

            <Grid item xs={12}>
              <Typography variant='h6' className='mt-2 text-primary font-bold'>
                Client Details
              </Typography>
            </Grid>

            <Grid item xs={12} sm={3}>
              <CustomTextInput
                label='Client Name'
                placeholder='Client Name'
                value={projectData.clientname}
                onChange={value => handleInputChange('clientname', value)}
                required
                error={Boolean(errors.clientname)}
                helperText={errors.clientname}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <CustomTextInput
                placeholder='Client Email'
                label='Client Email'
                value={projectData.clientemail}
                onChange={value => handleInputChange('clientemail', value)}
                required
                error={Boolean(errors.clientemail)}
                helperText={errors.clientemail}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <CustomTextInput
                label='Client Contact'
                placeholder='+919874561230'
                value={projectData.clientcontact}
                onChange={value => handleInputChange('clientcontact', value)}
                required
                error={Boolean(errors.clientcontact)}
                helperText={errors.clientcontact}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <CustomTextInput
                label='Client Company'
                placeholder='Client Company'
                value={projectData.clientcompany}
                onChange={value => handleInputChange('clientcompany', value)}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <CustomTextInput
                label='Client Location'
                placeholder='Client Location'
                value={projectData.clientlocation}
                onChange={value => handleInputChange('clientlocation', value)}
                required
                error={Boolean(errors.clientlocation)}
                helperText={errors.clientlocation}
              />
            </Grid>

            <Grid item xs={12}>
              <CustomDescriptionInput
                label='Project Description'
                placeholder='Project Description'
                value={projectData.projectdescription}
                onChange={e => handleInputChange('projectdescription', e)}
                required
                error={Boolean(errors.projectdescription)}
                helperText={errors.projectdescription}
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

export default EditprojectInfo
