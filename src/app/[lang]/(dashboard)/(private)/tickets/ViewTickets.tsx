import React, { useState, useEffect } from 'react'
import {
  Button,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box
} from '@mui/material'

interface Remark {
  remark: string
  date: string
}

interface Ticket {
  ticketName: string
  id: string
  ticketDescription: string
  assignee: string
  status: string
  priority: string
  tags: string[]
  remarks: Remark[]
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

  // State for storing the current remark and date
  const [remark, setRemark] = useState<Remark>({ remark: '', date: '' })
  const [error, setError] = useState<string>('')

  // Handle change in the remark or date fields
  const handleRemarkChange = (field: string, value: string) => {
    setRemark(prevState => ({ ...prevState, [field]: value }))
  }

  // Handle save remark with validation
  const handleSaveRemark = () => {
    if (!remark.remark.trim() || !remark.date) {
      setError('Please provide both a remark and a date.')
      return
    }

    // Clear previous error if validation is successful
    setError('')

    // Save the current remark to the ticket
    const updatedTicket = { ...ticketData, remarks: [...ticketData.remarks, remark] }
    setTicketData(updatedTicket)
    setRemark({ remark: '', date: '' }) // Clear the fields after saving
  }

  // Handle delete remark
  const handleDeleteRemark = (index: number) => {
    const updatedRemarks = ticketData.remarks.filter((_, i) => i !== index)
    setTicketData(prevState => ({ ...prevState, remarks: updatedRemarks }))
  }

  useEffect(() => {
    setTicketData({
      ...data,
      tags: data.tags || [] // Ensure tags is an empty array if undefined
    })
  }, [data])

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='md'>
      <DialogTitle className='text-primary font-bold text-left' gutterBottom>
        Ticket Information
      </DialogTitle>

      <DialogContent sx={{ backgroundColor: 'background.paper', padding: '32px' }}>
        {/* Ticket Name and Assignee */}
        <Box mb={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant='h6' className='text-primary'>
                Ticket Name
              </Typography>
              <Typography variant='body1' className='font-light'>
                {ticketData.ticketName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='h6' className='text-primary'>
                Assignee
              </Typography>
              <Typography variant='body1' className='font-light'>
                {ticketData.assignee}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Status, Priority, Tags, Ticket Description */}
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant='h6' className='text-primary'>
              Status
            </Typography>
            <Typography variant='body1' className='font-light'>
              {ticketData.status}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='h6' className='text-primary'>
              Priority
            </Typography>
            <Typography variant='body1' className='font-light'>
              {ticketData.priority}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant='h6' className='text-primary'>
              Tags
            </Typography>
            <Typography variant='body1' className='font-light'>
              {ticketData.tags}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='h6' className='text-primary'>
              Ticket Description
            </Typography>
            <Typography variant='body1' className='font-light'>
              {ticketData.ticketDescription}
            </Typography>
          </Grid>
        </Grid>

        {/* Remarks Section */}
      </DialogContent>

      <DialogTitle className='flex flex-col text-primary text-left items-left'>
        View Remarks
        <Typography component='span' className='flex text-center'>
          Here are the details for the Remarks
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: 'background.paper', padding: '32px' }}>
        <Box mt={4}>
          <Grid item xs={12}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align='left'>
                    <strong className='text-primary'>Date</strong>
                  </TableCell>
                  <TableCell align='left'>
                    <strong className='text-primary'>Remark</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ticketData.remarks.map((remark, index) => (
                  <TableRow key={index}>
                    <TableCell align='left' className='font-light'>
                      {remark.date}
                    </TableCell>
                    <TableCell align='left' className='font-light'>
                      {remark.remark}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color='secondary'>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default ViewTickets
