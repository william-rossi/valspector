'use client'

import { MatchlistResponse } from '@/models/matchlist'
import { createContext, useState, ReactNode, useContext } from 'react'

interface MatchesContextType {
  matches: MatchlistResponse | null
  setMatches: (matches: MatchlistResponse | null) => void
  loadingMatches: boolean | null
  setLoadingMatches: (e: boolean) => void
}

const MatchesContext = createContext<MatchesContextType | undefined>(undefined)

export const MatchesProvider = ({ children }: { children: ReactNode }) => {
  const [matches, setMatches] = useState<MatchlistResponse | null>(null)
  const [loadingMatches, setLoadingMatches] = useState<boolean | null>(null)

  return (
    <MatchesContext.Provider value={{ matches, setMatches, loadingMatches, setLoadingMatches }}>
      {children}
    </MatchesContext.Provider>
  )
}

export const useMatches = (): MatchesContextType => {
  const context = useContext(MatchesContext)
  if (!context) {
    throw new Error('useMatches must be used within an MatchesProvider')
  }
  return context
}
