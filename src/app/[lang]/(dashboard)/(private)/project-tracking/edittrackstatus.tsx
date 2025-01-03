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

import CustomTextInput from '@/app/Custom-Cpmponents/input/custominput'
import DialogCloseButton from '@/components/dialogs/DialogCloseButton'
import CustomFileUpload from '@/app/Custom-Cpmponents/Upload-file/CustomfileUpload'
import Dropdown from '@/app/Custom-Cpmponents/Select-dropdown/dropdown'
import CustomTagInput from '@/app/Custom-Cpmponents/input/customtaginput'
import DatePickerInput from '@/app/Custom-Cpmponents/input/Datepickerinput'

type Project = {
  projectname: string
  platform: string
  projectdescription: string
  Actualbidammount: string
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
  Projectstartdate: string
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
    Actualbidammount: '',
    skills: [],
    Projectstartdate: '',
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
  const [frontendtags, setfrontendTags] = useState<string[]>([])
  const [backendtags, setbackendTags] = useState<string[]>([])
  const [testingtags, settestingtagsTags] = useState<string[]>([])
  const [file, setFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<any>({})

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile)
  }

  useEffect(() => {
    if (data) {
      setProjectData(data)
      setTags(data.skills)
      setfrontendTags(data.frontenddev)
      setbackendTags(data.backenddev)
      settestingtagsTags(data.testingteam)
    }
  }, [data])

  const formvalidation = (): boolean => {
    const validationErrors: any = {}

    if (!projectData.projectname) validationErrors.projectname = 'Project name is required.'

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)

      return false // Return false if there are errors
    }

    return true // Return true if there are no errors
  }

  const handleClose = () => {
    setOpen(false)
    setProjectData({
      projectname: '',
      platform: '',
      projectdescription: '',
      Actualbidammount: '',
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
      end_date: '',
      Projectstartdate: ''
    })
    setTags([])
    setfrontendTags([])
    setbackendTags([])
    settestingtagsTags([])
    setFile(null)
    setErrors({})
  }

  console.log('Project Data:', projectData)

  const handleSave = () => {
    if (formvalidation()) {
      const updatedProjectData = {
        ...projectData,
        skills: tags,
        frontenddev: frontendtags,
        backenddev: backendtags,
        testingteam: testingtags
      }

      console.log('Saved Data:', updatedProjectData)
      setOpen(false)
    }
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
        Edit Tracking Information
      </DialogTitle>
      <form onSubmit={e => e.preventDefault()}>
        <DialogContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={3}>
              <CustomTextInput
                label='Project'
                value={projectData.projectname}
                onChange={value => handleInputChange('projectname', value)}
                error={Boolean(errors.projectname)}
                helperText={errors.projectname}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Dropdown
                label='Status'
                options={['In Progress', 'Active', 'On-Hold', 'Cancelled']}
                selectedOption={projectData.status}
                onSelect={value => handleInputChange('status', value)}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <Dropdown
                label='Currency'
                options={['USD', 'EUR', 'RUB', 'INR']}
                selectedOption={projectData.currency}
                onSelect={value => handleInputChange('currency', value)}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <CustomTextInput
                label='Total Budget'
                value={projectData.Actualbidammount}
                onChange={value => handleInputChange('Actualbidammount', value)}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <DatePickerInput
                label='Start Date'
                value={projectData.activation_date}
                onChange={value => handleInputChange('activation_date', value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <DatePickerInput
                label='Deadline'
                value={projectData.end_date}
                onChange={value => handleInputChange('end_date', value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Dropdown
                label='Tech Lead'
                options={['Anil', 'Vivek']}
                selectedOption={projectData.projectlead}
                onSelect={value => handleInputChange('projectlead', value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomTagInput
                placeholder='Frontend Developer'
                label='Frontend Developer'
                tags={frontendtags}
                onChange={setfrontendTags}
                options={['shivam', 'gaurav', 'niraj']}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTagInput
                label='Backend Developer'
                placeholder='Backend Developer'
                tags={backendtags}
                onChange={setbackendTags}
                options={['shivam', 'gaurav', 'niraj']}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomTagInput
                label='Testing Team'
                tags={testingtags}
                onChange={settestingtagsTags}
                options={['Akash']}
                placeholder='Type a tag and press Enter'
                error={Boolean(errors.testingteam)}
                helperText={errors.testingteam}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomTagInput
                label='Tech Stack'
                tags={tags}
                onChange={setTags}
                options={[]}
                placeholder='Type a tag and press Enter'
                error={Boolean(errors.skills)}
                helperText={errors.skills}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <CustomFileUpload label='Upload File' onChange={handleFileChange} fileName={file ? file.name : ''} />
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
