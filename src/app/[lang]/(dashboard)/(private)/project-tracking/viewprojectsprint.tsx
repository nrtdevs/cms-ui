import React from 'react'

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, Typography, Divider } from '@mui/material'

interface Sprint {
  sprintname: string
  sprintStartDate: string
  sprintEndDate: string
  totalSprintAmount: number | string
  receivedAmount: number | string
  pendingAmount: number | string
  addmodule: string[]
}

interface SprintViewDialogProps {
  sprint: Sprint
  open: boolean
  onClose: () => void
}

const SprintViewDialog: React.FC<SprintViewDialogProps> = ({ sprint, open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle className='font-bold text-primary  align-center'>Sprint Details</DialogTitle>

      <DialogContent>
        <Grid container spacing={2} sx={{ padding: 2 }}>
          {/* Sprint Name */}
          <Grid item xs={12}>
            <Typography variant='h6' color='primary'>
              Sprint Name
            </Typography>
            <Typography variant='body1'>{sprint.sprintname}</Typography>
          </Grid>

          <Divider sx={{ width: '100%', marginY: 2 }} />

          {/* Start Date and End Date */}
          <Grid item xs={12} sm={6}>
            <Typography variant='h6' color='primary'>
              Start Date
            </Typography>
            <Typography variant='body1'>{sprint.sprintStartDate}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='h6' color='primary'>
              End Date
            </Typography>
            <Typography variant='body1'>{sprint.sprintEndDate}</Typography>
          </Grid>

          <Divider sx={{ width: '100%', marginY: 2 }} />

          {/* Total Sprint Amount */}
          <Grid item xs={12} sm={6}>
            <Typography variant='h6' color='primary'>
              Total Sprint Amount
            </Typography>
            <Typography variant='body1'>${Number(sprint.totalSprintAmount || 0).toFixed(2)}</Typography>
          </Grid>

          {/* Received Amount */}
          <Grid item xs={12} sm={6}>
            <Typography variant='h6' color='primary'>
              Received Amount
            </Typography>
            <Typography variant='body1'>${Number(sprint.receivedAmount || 0).toFixed(2)}</Typography>
          </Grid>

          {/* Pending Amount */}
          <Grid item xs={12}>
            <Typography variant='h6' color='primary'>
              Pending Amount
            </Typography>
            <Typography variant='body1'>${Number(sprint.pendingAmount || 0).toFixed(2)}</Typography>
          </Grid>

          <Divider sx={{ width: '100%', marginY: 2 }} />

          {/* Modules */}
          <Grid item xs={12}>
            <Typography variant='h6' color='primary'>
              Modules
            </Typography>
            <Typography variant='body1'>
              {sprint.addmodule.length > 0 ? sprint.addmodule.join(', ') : 'No modules added'}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color='secondary'>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SprintViewDialog
