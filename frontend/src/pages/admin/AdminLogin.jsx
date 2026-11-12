import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ShieldCheck, Lock, Mail, Eye, EyeOff, ArrowLeft } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'
import { toast } from 'react-hot-toast'

export default function AdminLogin() {
  const { adminLogin, isAdminAuthenticated } = useAdmin()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // If already authenticated, redirect
  React.useEffect(() => {
    if (isAdminAuthenticated) {
      navigate('/admin', { replace: true })
    }
  }, [isAdminAuthenticated, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    const result = adminLogin(email, password)
    if (result.success) {
      toast.success('Welcome to Siva Home Trends Admin Panel!')
      navigate('/admin', { replace: true })
    } else {
      setError(result.error)
      toast.error(result.error)
    }
    setSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-dark via-gray-900 to-primary/80 flex flex-col justify-center items-center px-4 py-12 relative">
      {/* Back to store link */}
      <Link
        to="/"
        className="absolute top-6 left-6 text-white/80 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm"
      >
        <ArrowLeft size={16} />
        <span>Back to Store</span>
      </Link>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/20">
        {/* Header */}
        <div className="bg-primary text-white p-8 text-center relative">
          <div className="w-20 h-20 mx-auto mb-3 bg-white rounded-2xl p-2 shadow-lg flex items-center justify-center overflow-hidden">
            <img
              src="/logo.jpg"
              alt="Siva Home Trends Logo"
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          </div>
          <h1 className="font-heading text-2xl font-bold tracking-tight">
            Siva Home Trends
          </h1>
          <p className="text-white/80 text-xs uppercase tracking-widest mt-1 font-medium">
            Store Owner & Admin Portal
          </p>

          <div className="inline-flex items-center gap-1.5 bg-black/20 text-gold text-xs px-3 py-1 rounded-full mt-3">
            <ShieldCheck size={14} />
            <span>Authorized Access Only</span>
          </div>
        </div>

        {/* Form */}
        <div className="p-8 sm:p-10 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3.5 rounded-xl leading-relaxed">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-brand-dark uppercase tracking-wider mb-2">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="gracejana123@gmail.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-brand-border focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm outline-none transition-all"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-dark uppercase tracking-wider mb-2">
                Admin Security Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted"
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-11 pr-11 py-3 rounded-xl border border-brand-border focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm outline-none transition-all"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-dark transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary hover:bg-primary-hover active:scale-[0.99] text-white py-3.5 rounded-xl font-semibold text-sm shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2"
            >
              <Lock size={16} />
              <span>{submitting ? 'Verifying...' : 'Sign In To Admin Panel'}</span>
            </button>
          </form>

          <div className="pt-4 border-t border-brand-border/60 text-center">
            <p className="text-xs text-brand-muted">
              WhatsApp Configuration: <strong>+91 9488551771</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
