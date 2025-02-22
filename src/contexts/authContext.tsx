'use client'

import type { ReactNode } from 'react'
import { createContext, useContext, useState, useEffect } from 'react'

interface RoleDetails {
  role: string
  permissions: string[]
}

interface AuthContextType {
  roleDetails: RoleDetails | null
  setRoleDetails: (details: RoleDetails) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [roleDetails, setRoleDetails] = useState<RoleDetails | null>(null)

  useEffect(() => {
    console.log('AuthProvider Mounted. Current Role Details:', roleDetails)
  }, [roleDetails]) // Logs when roleDetails change

  return <AuthContext.Provider value={{ roleDetails, setRoleDetails }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
