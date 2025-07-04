'use client'

import { Profile } from "@/lib/definitions"
import { createContext, useContext, useState, ReactNode } from "react"

interface ProfileContextType {
  selectedProfile: Profile | null
  setSelectedProfile: (profile: Profile) => void
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

export function ProfileProvider({ 
  children,
  initialProfile
}: { 
  children: ReactNode
  initialProfile: Profile
}) {
  const [selectedProfile, setSelectedProfile] = useState<Profile>(initialProfile)

  return (
    <ProfileContext.Provider value={{ selectedProfile, setSelectedProfile }}>
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  const context = useContext(ProfileContext)
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider')
  }
  return context
} 