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
import CustomTagInput from '@/app/Custom-Cpmponents/input/customtaginput'
import DialogCloseButton from '@/components/dialogs/DialogCloseButton'
import DatePickerInput from '@/app/Custom-Cpmponents/input/Datepickerinput'
import CustomFileUpload from '@/app/Custom-Cpmponents/Upload-file/CustomfileUpload'

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
  testingteam: string
  currency: string
  activation_date: string
  end_date: string
}

type EditUserInfoProps = {
  open: boolean
  setOpen: (open: boolean) => void
  data?: Project
}

const Activeprojectstatus = ({ open, setOpen, data }: EditUserInfoProps) => {
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
    testingteam: '',
    currency: '',
    activation_date: '',
    end_date: ''
  })

  const [tags, setTags] = useState<string[]>([])
  const [frontendtags, setfrontendTags] = useState<string[]>([])
  const [backendtags, setbackendTags] = useState<string[]>([])
  const [testingtags, settestingtagsTags] = useState<string[]>([])
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
      testingteam: '',
      currency: '',
      activation_date: '',
      end_date: ''
    })
  }

  const handleSave = () => {
    const updatedProjectData = { ...projectData, skills: tags }

    console.log('Saved Data:', updatedProjectData)
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
        Assign Team
        <Typography component='span' className='flex flex-col text-center'>
          Editing project details will initiate a privacy audit.
        </Typography>
      </DialogTitle>
      <form onSubmit={e => e.preventDefault()}>
        <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography variant='h6' className='mt-2 text-primary font-bold'>
                Assign Developers
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Dropdown
                label='Project Lead'
                options={['Anil', 'Vivek']}
                selectedOption={projectData.projectlead}
                onSelect={value => handleInputChange('projectlead', value)}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Dropdown
                label='Currency'
                options={['USD', 'EUR', 'RUB', 'INR']}
                selectedOption={projectData.currency}
                onSelect={value => handleInputChange('currency', value)}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <CustomTextInput
                label='Actual Project Amount'
                value={projectData.bidammount}
                onChange={value => handleInputChange('bidammount', value)}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <DatePickerInput
                label='Project Start Date'
                value={projectData.activation_date}
                onChange={value => handleInputChange('activation_date', value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <DatePickerInput
                label='Project Deadline'
                value={projectData.end_date}
                onChange={value => handleInputChange('end_date', value)}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
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
                placeholder='Frontend Developer'
                label='Frontend Developer'
                tags={frontendtags}
                onChange={setfrontendTags}
                options={['shivam', 'gaurav', 'niraj']}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <CustomTagInput
                label='Backend Developer'
                placeholder='Backend Developer'
                tags={backendtags}
                onChange={setbackendTags}
                options={['shivam', 'gaurav', 'niraj']}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
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

            <Grid item xs={12} sm={12}>
              <CustomTagInput
                label='Tech Skills'
                tags={tags}
                onChange={setTags}
                options={options}
                placeholder='Type a tag and press Enter'
                error={Boolean(errors.skills)}
                helperText={errors.skills}
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

export default Activeprojectstatus
