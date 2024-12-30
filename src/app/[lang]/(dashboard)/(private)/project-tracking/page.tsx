'use client'
import React, { useEffect, useState } from 'react'

import { Box } from '@mui/material' // or the appropriate library

interface User {
  id: number
  name: string
  role: string
}

const UserDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Simulate fetching user info (replace with actual API call)
    const fetchUser = async () => {
      const response = await fetch('/api/auth?role=user') // Adjust API endpoint as necessary
      const data = await response.json()

      setUser(data)
    }

    fetchUser()
  }, [])

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <Box>
      <h1>Welcome, {user.name}!</h1>
      <p>This is your user dashboard.</p>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', flex: '1 0 30%' }}>
          <h3>Your Profile</h3>
          <p>View and edit your personal information.</p>
        </div>
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', flex: '1 0 30%' }}>
          <h3>Your Notifications</h3>
          <p>Stay updated with the latest updates.</p>
        </div>
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', flex: '1 0 30%' }}>
          <h3>Account Settings</h3>
          <p>Manage your preferences and account security.</p>
        </div>
      </div>
    </Box>
  )
}

export default UserDashboard
