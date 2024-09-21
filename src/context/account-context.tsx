'use client'

import { AccountResponse } from '@/models/account'
import { MmrResponse } from '@/models/mmr'
import { createContext, useState, ReactNode, useContext, useEffect } from 'react'

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

  useEffect(() => {
    if (account)
      localStorage.setItem("account", JSON.stringify(account))
    if (mmr)
      localStorage.setItem("mmr", JSON.stringify(mmr))
  }, [account, mmr])

  useEffect(() => {
    const accountStorage = localStorage.getItem('account')
    const mmrStorage = localStorage.getItem('mmr')

    if (accountStorage)
      setAccount(JSON.parse(accountStorage) as AccountResponse)
    if (mmrStorage)
      setMmr(JSON.parse(mmrStorage) as MmrResponse)
  }, [])

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
