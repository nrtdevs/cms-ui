import React, { useState, useEffect } from 'react'
import { Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'

interface Member {
  id: string
  name: string
}

interface Project {
  name: string
  id: string
  teamname: string
  description: string
  status: string
  teamLead: string
  members: Member[]
  techStack: string[]
}

interface ViewTeamProps {
  open: boolean
  setOpen: (open: boolean) => void
  data: Project // The project data to be viewed
}

const ViewTeamManagement: React.FC<ViewTeamProps> = ({ open, setOpen, data }) => {
  const handleClose = () => {
    setOpen(false)
  }

  // Initialize state with the project data
  const [teamData, setTeamData] = useState<Project>(data)

  useEffect(() => {
    setTeamData(data)
  }, [data])

  return (
<Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
  <DialogTitle className="flex flex-col gap-2 items-center p-3 rounded-t-lg text-center bg-surface-variant">
    <Typography
      variant="h6"
      className="font-bold text-sm text-on-surface-variant text-primary"
    >
      Team Details
    </Typography>
    <Typography className="text-xs text-on-surface-variant-secondary">
      View the details of the team.
    </Typography>
  </DialogTitle>

  <DialogContent className="px-4 py-2 bg-surface">
    {/* First Row: Team Name, Description */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {/* Team Name */}
      <div className="p-3 rounded-lg bg-surface-variant">
        <Typography className="font-medium text-on-surface-variant text-primary">
          Team Name:
        </Typography>
        <Typography className="text-on-surface">{teamData.teamname}</Typography>
      </div>

      {/* Description */}
      <div className="p-3 rounded-lg bg-surface-variant">
        <Typography className="font-medium text-on-surface-variant text-primary">
          Description:
        </Typography>
        <Typography className="text-on-surface">{teamData.description}</Typography>
      </div>
    </div>

    {/* Second Row: Team Lead, Tech Stack */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
      {/* Team Lead */}
      <div className="p-3 rounded-lg bg-surface-variant">
        <Typography className="font-medium text-on-surface-variant text-primary">
          Team Lead:
        </Typography>
        <Typography className="text-on-surface">{teamData.teamLead}</Typography>
      </div>

      {/* Tech Stack */}
      <div className="p-3 rounded-lg bg-surface-variant">
        <Typography className="font-medium text-on-surface-variant text-primary">
          Tech Stack:
        </Typography>
        <Typography className="text-on-surface">
          {teamData.techStack.join(', ')}
        </Typography>
      </div>
    </div>

    {/* Members List */}
    <div className="mt-4 p-3 rounded-lg bg-surface-variant">
      <Typography className="font-medium text-on-surface-variant text-primary">
        Members:
      </Typography>
      <ul className="list-disc ml-4">
        {teamData.members.map((member) => (
          <li key={member.id} className="text-on-surface">
            {member.name}
          </li>
        ))}
      </ul>
    </div>
  </DialogContent>

  <DialogActions className="p-3 justify-center bg-surface rounded-b-lg">
    <Button
      variant="contained"
      onClick={handleClose}
      className="bg-primary text-on-primary hover:bg-primary-dark"
    >
      Close
    </Button>
  </DialogActions>
</Dialog>
  )
}

export default ViewTeamManagement
