'use client'

import { Provider } from 'react-redux'
import { store } from '@/redux/store/store'
import { AuthProvider } from '@/redux/authProvider/authProvider'
import { ReactNode } from 'react'

interface StoreProviderProps {
  children: ReactNode
}

export default function StoreProvider({ children }: StoreProviderProps) {
  return (
    <Provider store={store}>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  )
}