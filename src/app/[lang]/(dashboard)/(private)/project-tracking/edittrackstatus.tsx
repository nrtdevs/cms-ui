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

// Custom Component Imports
import CustomTextInput from '@/app/Custom-Cpmponents/input/custominput'
import DialogCloseButton from '@/components/dialogs/DialogCloseButton'
import CustomFileUpload from '@/app/Custom-Cpmponents/Upload-file/CustomfileUpload'
import Dropdown from '@/app/Custom-Cpmponents/Select-dropdown/dropdown'
import CustomTagInput from '@/app/Custom-Cpmponents/input/customtaginput'

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
  frontenddev: string[]
  backenddev: string[]
  currency: string
  clientcountry: string
  activation_date: string
  testingteam: string[]
  end_date: string
}

type EditUserInfoProps = {
  open: boolean
  setOpen: (open: boolean) => void
  data?: Project
}

const EditTrackStatus = ({ open, setOpen, data }: EditUserInfoProps) => {
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
    frontenddev: [],
    backenddev: [],
    testingteam: [],
    currency: '',
    activation_date: '',
    clientcountry: '',
    end_date: ''
  })

  const [tags, setTags] = useState<string[]>([])
  const [frontendTags, setFrontendTags] = useState<string[]>([])
  const [backendTags, setBackendTags] = useState<string[]>([])
  const [testingTags, setTestingTags] = useState<string[]>([])
  const [file, setFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<any>({})

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile)
  }

  useEffect(() => {
    if (data) {
      setProjectData(data)
      setTags(data.skills)
      setFrontendTags(data.frontenddev)
      setBackendTags(data.backenddev)
      setTestingTags(data.testingteam)
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
      frontenddev: [],
      backenddev: [],
      testingteam: [],
      currency: '',
      activation_date: '',
      clientcountry: '',
      end_date: ''
    })
    setTags([])
    setFrontendTags([])
    setBackendTags([])
    setTestingTags([])
    setFile(null)
    setErrors({})
  }

  const handleSave = () => {
    const validationErrors: any = {}

    if (!projectData.projectname) validationErrors.projectname = 'Project name is required.'
    if (!projectData.platform) validationErrors.platform = 'Platform is required.'
    if (!projectData.clientname) validationErrors.clientname = 'Client name is required.'
    if (!projectData.clientemail) validationErrors.clientemail = 'Client email is required.'
    if (!projectData.clientcontact) validationErrors.clientcontact = 'Client contact is required.'
    if (!projectData.projectdescription) validationErrors.projectdescription = 'Project description is required.'
    if (!projectData.bidammount) validationErrors.bidammount = 'Bid amount is required.'

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if (projectData.clientemail && !emailPattern.test(projectData.clientemail)) {
      validationErrors.clientemail = 'Please enter a valid email address.'
    }

    const phonePattern = /^[+91]\d{10}$/

    if (projectData.clientcontact && !phonePattern.test(projectData.clientcontact)) {
      validationErrors.clientcontact = 'Please enter a valid phone number (e.g., +919876543210).'
    }

    if (tags.length === 0) validationErrors.skills = 'At least one skill is required.'
    if (!projectData.bid_date) validationErrors.bid_date = 'Bid date is required.'

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)

      return
    }

    const updatedProjectData = {
      ...projectData,
      skills: tags,
      frontenddev: frontendTags,
      backenddev: backendTags,
      testingteam: testingTags
    }

    console.log('Saved Data:', updatedProjectData)
    setOpen(false)
  }

  const handleInputChange = (field: keyof Project, value: string) => {
    setProjectData(prevData => ({
      ...prevData,
      [field]: value
    }))
    setErrors((prevErrors: any) => {
      const updatedErrors = { ...prevErrors }

      delete updatedErrors[field]

      return updatedErrors
    })
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='md' fullWidth>
      <DialogCloseButton onClick={handleClose} />
      <DialogTitle>Edit Project Information</DialogTitle>
      <form onSubmit={e => e.preventDefault()}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={10} sm={4}>
              <CustomTextInput
                label='Project Name'
                value={projectData.projectname}
                onChange={value => handleInputChange('projectname', value)}
                error={Boolean(errors.projectname)}
                helperText={errors.projectname}
              />
            </Grid>
            <Grid item xs={10} sm={3}>
              <Dropdown
                label='Platform'
                options={['Web', 'Mobile', 'Desktop']}
                selectedOption={projectData.platform}
                onSelect={value => handleInputChange('platform', value)}
                error={Boolean(errors.platform)}
                helperText={errors.platform}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <CustomFileUpload
                label='Upload Project File'
                onChange={handleFileChange}
                fileName={file ? file.name : ''}
                error={!file}
                helperText={!file ? 'Please upload a file.' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextInput
                label='Project Description'
                value={projectData.projectdescription}
                onChange={value => handleInputChange('projectdescription', value)}
                error={Boolean(errors.projectdescription)}
                helperText={errors.projectdescription}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTagInput
                label='Tech Stack'
                tags={tags}
                onChange={setTags}
                options={['React', 'Node.js', 'Angular']}
                placeholder='Add a skill'
                error={Boolean(errors.skills)}
                helperText={errors.skills}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={handleSave}>
            Save
          </Button>
          <Button variant='outlined' onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default EditTrackStatus
