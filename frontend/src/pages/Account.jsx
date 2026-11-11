import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { User, Package, Heart, LogOut, MapPin, Mail, Phone } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import AuthModal from '../components/auth/AuthModal'

export default function Account() {
  const { user, signOut } = useAuth()
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('orders')

  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center bg-white">
        <div className="w-20 h-20 rounded-full bg-primary-light flex items-center justify-center text-primary mb-6">
          <User size={40} />
        </div>
        <h2 className="font-heading text-3xl font-semibold text-brand-dark mb-2">
          My Account
        </h2>
        <p className="text-brand-muted text-sm max-w-sm mb-6">
          Please sign in to track your orders, view saved wishlist items, and manage addresses.
        </p>
        <button
          onClick={() => setAuthModalOpen(true)}
          className="btn-primary"
        >
          Sign In / Register
        </button>
        <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      </div>
    )
  }

  return (
    <div className="bg-gray-50/50 min-h-screen py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-primary font-semibold">
              Account Dashboard
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-brand-dark">
              Hello, {user.user_metadata?.full_name || user.email?.split('@')[0] || 'Customer'}
            </h1>
          </div>
          <button
            onClick={signOut}
            className="inline-flex items-center gap-2 text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 px-4 py-2 rounded-xl transition-colors"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Navigation Sidebar */}
          <div className="bg-white rounded-2xl border border-brand-border/60 p-4 space-y-2 shadow-sm">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'orders'
                  ? 'bg-primary text-white'
                  : 'text-brand-dark hover:bg-primary-light hover:text-primary'
              }`}
            >
              <Package size={18} />
              <span>My Orders</span>
            </button>
            <Link
              to="/wishlist"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-brand-dark hover:bg-primary-light hover:text-primary transition-colors"
            >
              <Heart size={18} />
              <span>Wishlist</span>
            </Link>
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'profile'
                  ? 'bg-primary text-white'
                  : 'text-brand-dark hover:bg-primary-light hover:text-primary'
              }`}
            >
              <User size={18} />
              <span>Profile & Addresses</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-brand-border/60 p-8 shadow-sm">
            {activeTab === 'orders' && (
              <div>
                <h3 className="font-heading text-2xl font-semibold text-brand-dark mb-4">
                  Order History
                </h3>
                <div className="text-center py-12 border border-dashed border-brand-border/60 rounded-xl">
                  <Package size={36} className="mx-auto text-brand-muted mb-2" />
                  <p className="text-brand-muted text-sm mb-4">No recent orders found.</p>
                  <Link to="/shop" className="btn-primary text-xs">
                    Start Shopping
                  </Link>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div>
                <h3 className="font-heading text-2xl font-semibold text-brand-dark mb-6">
                  Profile Details
                </h3>
                <div className="space-y-4 max-w-md text-sm text-brand-body">
                  <div className="flex items-center gap-3">
                    <User size={18} className="text-primary" />
                    <span>{user.user_metadata?.full_name || 'Not provided'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-primary" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={18} className="text-primary" />
                    <span>Tamil Nadu, India</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
