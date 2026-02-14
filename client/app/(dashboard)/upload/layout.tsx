import AuthGuard from '@/components/AuthGuard'
import React from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <AuthGuard allowedRoles={['admin']} >
        {children}
    </AuthGuard>
  )
}

export default layout
