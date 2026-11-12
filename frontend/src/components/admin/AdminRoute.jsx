import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAdmin } from '../../context/AdminContext'

export default function AdminRoute({ children }) {
  const { isAdminAuthenticated, loading } = useAdmin()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}
