import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

const WishlistContext = createContext(null)

const WISHLIST_KEY = 'sj_wishlist'

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(items))
    } catch (err) {
      console.error('Wishlist persistence error:', err)
    }
  }, [items])

  const addToWishlist = useCallback((product) => {
    setItems((prev) => {
      if (prev.some((p) => p.id === product.id)) return prev
      return [...prev, product]
    })
  }, [])

  const removeFromWishlist = useCallback((productId) => {
    setItems((prev) => prev.filter((p) => p.id !== productId))
  }, [])

  const isInWishlist = useCallback(
    (productId) => items.some((p) => p.id === productId),
    [items]
  )

  const toggleWishlist = useCallback(
    (product) => {
      if (isInWishlist(product.id)) {
        removeFromWishlist(product.id)
      } else {
        addToWishlist(product)
      }
    },
    [isInWishlist, addToWishlist, removeFromWishlist]
  )

  const clearWishlist = useCallback(() => setItems([]), [])

  const wishlistCount = items.length

  const value = {
    items,
    wishlistCount,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
    clearWishlist,
  }

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}

export default WishlistContext
