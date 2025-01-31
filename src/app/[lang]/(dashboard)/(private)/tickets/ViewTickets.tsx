'use client'

import React, { useState, useEffect } from 'react'
import { Button, Typography, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'

interface Ticket {
  ticketName: string
  id: string
  ticketDescription: string
  assignee: string
  status: string
  priority: string
  tags: string[]
}

interface ViewTicketProps {
  open: boolean
  setOpen: (open: boolean) => void
  data: Ticket // The ticket data to be viewed
}

const ViewTickets: React.FC<ViewTicketProps> = ({ open, setOpen, data }) => {
  const handleClose = () => {
    setOpen(false)
  }

  // Initialize state with the ticket data
  const [ticketData, setTicketData] = useState<Ticket>({
    ...data,
    tags: data.tags || [] // Ensure tags is an empty array if undefined
  })

  useEffect(() => {
    setTicketData({
      ...data,
      tags: data.tags || [] // Ensure tags is an empty array if undefined
    })
  }, [data])

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='md'>
      <DialogTitle variant='h4' className='flex gap-2 flex-col text-primary text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
        View Ticket Details
        <Typography component='span' className='flex flex-col text-center'>
          Here are the details for the ticket.
        </Typography>
      </DialogTitle>
      <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Typography variant='h6' className='text-primary font-bold'>
              Ticket Details
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant='body1'>
              <strong className='text-primary'>Ticket Name:</strong> {ticketData.ticketName}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant='body1' className='text-secondary'>
              <strong className='text-primary'>Assignee:</strong> {ticketData.assignee}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant='body1' className='text-secondary'>
              <strong className='text-primary'>Status:</strong> {ticketData.status}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant='body1' className='text-secondary'>
              <strong className='text-primary'>Priority:</strong> {ticketData.priority}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant='body1' className='text-secondary'>
              <strong className='text-primary'>Tags:</strong> {ticketData.tags.join(', ') || 'No tags'}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='body1' className='text-secondary'>
              <strong className='text-primary'>Ticket Description:</strong>{' '}
              {ticketData.ticketDescription || 'No description available'}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
        <Button variant='contained' onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ViewTickets
