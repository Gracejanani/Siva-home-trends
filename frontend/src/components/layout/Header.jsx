import React, { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
  Search,
  Heart,
  User,
  Menu,
  X,
  Phone,
  ChevronDown,
  ShieldCheck,
} from 'lucide-react'
import { useWishlist } from '../../context/WishlistContext'
import { useAuth } from '../../context/AuthContext'
import { searchProducts, STORE_NAME, STORE_WHATSAPP } from '../../services/api'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  {
    label: 'Shop',
    to: '/shop',
    children: [
      { label: 'All Sarees', to: '/shop' },
      { label: 'Pure Silk Sarees', to: '/shop/pure-silk-saree' },
      { label: 'Kanchi Cotton Sarees', to: '/shop/kanchi-cotton-saree' },
      { label: 'Soft Silk Sarees', to: '/shop/soft-silk-saree' },
      { label: 'Wedding & Bridal Silk', to: '/shop/wedding-saree' },
      { label: 'Tissue Sarees', to: '/shop/tissue-saree' },
      { label: 'New Arrivals', to: '/shop/new-arrivals' },
    ],
  },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Track Order', to: '/track-order' },
]

export default function Header() {
  const { wishlistCount } = useWishlist()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searchLoading, setSearchLoading] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const searchRef = useRef(null)
  const searchTimeout = useRef(null)

  // Sticky header shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close search on outside click
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false)
        setSearchResults([])
        setSearchQuery('')
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Live search with debounce
  useEffect(() => {
    clearTimeout(searchTimeout.current)
    if (!searchQuery.trim()) {
      setSearchResults([])
      return
    }
    searchTimeout.current = setTimeout(async () => {
      setSearchLoading(true)
      try {
        const data = await searchProducts(searchQuery)
        setSearchResults(data?.products?.slice(0, 5) || [])
      } catch {
        setSearchResults([])
      } finally {
        setSearchLoading(false)
      }
    }, 350)
    return () => clearTimeout(searchTimeout.current)
  }, [searchQuery])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
      setSearchResults([])
    }
  }

  const closeMobile = () => setMobileOpen(false)

  return (
    <>
      {/* Top announcement bar */}
      <div className="bg-primary text-white text-xs font-body text-center py-2 px-4 hidden md:block">
        <span>🌟 Free shipping on orders above ₹999 | </span>
        <a href="tel:+919488551771" className="underline hover:no-underline font-semibold">
          📞 +91 9488551771
        </a>
        <span> | Cash on Delivery Available</span>
      </div>

      {/* Main header */}
      <header
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
          scrolled ? 'shadow-md' : 'shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 text-brand-dark"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 sm:gap-3">
              <img
                src="/logo.jpg"
                alt="Siva Home Trends"
                className="h-10 sm:h-12 md:h-14 w-auto object-contain rounded-md"
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
              <div className="flex flex-col">
                <span className="font-heading text-lg sm:text-xl md:text-2xl text-primary font-bold leading-tight tracking-tight">
                  {STORE_NAME}
                </span>
                <span className="font-body text-[10px] sm:text-xs text-gold tracking-widest uppercase font-semibold">
                  Exclusive Sarees
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map((link) =>
                link.children ? (
                  <div
                    key={link.to}
                    className="relative group"
                    onMouseEnter={() => setOpenDropdown(link.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button className="flex items-center gap-1 font-body text-sm font-medium text-brand-body hover:text-primary transition-colors">
                      {link.label}
                      <ChevronDown size={14} />
                    </button>
                    {openDropdown === link.label && (
                      <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg py-2 min-w-[180px] border border-brand-border z-50">
                        {link.children.map((child) => (
                          <Link
                            key={child.to}
                            to={child.to}
                            className="block px-4 py-2 text-sm font-body text-brand-body hover:text-primary hover:bg-primary-light transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `font-body text-sm font-medium transition-colors ${
                        isActive ? 'text-primary' : 'text-brand-body hover:text-primary'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                )
              )}
            </nav>

            {/* Action icons */}
            <div className="flex items-center gap-3 md:gap-4">
              {/* Search */}
              <div ref={searchRef} className="relative">
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="p-1.5 text-brand-body hover:text-primary transition-colors"
                  aria-label="Search"
                >
                  <Search size={20} />
                </button>
                {searchOpen && (
                  <div className="absolute right-0 top-10 w-80 bg-white rounded-xl shadow-xl border border-brand-border z-50 p-3 animate-fade-in">
                    <form onSubmit={handleSearchSubmit}>
                      <div className="flex items-center gap-2 border border-brand-border rounded-lg px-3 py-2">
                        <Search size={16} className="text-brand-muted" />
                        <input
                          autoFocus
                          type="text"
                          placeholder="Search pure silk, kanchi cotton sarees..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="flex-1 outline-none font-body text-sm text-brand-dark placeholder-brand-muted"
                        />
                        {searchQuery && (
                          <button
                            type="button"
                            onClick={() => setSearchQuery('')}
                            className="text-brand-muted hover:text-brand-dark"
                          >
                            <X size={14} />
                          </button>
                        )}
                      </div>
                    </form>
                    {searchLoading && (
                      <p className="text-xs text-brand-muted font-body py-3 text-center">
                        Searching...
                      </p>
                    )}
                    {!searchLoading && searchResults.length > 0 && (
                      <ul className="mt-2 divide-y divide-brand-border">
                        {searchResults.map((p) => (
                          <li key={p.id}>
                            <Link
                              to={`/product/${p.slug}`}
                              onClick={() => {
                                setSearchOpen(false)
                                setSearchQuery('')
                                setSearchResults([])
                              }}
                              className="flex items-center gap-3 py-2 hover:bg-primary-light rounded-md px-2 transition-colors"
                            >
                              <img
                                src={p.images?.[0] || 'https://placehold.co/40x40/fff5f8/c4005b?text=SJ'}
                                alt={p.name}
                                className="w-10 h-10 object-cover rounded"
                              />
                              <div>
                                <p className="font-body text-sm text-brand-dark">
                                  {p.name}
                                </p>
                                <p className="font-body text-xs text-primary font-semibold">
                                  ₹{p.sale_price || p.price}
                                </p>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative p-1.5 text-brand-body hover:text-primary transition-colors"
                aria-label="Wishlist"
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* WhatsApp Order Button */}
              <a
                href={`https://wa.me/91${STORE_WHATSAPP}?text=Hi%20${encodeURIComponent(STORE_NAME)}%2C%20I%20would%20like%20to%20order%20sarees.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-xs transition-all shadow-sm border border-emerald-200/60"
                aria-label="Order on WhatsApp"
                title="Order on WhatsApp"
              >
                <svg className="w-4 h-4 fill-emerald-600 shrink-0" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span className="hidden sm:inline">WhatsApp Order</span>
              </a>

              {/* Account / Admin Portal */}
              <Link
                to="/admin"
                className="p-1.5 text-brand-body hover:text-primary transition-colors flex items-center gap-1"
                aria-label="Admin Portal"
                title="Admin Portal"
              >
                <ShieldCheck size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile nav drawer */}
        {mobileOpen && (
          <div className="md:hidden border-t border-brand-border bg-white animate-slide-up">
            <nav className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) =>
                link.children ? (
                  <div key={link.to}>
                    <p className="font-body text-xs font-semibold uppercase tracking-widest text-brand-muted px-2 py-1 mt-2">
                      {link.label}
                    </p>
                    {link.children.map((child) => (
                      <Link
                        key={child.to}
                        to={child.to}
                        onClick={closeMobile}
                        className="block px-4 py-2 font-body text-sm text-brand-body hover:text-primary hover:bg-primary-light rounded-md transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={closeMobile}
                    className="block px-2 py-2.5 font-body text-sm font-medium text-brand-body hover:text-primary hover:bg-primary-light rounded-md transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              )}
              {/* Mobile contact */}
              <a
                href={`tel:+91${STORE_WHATSAPP}`}
                className="flex items-center gap-2 px-2 py-2.5 font-body text-sm text-primary font-medium mt-2"
              >
                <Phone size={16} />
                +91 {STORE_WHATSAPP}
              </a>

              {/* Admin Portal shortcut for store owner on mobile */}
              <Link
                to="/admin"
                onClick={closeMobile}
                className="flex items-center gap-2 px-2 py-2.5 font-body text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-lg transition-colors mt-2"
              >
                <ShieldCheck size={16} />
                <span>Store Owner Admin Portal</span>
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
