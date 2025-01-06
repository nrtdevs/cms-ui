import React, { useState } from 'react'

import { Button, Tabs, Tab, Box, Typography, TableContainer, Paper, Grid } from '@mui/material'

import SprintEditDialog from './admin/editprojectsprint'
import OpenDialogOnElementClick from '@/app/Custom-Cpmponents/Buttons/OpenDialogOnElementClick'

interface ViewTrackStatusProps {
  data: {
    projectname: string
    projectdescription: string
    skills: string[]
    currency: string
    Actualbidammount: number
    platform: string
    bid_date: string
    activation_date: string
    end_date: string
    clientname: string
    status: string
    bid_creater: string
    clientemail: string
    clientcontact: string
    clientcompany: string
    projectlead: string
    frontenddev: string[]
    backenddev: string[]
    testingteam: string[]
    Projectstartdate: string
    recivedammount: number
    pendingammount: number
    clientcountry: string
  }
  onClose: () => void
}

const defaultSprint = [
  {
    projectname: 'Project Beta',
    sprints: [
      {
        sprintname: 'Sprint 1',
        addmodule: ['Module 1', 'Module 2', 'Module 3'],
        sprintStartDate: '2025-01-01',
        sprintEndDate: '2025-03-01',
        totalSprintAmount: '50000',
        receivedAmount: '20000',
        pendingAmount: '30000',
        currency: 'USD'
      },
      {
        sprintname: 'Sprint 2',
        addmodule: ['Module 4', 'Module 5'],
        sprintStartDate: '2025-04-01',
        sprintEndDate: '2025-06-01',
        totalSprintAmount: '60000',
        receivedAmount: '25000',
        pendingAmount: '35000',
        currency: 'EUR'
      },
      {
        sprintname: 'Sprint 3',
        addmodule: ['Module 6', 'Module 7', 'Module 8'],
        sprintStartDate: '2025-07-01',
        sprintEndDate: '2025-09-01',
        totalSprintAmount: '70000',
        receivedAmount: '30000',
        pendingAmount: '40000',
        currency: 'GBP'
      }
    ]
  },
  {
    projectname: 'Project Alpha',
    sprints: [
      {
        sprintname: 'Sprint 1',
        addmodule: ['Module 1', 'Module 2', 'Module 3'],
        sprintStartDate: '2025-01-01',
        sprintEndDate: '2025-03-01',
        totalSprintAmount: '50000',
        receivedAmount: '20000',
        pendingAmount: '30000',
        currency: 'USD'
      },
      {
        sprintname: 'Sprint 2',
        addmodule: ['Module 4', 'Module 5'],
        sprintStartDate: '2025-04-01',
        sprintEndDate: '2025-06-01',
        totalSprintAmount: '60000',
        receivedAmount: '25000',
        pendingAmount: '35000',
        currency: 'EUR'
      },
      {
        sprintname: 'Sprint 3',
        addmodule: ['Module 6', 'Module 7', 'Module 8'],
        sprintStartDate: '2025-07-01',
        sprintEndDate: '2025-09-01',
        totalSprintAmount: '70000',
        receivedAmount: '30000',
        pendingAmount: '40000',
        currency: 'GBP'
      }
    ]
  }
]

const buttonaddmoduleProps: ButtonProps = {
  variant: 'contained',
  color: 'primary',
  size: 'small',
  className: 'bg-[#5eba00] text-white p-0 rounded-sm',
  sx: { fontSize: '0.5rem', minWidth: '20px', minHeight: '20px' },
  children: <i style={{ fontSize: '15px' }} className='tabler-plus text-white' />
}

const ViewTrackStatus: React.FC<ViewTrackStatusProps> = ({ data, onClose }) => {
  const [selectedTab, setSelectedTab] = useState(0)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [currentSprintData, setCurrentSprintData] = useState<any>(null)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue)
  }

  const currentProjectSprint = defaultSprint.find(project => project.projectname === data?.projectname)

  return (
    <div>
      <Button variant='contained' color='secondary' onClick={onClose} sx={{ marginBottom: 2, fontWeight: 'bold' }}>
        Back to Main Page
      </Button>

      {/* Tabs for Section Navigation */}
      <Box sx={{ width: '100%' }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          aria-label='Project Details Tabs'
          variant='scrollable'
          scrollButtons='auto'
        >
          <Tab label='Project & Bid Details' />
          <Tab label='Client Information' />
          <Tab label='Project Team' />
          <Tab label='Project Modules' />
        </Tabs>

        {/* Tab Panels */}
        <Box sx={{ padding: 2 }}>
          {selectedTab === 0 && (
            <TableContainer component={Paper} sx={{ padding: 2, backgroundColor: 'transparent' }}>
              <Typography variant='h5' color='primary' gutterBottom>
                Project and Bid Details for {data?.projectname}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant='h6' color='textSecondary'>
                    Project Name
                  </Typography>
                  <Typography variant='body1'>{data?.projectname}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='h6' color='textSecondary'>
                    Project Description
                  </Typography>
                  <Typography variant='body1'>{data?.projectdescription}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='h6' color='textSecondary'>
                    Skills
                  </Typography>
                  <Typography variant='body1'>{data?.skills.join(', ')}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='h6' color='textSecondary'>
                    Platform
                  </Typography>
                  <Typography variant='body1'>{data?.platform}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='h6' color='textSecondary'>
                    Status
                  </Typography>
                  <Typography variant='body1'>{data?.status}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='h6' color='textSecondary'>
                    Actual Bid Amount
                  </Typography>
                  <Typography variant='body1'>
                    {data?.currency} {data?.Actualbidammount}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='h6' color='textSecondary'>
                    Bid Date
                  </Typography>
                  <Typography variant='body1'>{data?.bid_date}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='h6' color='textSecondary'>
                    Activation Date
                  </Typography>
                  <Typography variant='body1'>{data?.activation_date}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='h6' color='textSecondary'>
                    End Date
                  </Typography>
                  <Typography variant='body1'>{data?.end_date}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='h6' color='textSecondary'>
                    Received Amount
                  </Typography>
                  <Typography variant='body1'>
                    {data?.currency} {data?.recivedammount}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='h6' color='textSecondary'>
                    Pending Amount
                  </Typography>
                  <Typography variant='body1'>
                    {data?.currency} {data?.pendingammount}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='h6' color='textSecondary'>
                    Project Start Date
                  </Typography>
                  <Typography variant='body1'>{data?.Projectstartdate}</Typography>
                </Grid>
              </Grid>
            </TableContainer>
          )}

          {selectedTab === 1 && (
            <TableContainer component={Paper} sx={{ padding: 2, backgroundColor: 'transparent' }}>
              <Typography variant='h5' color='primary' gutterBottom>
                Client Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant='h6' color='textSecondary'>
                    Client Name
                  </Typography>
                  <Typography variant='body1'>{data?.clientname}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='h6' color='textSecondary'>
                    Client Email
                  </Typography>
                  <Typography variant='body1'>{data?.clientemail}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='h6' color='textSecondary'>
                    Client Contact
                  </Typography>
                  <Typography variant='body1'>{data?.clientcontact}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='h6' color='textSecondary'>
                    Client Company
                  </Typography>
                  <Typography variant='body1'>{data?.clientcompany}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='h6' color='textSecondary'>
                    Client Country
                  </Typography>
                  <Typography variant='body1'>{data?.clientcountry}</Typography>
                </Grid>
              </Grid>
            </TableContainer>
          )}

          {selectedTab === 2 && (
            <TableContainer component={Paper} sx={{ padding: 2, backgroundColor: 'transparent' }}>
              <Typography variant='h5' color='primary' gutterBottom>
                Project Team
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant='h6' color='textSecondary'>
                    Project Lead
                  </Typography>
                  <Typography variant='body1'>{data?.projectlead}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='h6' color='textSecondary'>
                    Frontend Developers
                  </Typography>
                  <Typography variant='body1'>{data?.frontenddev.join(', ')}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='h6' color='textSecondary'>
                    Backend Developers
                  </Typography>
                  <Typography variant='body1'>{data?.backenddev.join(', ')}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='h6' color='textSecondary'>
                    Testing Team
                  </Typography>
                  <Typography variant='body1'>{data?.testingteam.join(', ')}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='h6' color='textSecondary'>
                    Project Manager (Bid Creator)
                  </Typography>
                  <Typography variant='body1'>{data?.bid_creater}</Typography>
                </Grid>
              </Grid>
            </TableContainer>
          )}

          {selectedTab === 3 && currentProjectSprint && (
            <TableContainer component={Paper} sx={{ padding: 2, backgroundColor: 'transparent' }}>
              <Typography variant='h5' color='primary' gutterBottom>
                Project Modules for {data?.projectname}
              </Typography>
              <Grid container spacing={2}>
                {currentProjectSprint.sprints.map((sprint, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Typography variant='h6' color='textSecondary'>
                      {sprint.sprintname}
                    </Typography>
                    <Typography variant='body1'>Start Date: {sprint.sprintStartDate}</Typography>
                    <Typography variant='body1'>End Date: {sprint.sprintEndDate}</Typography>
                    <Typography variant='body1'>
                      Total Sprint Amount: {sprint.currency} {sprint.totalSprintAmount}
                    </Typography>
                    <Typography variant='body1'>
                      Received Amount: {sprint.currency} {sprint.receivedAmount}
                    </Typography>
                    <Typography variant='body1'>
                      Pending Amount: {sprint.currency} {sprint.pendingAmount}
                    </Typography>
                    <Typography variant='body1'>Modules: {sprint.addmodule.join(', ')}</Typography>
                  </Grid>
                ))}
              </Grid>
              <Grid>
                <OpenDialogOnElementClick
                  element={Button}
                  elementProps={buttonaddmoduleProps}
                  dialog={SprintEditDialog}
                  dialogProps={{ sprint: currentProjectSprint }}
                />
              </Grid>
            </TableContainer>
          )}
        </Box>
      </Box>

      <Button>edit Sprint</Button>
    </div>
  )
}

export default ViewTrackStatus
