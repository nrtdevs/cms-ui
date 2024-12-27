'use client'

import React, { useEffect, useState } from 'react'

import { Box } from '@mui/material'

interface Admin {
  id: number
  name: string
  role: string
}

const AdminDashboard: React.FC = () => {
  const [admin, setAdmin] = useState<Admin | null>(null)

  useEffect(() => {
    // Simulate fetching admin info (replace with actual API call)
    const fetchAdmin = async () => {
      const response = await fetch('/api/auth?role=admin') // Adjust API endpoint as necessary
      const data = await response.json()

      setAdmin(data)
    }

    fetchAdmin()
  }, [])

  if (!admin) {
    return <div>Loading...</div>
  }

  return (
    <Box>
      <h1>Welcome, Admin {admin.name}!</h1>
      <p>This is your admin dashboard.</p>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', flex: '1 0 30%' }}>
          <h3>Manage Users</h3>
          <p>View, edit, and delete user accounts.</p>
        </div>
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', flex: '1 0 30%' }}>
          <h3>View Reports</h3>
          <p>Analyze system data and performance metrics.</p>
        </div>
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', flex: '1 0 30%' }}>
          <h3>System Settings</h3>
          <p>Configure application settings and preferences.</p>
        </div>
      </div>
    </Box>
  )
}

export default AdminDashboard
