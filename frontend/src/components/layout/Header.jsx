import React, { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  Phone,
  ChevronDown,
} from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { useAuth } from '../../context/AuthContext'
import { searchProducts } from '../../services/api'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  {
    label: 'Shop',
    to: '/shop',
    children: [
      { label: 'All Products', to: '/shop' },
      { label: 'Silk Sarees', to: '/shop/silk-sarees' },
      { label: 'Cotton Sarees', to: '/shop/cotton-sarees' },
      { label: 'Designer Sarees', to: '/shop/designer-sarees' },
      { label: 'Jewellery', to: '/shop/jewellery' },
      { label: 'New Arrivals', to: '/shop/new-arrivals' },
    ],
  },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Track Order', to: '/track-order' },
]

export default function Header() {
  const { cartCount } = useCart()
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
        <a href="tel:+919025574074" className="underline hover:no-underline">
          📞 +91 90255 74074
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
            <Link to="/" className="flex flex-col items-center md:items-start">
              <span className="font-heading text-xl md:text-2xl text-primary font-bold leading-tight">
                SJ Sri Jananin
              </span>
              <span className="font-body text-xs text-gold tracking-widest uppercase">
                Saree & Jewellery
              </span>
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
                          placeholder="Search sarees, jewellery..."
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

              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-1.5 text-brand-body hover:text-primary transition-colors"
                aria-label="Cart"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Account */}
              <Link
                to="/account"
                className="p-1.5 text-brand-body hover:text-primary transition-colors"
                aria-label="Account"
              >
                <User size={20} />
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
                href="tel:+919025574074"
                className="flex items-center gap-2 px-2 py-2.5 font-body text-sm text-primary font-medium mt-2"
              >
                <Phone size={16} />
                +91 90255 74074
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
