import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { AuthProvider } from './context/AuthContext'

// Lazy page imports for better performance
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Checkout from './pages/Checkout'
import Account from './pages/Account'
import TrackOrder from './pages/TrackOrder'
import PolicyPage from './pages/PolicyPage'
import NotFound from './pages/NotFound'
import Layout from './components/layout/Layout'

/** Scroll to top whenever the route changes */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <ScrollToTop />
          <Routes>
            <Route element={<Layout />}>
              {/* Main pages */}
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/:categorySlug" element={<Shop />} />
              <Route path="/product/:slug" element={<ProductDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              {/* Cart & commerce */}
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/checkout" element={<Checkout />} />

              {/* Account */}
              <Route path="/account" element={<Account />} />

              {/* Utilities */}
              <Route path="/track-order" element={<TrackOrder />} />

              {/* Policy pages — pass type via element prop */}
              <Route
                path="/terms-condition"
                element={<PolicyPage type="terms" />}
              />
              <Route
                path="/privacy-policy"
                element={<PolicyPage type="privacy" />}
              />
              <Route
                path="/shipping-policy"
                element={<PolicyPage type="shipping" />}
              />
              <Route
                path="/returns-exchanges"
                element={<PolicyPage type="returns" />}
              />
              <Route
                path="/cancellation-policy"
                element={<PolicyPage type="cancellation" />}
              />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  )
}
