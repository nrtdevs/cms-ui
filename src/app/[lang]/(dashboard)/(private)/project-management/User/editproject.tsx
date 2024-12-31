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

type Project = {
  projectname: string
  platform: string
  projectdescription: string
  bidammount: string
  skills: string[]
  anotherField?: string
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
    anotherField: ''
  })

  const [tags, setTags] = useState<string[]>([])

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
      anotherField: ''
    })
  }

  const handleSave = () => {
    const updatedProjectData = { ...projectData, skills: tags }

    console.log('Saved Data:', updatedProjectData)
    setOpen(false)
  }

  const options = ['React', 'Node.js', 'Angular', 'Vue', 'JavaScript']

  const handleInputChange = (field: keyof Project, value: string) => {
    setProjectData(prevData => ({
      ...prevData,
      [field]: value
    }))
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
      <DialogTitle variant='h4' className='flex gap-2 flex-col text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
        Edit Project Information
        <Typography component='span' className='flex flex-col text-center'>
          Editing project details will initiate a privacy audit.
        </Typography>
      </DialogTitle>
      <form onSubmit={e => e.preventDefault()}>
        <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <CustomTextInput
                label='Project Name'
                value={projectData.projectname}
                onChange={e => handleInputChange('projectname', e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextInput
                label='Platform'
                value={projectData.platform}
                onChange={e => handleInputChange('platform', e)}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextInput
                label='Project Description'
                value={projectData.projectdescription}
                onChange={e => handleInputChange('projectdescription', e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextInput
                label='Bid Amount'
                value={projectData.bidammount}
                onChange={value => handleInputChange('bidammount', value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTagInput
                label='Skills'
                tags={tags}
                onChange={setTags}
                options={options}
                placeholder='Type a tag and press Enter'
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
