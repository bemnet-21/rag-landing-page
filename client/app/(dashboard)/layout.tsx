import AuthGuard from '@/components/AuthGuard'
import Header from '@/components/layout/Header'
import React from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <AuthGuard allowedRoles={["admin", "user"]}>
        <Header />
        {children}
    </AuthGuard>
  )
}

export default layout
