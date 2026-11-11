import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

const CartContext = createContext(null)

const CART_KEY = 'sj_cart'
const FREE_SHIPPING_THRESHOLD = 999
const SHIPPING_COST = 50

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem(CART_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  // Persist to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items))
    } catch (err) {
      console.error('Cart persistence error:', err)
    }
  }, [items])

  /**
   * Add a product (optionally with a variation) to the cart.
   * If the same product+variation already exists, increment quantity.
   */
  const addToCart = useCallback((product, variation = null, quantity = 1) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          (variation ? item.variation?.id === variation.id : !item.variation)
      )

      if (existingIndex !== -1) {
        const updated = [...prev]
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        }
        return updated
      }

      return [...prev, { product, variation, quantity }]
    })
  }, [])

  /**
   * Remove a product (by productId + optional variationId) from the cart.
   */
  const removeFromCart = useCallback((productId, variationId = null) => {
    setItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            (variationId ? item.variation?.id === variationId : !item.variation)
          )
      )
    )
  }, [])

  /**
   * Set a specific quantity for a product+variation line.
   * If qty <= 0, removes the item.
   */
  const updateQuantity = useCallback((productId, variationId = null, qty) => {
    if (qty <= 0) {
      removeFromCart(productId, variationId)
      return
    }
    setItems((prev) =>
      prev.map((item) => {
        const matches =
          item.product.id === productId &&
          (variationId ? item.variation?.id === variationId : !item.variation)
        return matches ? { ...item, quantity: qty } : item
      })
    )
  }, [removeFromCart])

  /** Remove all items from the cart. */
  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  // ─── Computed values ────────────────────────────────────────────────────────

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const cartSubtotal = items.reduce((sum, item) => {
    const price =
      item.variation?.sale_price ??
      item.variation?.price ??
      item.product.sale_price ??
      item.product.price ??
      0
    return sum + price * item.quantity
  }, 0)

  const shippingCost = cartSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const cartTotal = cartSubtotal + shippingCost

  const value = {
    items,
    cartCount,
    cartSubtotal,
    shippingCost,
    cartTotal,
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export default CartContext
