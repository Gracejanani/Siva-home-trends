import React, { useState } from 'react'
import { X, Mail, Lock, User, ArrowRight } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { toast } from 'react-hot-toast'

export default function AuthModal({ isOpen, onClose }) {
  const [tab, setTab] = useState('signin') // 'signin' | 'register'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)

  const { signIn, signUp } = useAuth()

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (tab === 'signin') {
        const { error } = await signIn(email, password)
        if (error) throw error
        toast.success('Welcome back!')
        onClose()
      } else {
        const { error } = await signUp(email, password, { full_name: fullName })
        if (error) throw error
        toast.success('Registration successful! Please check your email or log in.')
        setTab('signin')
      }
    } catch (err) {
      toast.error(err.message || 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-5 right-5 text-brand-muted hover:text-brand-dark"
          >
            <X size={20} />
          </button>

          {/* Brand header */}
          <div className="text-center mb-6">
            <span className="text-2xl font-bold font-heading text-primary">
              Siva Home Trends
            </span>
            <p className="text-xs text-brand-muted mt-1 uppercase tracking-wider">
              Traditional Handloom Sarees
            </p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-brand-border/60 mb-6">
            <button
              onClick={() => setTab('signin')}
              className={`flex-1 pb-3 text-sm font-semibold transition-colors relative ${
                tab === 'signin' ? 'text-primary' : 'text-brand-muted hover:text-brand-dark'
              }`}
            >
              Sign In
              {tab === 'signin' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
            <button
              onClick={() => setTab('register')}
              className={`flex-1 pb-3 text-sm font-semibold transition-colors relative ${
                tab === 'register' ? 'text-primary' : 'text-brand-muted hover:text-brand-dark'
              }`}
            >
              Register
              {tab === 'register' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === 'register' && (
              <div>
                <label className="block text-xs font-medium text-brand-dark mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-3 text-brand-muted" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full text-sm pl-10 pr-4 py-2.5 border border-brand-border rounded-xl focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-brand-dark mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-3 text-brand-muted" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full text-sm pl-10 pr-4 py-2.5 border border-brand-border rounded-xl focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-brand-dark mb-1">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-3 text-brand-muted" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-sm pl-10 pr-4 py-2.5 border border-brand-border rounded-xl focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-primary hover:bg-primary-hover text-white py-3 rounded-xl font-medium text-sm transition-colors flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
            >
              <span>{loading ? 'Please wait...' : tab === 'signin' ? 'Sign In' : 'Create Account'}</span>
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
