import React, { useState } from 'react'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Chip,
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid
} from '@mui/material'

// Interface for Sprint data
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

// Interface for SprintEditDialogProps
interface SprintEditDialogProps {
  sprint: Sprint['sprints'][number]
  open: boolean
  onClose: () => void
  onSave: (updatedSprint: Sprint['sprints'][number]) => void
}

// SprintEditDialog Component
const SprintEditDialog: React.FC<SprintEditDialogProps> = ({ sprint, open, onClose, onSave }) => {
  const [editedSprint, setEditedSprint] = useState(sprint)
  const [moduleInput, setModuleInput] = useState('')

  const handleChange = (field: keyof typeof sprint, value: any) => {
    setEditedSprint(prevSprint => ({
      ...prevSprint,
      [field]: value
    }))
  }

  const handleAddModule = () => {
    if (moduleInput.trim()) {
      setEditedSprint(prevSprint => ({
        ...prevSprint,
        addmodule: [...prevSprint.addmodule, moduleInput.trim()]
      }))
      setModuleInput('')
    }
  }

  const handleRemoveModule = (module: string) => {
    setEditedSprint(prevSprint => ({
      ...prevSprint,
      addmodule: prevSprint.addmodule.filter(mod => mod !== module)
    }))
  }

  const handleSave = () => {
    onSave(editedSprint)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>Edit Sprint</DialogTitle>
      <DialogContent>
        <Box mb={2}>
          <TextField
            label='Sprint Name'
            fullWidth
            value={editedSprint.sprintname}
            onChange={e => handleChange('sprintname', e.target.value)}
            margin='normal'
          />
          <TextField
            label='Total Sprint Amount'
            fullWidth
            value={editedSprint.totalSprintAmount}
            onChange={e => handleChange('totalSprintAmount', e.target.value)}
            margin='normal'
          />
          <TextField
            label='Sprint Start Date'
            type='date'
            fullWidth
            value={editedSprint.sprintStartDate}
            onChange={e => handleChange('sprintStartDate', e.target.value)}
            margin='normal'
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label='Sprint End Date'
            type='date'
            fullWidth
            value={editedSprint.sprintEndDate}
            onChange={e => handleChange('sprintEndDate', e.target.value)}
            margin='normal'
            InputLabelProps={{ shrink: true }}
          />
        </Box>
        <Box>
          <Typography variant='h6'>Modules</Typography>
          <Box display='flex' alignItems='center' mb={2}>
            <TextField
              label='Add Module'
              value={moduleInput}
              onChange={e => setModuleInput(e.target.value)}
              margin='normal'
              fullWidth
            />
            <Button onClick={handleAddModule} variant='contained' color='primary' style={{ marginLeft: '8px' }}>
              Add
            </Button>
          </Box>
          {editedSprint.addmodule.map((module, index) => (
            <Chip key={index} label={module} onDelete={() => handleRemoveModule(module)} style={{ margin: '4px' }} />
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant='contained' color='primary'>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

// Main App Component
const App: React.FC = () => {
  const [data, setData] = useState<Sprint>({
    projectname: 'Project Alpha',
    sprints: [
      {
        sprintname: 'Sprint 1',
        addmodule: ['Module 1', 'Module 2', 'Module 3'],
        currency: 'USD',
        pendingAmount: '30000',
        receivedAmount: '20000',
        sprintStartDate: '2025-01-01',
        sprintEndDate: '2025-03-01',
        totalSprintAmount: '50000'
      },
      {
        sprintname: 'Sprint 2',
        addmodule: ['Module 1', 'Module 2'],
        sprintStartDate: '2025-04-01',
        sprintEndDate: '2025-06-01',
        totalSprintAmount: '60000'
      },
      {
        sprintname: 'Sprint 3',
        addmodule: ['Module 1', 'Module 2', 'Module 3'],
        sprintStartDate: '2025-07-01',
        sprintEndDate: '2025-09-01',
        totalSprintAmount: '70000'
      }
    ]
  })

  const [selectedSprint, setSelectedSprint] = useState<Sprint['sprints'][number] | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleEditSprint = (sprint: Sprint['sprints'][number]) => {
    setSelectedSprint(sprint)
    setDialogOpen(true)
  }

  const handleSaveSprint = (updatedSprint: Sprint['sprints'][number]) => {
    setData(prevData => ({
      ...prevData,
      sprints: prevData.sprints.map(s => (s.sprintname === updatedSprint.sprintname ? updatedSprint : s))
    }))
    setDialogOpen(false)
  }

  return (
    <Box p={4}>
      <Typography variant='h4' mb={4}>
        {data.projectname}
      </Typography>
      <Grid container spacing={2}>
        {data.sprints.map((sprint, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant='h6'>{sprint.sprintname}</Typography>
                <Typography>Total Amount: {sprint.totalSprintAmount}</Typography>
                <Typography>
                  Dates: {sprint.sprintStartDate} - {sprint.sprintEndDate}
                </Typography>
                <Typography>Modules: {sprint.addmodule.join(', ')}</Typography>
              </CardContent>
              <CardActions>
                <Button onClick={() => handleEditSprint(sprint)} variant='contained' color='primary'>
                  Edit
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      {selectedSprint && (
        <SprintEditDialog
          sprint={selectedSprint}
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onSave={handleSaveSprint}
        />
      )}
    </Box>
  )
}

export default App
