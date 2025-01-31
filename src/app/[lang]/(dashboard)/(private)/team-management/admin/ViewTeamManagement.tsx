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
      <DialogTitle className="flex flex-col gap-4 items-center p-6 rounded-t-lg text-center bg-surface-variant">
        <Typography
          variant="h4"
          className="font-bold text-lg text-on-surface-variant text-primary"
        >
          Team Details
        </Typography>
        <Typography className="text-sm text-on-surface-variant-secondary">
          Here you can view the details of the team.
        </Typography>
      </DialogTitle>

      <DialogContent className="px-6 py-4 bg-surface">
        {/* 3 Columns in the first row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Team Name */}
          <div className="p-4 rounded-lg bg-surface-variant">
            <Typography className="font-medium text-on-surface-variant text-primary">
              Team Name:
            </Typography>
            <Typography className="text-on-surface">{teamData.teamname}</Typography>
          </div>

          {/* Description */}
          <div className="p-4 rounded-lg bg-surface-variant">
            <Typography className="font-medium text-on-surface-variant text-primary">
              Description:
            </Typography>
            <Typography className="text-on-surface">{teamData.description}</Typography>
          </div>

          {/* Status */}
          <div className="p-4 rounded-lg bg-surface-variant">
            <Typography className="font-medium text-on-surface-variant text-primary">
              Status:
            </Typography>
            <Typography className="text-on-surface">{teamData.status}</Typography>
          </div>
        </div>

        {/* 3 Columns in the second row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
          {/* Team Lead */}
          <div className="p-4 rounded-lg bg-surface-variant">
            <Typography className="font-medium text-on-surface-variant text-primary">
              Team Lead:
            </Typography>
            <Typography className="text-on-surface">{teamData.teamLead}</Typography>
          </div>

          {/* Tech Stack */}
          <div className="p-4 rounded-lg bg-surface-variant">
            <Typography className="font-medium text-on-surface-variant text-primary">
              Tech Stack:
            </Typography>
            <Typography className="text-on-surface">
              {teamData.techStack.join(', ')}
            </Typography>
          </div>

          {/* Empty Placeholder or Additional Info */}
          <div className="p-4 rounded-lg bg-surface-variant">
            {/* Add more content here if necessary */}
          </div>
        </div>

        {/* Single Column in the last row */}
        <div className="grid grid-cols-1 gap-6 mt-6">
          <div className="p-4 rounded-lg bg-surface-variant">
            <Typography className="font-medium text-on-surface-variant text-primary">
              Members:
            </Typography>
            <ul className="list-disc ml-5">
              {teamData.members.map((member) => (
                <li key={member.id} className="text-on-surface">
                  {member.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>

      <DialogActions className="p-4 justify-center bg-surface rounded-b-lg">
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
