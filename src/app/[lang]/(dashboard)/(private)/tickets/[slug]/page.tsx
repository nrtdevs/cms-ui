'use client'

import React, { useState, useEffect } from 'react'
import {
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box
} from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import OpenDialogOnElementClick from '@/app/Custom-Cpmponents/Buttons/OpenDialogOnElementClick'
import ViewRemarkData from './ViewRemarkData'

interface Remark {
  remark: string
  date: string
  username: string
}

interface Ticket {
  ticketName: string
  id: string
  ticketDescription: string
  assignee: string
  status: string
  priority: string
  developer: string
  tester: string
  assignedTo: string
  startDate: string
  deadline: string
  projectName: string
  tags: string[]
  remarks: Remark[]
}

const ViewTickets: React.FC = () => {
  const data: Ticket[] = [
    {
      ticketName: 'Login Bug Fix',
      id: '1',
      projectName: 'Authentication System', // Project Name field
      ticketDescription: 'Fixing the login issue where users cannot authenticate.',
      assignee: 'Sarah Lee', // Assignee field
      assignedTo: 'John Doe', // AssignedTo field
      developer: 'John Doe', // Developer role
      tester: 'Alice Johnson', // Tester role
      startDate: '2025-01-01', // Start Date
      deadline: '2025-01-15', // Task Deadline
      status: 'In Progress',
      priority: 'High',
      tags: ['Bug', 'Urgent'],
      remarks: [
        { remark: 'Initial investigation completed', date: '2025-01-03', username: 'John Doe' },
        { remark: 'Fixing authentication bug', date: '2025-01-05', username: 'John Doe' },
        { remark: 'Awaiting testing', date: '2025-01-07', username: 'Sarah Lee' }
      ]
    },
    {
      ticketName: 'Admin Panel Redesign',
      id: '2',
      projectName: 'Admin UI Project', // Project Name field
      ticketDescription: 'Redesign the admin panel to improve the user interface and accessibility.',
      assignee: 'Michael Wright', // Assignee field
      assignedTo: 'Emily White', // AssignedTo field
      developer: 'Emily White', // Developer role
      tester: 'Eve Carter', // Tester role
      startDate: '2025-01-04', // Start Date
      deadline: '2025-02-01', // Task Deadline
      status: 'Not Started',
      priority: 'Medium',
      tags: ['UI', 'Design'],
      remarks: [
        { remark: 'Design phase initiated', date: '2025-01-03', username: 'Emily White' },
        { remark: 'UI mockups created', date: '2025-01-08', username: 'Emily White' }
      ]
    },
    {
      ticketName: 'Security Patch Update',
      id: '3',
      projectName: 'Security Updates', // Project Name field
      ticketDescription: 'Update security patches and make necessary fixes.',
      assignee: 'Lucas Allen', // Assignee field
      assignedTo: 'James Black', // AssignedTo field
      developer: 'James Black', // Developer role
      tester: 'Olivia Martinez', // Tester role
      startDate: '2025-02-10', // Start Date
      deadline: '2025-03-10', // Task Deadline
      status: 'Completed',
      priority: 'Low',
      tags: ['Security', 'Patch'],
      remarks: [
        { remark: 'Security vulnerability discovered', date: '2025-03-05', username: 'James Black' },
        { remark: 'Patch applied successfully', date: '2025-03-07', username: 'James Black' },
        { remark: 'Testing and verification completed', date: '2025-03-08', username: 'Olivia Martinez' }
      ]
    },
    {
      ticketName: 'Backend Optimization',
      id: '4',
      projectName: 'Performance Improvement', // Project Name field
      ticketDescription: 'Optimize backend code for faster processing and better performance.',
      assignee: 'Olivia Martinez', // Assignee field
      assignedTo: 'David Green', // AssignedTo field
      developer: 'David Green', // Developer role
      tester: 'Alice Johnson', // Tester role
      startDate: '2025-04-01', // Start Date
      deadline: '2025-04-30', // Task Deadline
      status: 'In Progress',
      priority: 'High',
      tags: ['Backend', 'Optimization'],
      remarks: [
        { remark: 'Code profiling Completed', date: '2025-04-12', username: 'David Green' },
        { remark: 'Optimization strategies discussed', date: '2025-04-15', username: 'David Green' },
        { remark: 'Code optimization in progress', date: '2025-04-20', username: 'Olivia Martinez' }
      ]
    }
  ]

  const buttonviewProps = {
    variant: 'contained',
    color: 'primary',
    size: 'small',
    className: 'bg-primary text-white p-0 rounded-sm',
    sx: { fontSize: '0.4rem', minWidth: '20px', minHeight: '20px', marginRight: '10px' },
    children: <i style={{ fontSize: '14px' }} className='tabler-eye text-white' />
  }

  // State for the selected ticket
  const [ticketData, setTicketData] = useState<Ticket | null>(null)

  const [open, setOpen] = useState(true)
  const [error, setError] = useState<string>('')

  const { slug } = useParams() // Get the slug from the URL (useParams will return an object with the slug)
  const router = useRouter()

  // UseEffect to get the ticket data based on the slug from the URL
  useEffect(() => {
    if (slug) {
      const ticket = data.find(ticket => ticket.id === slug)
      setTicketData(ticket || null)
    }
  }, [slug])

  if (!ticketData) {
    return (
      <Box sx={{ maxWidth: '100vw', margin: 'auto', padding: '20px' }}>
        <Typography variant='h4' color='error' gutterBottom>
          Ticket not found
        </Typography>
      </Box>
    )
  }

  return (
    <>
      <Card sx={{ boxShadow: 3, padding: '20px' }}>
        <Typography className='text-primary font-bold text-left text-lg'>Ticket Information</Typography>

        <CardContent sx={{ backgroundColor: 'background.paper', padding: '32px' }}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              <Typography variant='h6' className='text-primary font-bold'>
                Title
              </Typography>
              <Typography variant='body1' className='font-light '>
                {ticketData.ticketName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant='h6' className='text-primary font-bold'>
                Project Name
              </Typography>
              <Typography variant='body1' className='font-light'>
                {ticketData.projectName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant='h6' className='text-primary font-bold'>
                Assignee
              </Typography>
              <Typography variant='body1' className='font-light'>
                {ticketData.assignee}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant='h6' className='text-primary font-bold'>
                Tech Stack
              </Typography>
              <Typography variant='body1' className='font-light'>
                {ticketData.tags.join(', ')}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant='h6' className='text-primary font-bold'>
                Developer
              </Typography>
              <Typography variant='body1' className='font-light'>
                {ticketData.developer}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant='h6' className='text-primary font-bold'>
                Tester
              </Typography>
              <Typography variant='body1' className='font-light'>
                {ticketData.tester}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant='h6' className='text-primary font-bold'>
                Start Date
              </Typography>
              <Typography variant='body1' className='font-light'>
                {ticketData.startDate}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant='h6' className='text-primary font-bold'>
                Deadline
              </Typography>
              <Typography variant='body1' className='font-light'>
                {ticketData.deadline}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography variant='h6' className='text-primary font-bold'>
                Ticket Description
              </Typography>
              <Typography variant='body1' className='font-light'>
                {ticketData.ticketDescription}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ boxShadow: 3, marginTop: '14px' }}>
        <CardContent sx={{ backgroundColor: 'background.paper', padding: '32px' }}>
          <Typography className='flex flex-col text-primary text-left items-left font-bold text-lg'>
            View Remarks
            <Typography component='span' className='flex text-center'>
              Here are the details for the Remarks
            </Typography>
          </Typography>

          <Box mt={4}>
            <Grid item xs={12}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align='left'>
                      <strong className='text-primary font-bold text-md'>User</strong>
                    </TableCell>
                    <TableCell align='center'>
                      <strong className='text-primary font- text-md'>Remark</strong>
                    </TableCell>
                    <TableCell align='center'>
                      <strong className='text-primary font-bold text-md'>Date</strong>
                    </TableCell>
                    <TableCell align='center'>
                      <strong className='text-primary font-bold text-md'>Actions</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ticketData.remarks.map(remark => (
                    <TableRow key={remark.date}>
                      <TableCell align='left' className='font-light'>
                        {remark.username}
                      </TableCell>
                      <TableCell
                        align='center'
                        className='font-light'
                      >{remark.remark}
                      </TableCell>
                      <TableCell align='center' className='font-light'>
                        {remark.date}
                      </TableCell>
                      <TableCell align='center' className='font-light'>
                        <OpenDialogOnElementClick
                          element={Button}
                          elementProps={buttonviewProps}
                          dialog={ViewRemarkData}
                          dialogProps={{ data: remark }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
          </Box>
        </CardContent>

        <CardActions sx={{ paddingTop: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'right', marginTop: 3 }}>
            <Button variant='contained' onClick={() => router.push('/tickets')}>
              Back To Tickets...
            </Button>
          </Box>
        </CardActions>
      </Card>
    </>
  )
}
export default ViewTickets
