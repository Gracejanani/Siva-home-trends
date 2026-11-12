import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Sparkles, Heart, ShieldCheck } from 'lucide-react'
import { useWishlist } from '../../context/WishlistContext'
import { useAdmin } from '../../context/AdminContext'
import { STORE_WHATSAPP } from '../../services/api'

export default function MobileBottomNav() {
  const { pathname } = useLocation()
  const { wishlistCount } = useWishlist()
  const { isAdminAuthenticated } = useAdmin()

  // Don't show bottom nav inside admin dashboard to avoid layout clash
  if (pathname.startsWith('/admin')) {
    return null
  }

  const isHome = pathname === '/'
  const isShop = pathname.startsWith('/shop')
  const isWishlist = pathname === '/wishlist'

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-brand-border/70 z-40 md:hidden safe-area-pb shadow-lg"
    >
      <div className="grid grid-cols-5 h-16 items-center px-1">
        {/* 1. Home */}
        <Link
          to="/"
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            isHome ? 'text-primary font-bold' : 'text-brand-muted hover:text-brand-dark'
          }`}
        >
          <Home size={20} className={isHome ? 'stroke-[2.5]' : ''} />
          <span className="text-[10px] mt-1 tracking-tight">Home</span>
        </Link>

        {/* 2. Sarees / Shop */}
        <Link
          to="/shop"
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            isShop ? 'text-primary font-bold' : 'text-brand-muted hover:text-brand-dark'
          }`}
        >
          <Sparkles size={20} className={isShop ? 'stroke-[2.5]' : ''} />
          <span className="text-[10px] mt-1 tracking-tight">Sarees</span>
        </Link>

        {/* 3. Direct WhatsApp Action (Center elevated highlight) */}
        <a
          href={`https://wa.me/91${STORE_WHATSAPP}?text=Hello%20Siva%20Home%20Trends%2C%20I%20am%20interested%20in%20your%20saree%20collection.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center -mt-4"
          aria-label="Order on WhatsApp"
        >
          <div className="w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 transition-transform">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
          </div>
          <span className="text-[10px] mt-0.5 text-emerald-700 font-semibold tracking-tight">Order</span>
        </a>

        {/* 4. Wishlist */}
        <Link
          to="/wishlist"
          className={`flex flex-col items-center justify-center py-1 relative transition-colors ${
            isWishlist ? 'text-primary font-bold' : 'text-brand-muted hover:text-brand-dark'
          }`}
        >
          <div className="relative">
            <Heart size={20} className={isWishlist ? 'stroke-[2.5] fill-primary text-primary' : ''} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-primary text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight">Wishlist</span>
        </Link>

        {/* 5. Admin / Owner */}
        <Link
          to="/admin"
          className="flex flex-col items-center justify-center py-1 text-brand-muted hover:text-primary transition-colors"
          title="Admin Panel"
        >
          <div className="relative">
            <ShieldCheck size={20} className={isAdminAuthenticated ? 'text-primary' : ''} />
            {isAdminAuthenticated && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight">Admin</span>
        </Link>
      </div>
    </nav>
  )
}
