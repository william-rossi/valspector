'use client'

import { AccountResponse } from '@/models/account'
import { MmrResponse } from '@/models/mmr'
import { createContext, useState, ReactNode, useContext } from 'react'

interface AccountContextType {
  mmr: MmrResponse | null
  setMmr: (mmr: MmrResponse | null) => void
  account: AccountResponse | null
  setAccount: (account: AccountResponse | null) => void
}

const AccountContext = createContext<AccountContextType | undefined>(undefined)

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState<AccountResponse | null>(null)
  const [mmr, setMmr] = useState<MmrResponse | null>(null)

  return (
    <AccountContext.Provider value={{ account, setAccount, mmr, setMmr }}>
      {children}
    </AccountContext.Provider>
  )
}

export const useAccount = (): AccountContextType => {
  const context = useContext(AccountContext)
  if (!context) {
    throw new Error('useAccount must be used within an AccountProvider')
  }
  return context
}
