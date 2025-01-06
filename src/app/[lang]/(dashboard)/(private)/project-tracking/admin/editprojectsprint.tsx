'use client'

import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'

interface Sprint {
  projectname: string
  sprints: {
    sprintname: string
    addmodule: string[]
    currency?: string
    pendingAmount?: string
    receivedAmount?: string
    sprintStartDate: string
    sprintEndDate: string
    totalSprintAmount: string
  }[]
}

interface SprintEditDialogProps {
  sprint: Sprint['sprints'][number]
  open: boolean
  onClose: () => void
}

const SprintEditDialog: React.FC<SprintEditDialogProps> = ({ sprint, open, onClose }) => {
  console.log(sprint)

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>Edit Sprint</DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions>=</DialogActions>
    </Dialog>
  )
}

export default SprintEditDialog
