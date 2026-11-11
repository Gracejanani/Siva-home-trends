import React from 'react'
import { Link } from 'react-router-dom'
import { Home, ShoppingBag } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center p-8 text-center bg-white">
      <span className="font-heading text-8xl md:text-9xl font-bold text-primary/20 select-none">
        404
      </span>
      <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-brand-dark -mt-6 mb-3">
        Page Not Found
      </h1>
      <p className="text-brand-muted text-sm max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        <Link to="/" className="btn-primary flex items-center gap-2">
          <Home size={18} />
          <span>Go to Homepage</span>
        </Link>
        <Link to="/shop" className="btn-outline flex items-center gap-2">
          <ShoppingBag size={18} />
          <span>Browse Shop</span>
        </Link>
      </div>
    </div>
  )
}
