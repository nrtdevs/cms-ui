import React, { useState } from 'react'

import type { ButtonProps } from '@mui/material'
import {
  Button,
  Tabs,
  Tab,
  Box,
  Typography,
  TableContainer,
  Paper,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Card
} from '@mui/material'

import SprintEditDialog from './admin/editprojectsprint'
import OpenDialogOnElementClick from '@/app/Custom-Cpmponents/Buttons/OpenDialogOnElementClick'
import SprintViewDialog from './viewprojectsprint'

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
  children: <i style={{ fontSize: '15px' }} className='tabler-edit text-white' />
}

const buttonviewmoduleProps: ButtonProps = {
  variant: 'contained',
  color: 'primary',
  size: 'small',
  className: 'bg-primary text-white p-0 rounded-sm',
  sx: { fontSize: '0.5rem', minWidth: '20px', minHeight: '20px', marginLeft: '5px' },
  children: <i style={{ fontSize: '15px' }} className='tabler-eye text-white' />
}

const ViewTrackStatus: React.FC<ViewTrackStatusProps> = ({ data, onClose }) => {
  const [selectedTab, setSelectedTab] = useState(0)

  // const [openDialog, setOpenDialog] = useState(false)
  // const [selectedSprint, setSelectedSprint] = useState(null)

  // const handleOpenDialog = (sprint: any) => {
  //   setSelectedSprint(sprint)
  //   setOpenDialog(true)
  // }

  // const handleCloseDialog = () => {
  //   setOpenDialog(false)
  //   setSelectedSprint(null)
  // }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue)
  }

  const currentProjectSprint = defaultSprint.find(project => project.projectname === data?.projectname)

  return (
    <Card>
      {/* Tabs for Section Navigation */}
      <Box sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            aria-label='Project Details Tabs'
            variant='scrollable'
            scrollButtons='auto'
            sx={{ flexGrow: 1 }} // Ensures the Tabs take the remaining space
          >
            <Tab label={`${data?.projectname} Project & Bid Details`} />
            <Tab label='Client Information' />
            <Tab label={`${data?.projectname} Team`} />
            <Tab label={`${data?.projectname} Modules`} />
          </Tabs>
          <Button color='secondary' onClick={onClose} sx={{ marginBottom: 2, fontWeight: 'bold' }}>
            <i className='tabler-arrow-back' />
          </Button>
        </Box>

        {/* Tab Panels */}
        <Box>
          {selectedTab === 0 && (
            <TableContainer component={Paper} sx={{ padding: 2, backgroundColor: 'transparent' }}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant='h6' color='textSecondary'>
                        Field
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='h6' color='textSecondary'>
                        Details
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Typography variant='body1'>Project Name</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body1'>{data?.projectname}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant='body1'>Project Description</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body1'>{data?.projectdescription}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant='body1'>Skills</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body1'>{data?.skills.join(', ')}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant='body1'>Platform</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body1'>{data?.platform}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant='body1'>Status</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body1'>{data?.status}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant='body1'>Actual Bid Amount</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body1'>
                        {data?.currency} {data?.Actualbidammount}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant='body1'>Bid Date</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body1'>{data?.bid_date}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant='body1'>Activation Date</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body1'>{data?.activation_date}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant='body1'>End Date</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body1'>{data?.end_date}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant='body1'>Received Amount</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body1'>
                        {data?.currency} {data?.recivedammount}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant='body1'>Pending Amount</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body1'>
                        {data?.currency} {data?.pendingammount}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant='body1'>Project Start Date</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body1'>{data?.Projectstartdate}</Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {selectedTab === 1 && (
            <TableContainer component={Paper} sx={{ padding: 2, backgroundColor: 'transparent' }}>
              <Grid container spacing={3}>
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
              <Grid container spacing={3}>
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
                    Project Manager
                  </Typography>
                  <Typography variant='body1'>{data?.bid_creater}</Typography>
                </Grid>
              </Grid>
            </TableContainer>
          )}

          {selectedTab === 3 && currentProjectSprint && (
            <TableContainer component={Paper} sx={{ padding: 2, backgroundColor: 'transparent' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Sprint Name</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell>Total Sprint Amount</TableCell>
                    <TableCell>Received Amount</TableCell>
                    <TableCell>Pending Amount</TableCell>
                    <TableCell>Modules</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentProjectSprint.sprints.map((sprint, index) => (
                    <TableRow key={index}>
                      <TableCell>{sprint.sprintname}</TableCell>
                      <TableCell>{sprint.sprintStartDate}</TableCell>
                      <TableCell>{sprint.sprintEndDate}</TableCell>
                      <TableCell>
                        {sprint.currency} {sprint.totalSprintAmount}
                      </TableCell>
                      <TableCell>
                        {sprint.currency} {sprint.receivedAmount}
                      </TableCell>
                      <TableCell>
                        {sprint.currency} {sprint.pendingAmount}
                      </TableCell>
                      <TableCell>{sprint.addmodule.join(', ')}</TableCell>
                      <TableCell>
                        <Grid container spacing={2}>
                          <Grid item>
                            <OpenDialogOnElementClick
                              element={Button}
                              elementProps={buttonaddmoduleProps}
                              dialog={SprintEditDialog}
                              dialogProps={{ sprint }}
                            />
                          </Grid>

                          <Grid item>
                            <OpenDialogOnElementClick
                              element={Button}
                              elementProps={buttonviewmoduleProps}
                              dialog={SprintViewDialog}
                              dialogProps={{ sprint }}
                            />
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Box>
    </Card>
  )
}

export default ViewTrackStatus
