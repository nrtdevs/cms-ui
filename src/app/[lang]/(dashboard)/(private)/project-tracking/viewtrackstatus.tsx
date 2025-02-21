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
import Paginator from '@/app/Custom-Cpmponents/paginator/Paginator'
import SearchFilter from '@/app/Custom-Cpmponents/input/searchfilter'

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

  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 5
  const currentProjectSprint = defaultSprint.find(project => project.projectname === data?.projectname)

  const filteredSprints = currentProjectSprint?.sprints!.filter(sprint =>
    Object.values(sprint).some(value => String(value).toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const totalPages = Math.ceil((filteredSprints?.length ?? 0) / rowsPerPage)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue)
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  const paginatedSprints = filteredSprints?.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)

  return (
    <Card>
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
            <Tab label={`${data?.projectname}  Details`} />
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
            <Paper elevation={3} sx={{ padding: 4, backgroundColor: 'transparent' }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant='subtitle1' className='font-bold text-primary'>
                    Project Name:
                  </Typography>
                  <Typography variant='body1' >{data?.projectname}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='subtitle1' className='font-bold text-primary'>
                    Project Description:
                  </Typography>
                  <Typography variant='body1'>{data?.projectdescription}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='subtitle1' className='font-bold text-primary'>
                    Skills:
                  </Typography>
                  <Typography variant='body1'>{data?.skills.join(', ')}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='subtitle1' className='font-bold text-primary'>
                    Platform:
                  </Typography>
                  <Typography variant='body1'>{data?.platform}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='subtitle1' className='font-bold text-primary'>
                    Status:
                  </Typography>
                  <Typography variant='body1'>{data?.status}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='subtitle1' className='font-bold text-primary'>
                    Actual Bid Amount:
                  </Typography>
                  <Typography variant='body1'>
                    {data?.currency} {data?.Actualbidammount}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='subtitle1' className='font-bold text-primary'>
                    Bid Date:
                  </Typography>
                  <Typography variant='body1'>{data?.bid_date}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='subtitle1' className='font-bold text-primary'>
                    Activation Date:
                  </Typography>
                  <Typography variant='body1'>{data?.activation_date}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='subtitle1' className='font-bold text-primary'>
                    End Date:
                  </Typography>
                  <Typography variant='body1'>{data?.end_date}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='subtitle1' className='font-bold text-primary'>
                    Received Amount:
                  </Typography>
                  <Typography variant='body1'>
                    {data?.currency} {data?.recivedammount}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='subtitle1' className='font-bold text-primary'>
                    Pending Amount:
                  </Typography>
                  <Typography variant='body1'>
                    {data?.currency} {data?.pendingammount}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='subtitle1' className='font-bold text-primary'>
                    Project Start Date:
                  </Typography>
                  <Typography variant='body1'>{data?.Projectstartdate}</Typography>
                </Grid>
              </Grid>
            </Paper>
          )}

          {selectedTab === 1 && (
            <TableContainer component={Paper} sx={{ padding: 2, backgroundColor: 'transparent' }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant='h6' className='text-primary font-bold'>
                    Client Name
                  </Typography>
                  <Typography variant='body1'>{data?.clientname}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='h6' className='text-primary font-bold'>
                    Client Email
                  </Typography>
                  <Typography variant='body1'>{data?.clientemail}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='h6' className='text-primary font-bold'>
                    Client Contact
                  </Typography>
                  <Typography variant='body1'>{data?.clientcontact}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='h6' className='text-primary font-bold'>
                    Client Company
                  </Typography>
                  <Typography variant='body1'>{data?.clientcompany}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='h6' className='text-primary font-bold'>
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
                  <Typography variant='h6' className='text-primary font-bold'>
                    Project Lead
                  </Typography>
                  <Typography variant='body1'>{data?.projectlead}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='h6' className='text-primary font-bold'>
                    Frontend Developers
                  </Typography>
                  <Typography variant='body1'>{data?.frontenddev.join(', ')}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='h6' className='text-primary font-bold'>
                    Backend Developers
                  </Typography>
                  <Typography variant='body1'>{data?.backenddev.join(', ')}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='h6' className='text-primary font-bold'>
                    Testing Team
                  </Typography>
                  <Typography variant='body1'>{data?.testingteam.join(', ')}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='h6' className='text-primary font-bold'>
                    Project Manager
                  </Typography>
                  <Typography variant='body1'>{data?.bid_creater}</Typography>
                </Grid>
              </Grid>
            </TableContainer>
          )}

          {selectedTab === 3 && currentProjectSprint && (
            <Paper sx={{ padding: 2, backgroundColor: 'transparent' }}>
              <Grid className='flex' container justifyContent='space-between' alignItems='center'>
                <SearchFilter
                  label='Search'
                  value={searchTerm}
                  onChange={value => {
                    setSearchTerm(value)
                    setCurrentPage(1) // Reset to the first page when filtering
                  }}
                  placeholder='Search sprints...'
                  style={{ width: '400px' }}
                />
              </Grid>

              {/* Table */}
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className='text-primary font-bold'>Sprint Name</TableCell>
                      <TableCell className='text-primary font-bold'>Start Date</TableCell>
                      <TableCell className='text-primary font-bold'>End Date</TableCell>
                      <TableCell className='text-primary font-bold'>Total Sprint Amount</TableCell>
                      <TableCell className='text-primary font-bold'>Received Amount</TableCell>
                      <TableCell className='text-primary font-bold'>Pending Amount</TableCell>
                      <TableCell className='text-primary font-bold'>Modules</TableCell>
                      <TableCell className='text-primary font-bold'>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedSprints?.map((sprint, index) => (
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

              {/* Paginator */}
              <Grid className='p-5' container justifyContent='center' alignItems='center'>
                <Paginator currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
              </Grid>
            </Paper>
          )}
        </Box>
      </Box>
    </Card>
  )
}

export default ViewTrackStatus
