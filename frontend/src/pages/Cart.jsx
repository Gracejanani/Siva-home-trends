import React from 'react'
import { Link } from 'react-router-dom'
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/helpers'

export default function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart, cartSubtotal, cartTotal } = useCart()

  const subtotal = cartSubtotal || cartTotal || 0
  const freeShippingThreshold = 999
  const shipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 50
  const finalTotal = subtotal + shipping

  if (!items || items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-8 bg-white">
        <div className="w-24 h-24 rounded-full bg-primary-light flex items-center justify-center text-primary mb-6">
          <ShoppingBag size={48} />
        </div>
        <h2 className="font-heading text-3xl font-semibold text-brand-dark mb-2">
          Your Cart is Currently Empty
        </h2>
        <p className="text-brand-muted text-sm max-w-sm mb-8">
          Before proceed to checkout you must add some products to your shopping cart.
        </p>
        <Link to="/shop" className="btn-primary">
          Return To Shop
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-gray-50/50 min-h-screen py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-brand-dark mb-8">
          Shopping Cart ({items.length} items)
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Cart Table List */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-brand-border/60 p-6 shadow-sm">
            <div className="divide-y divide-brand-border/50">
              {items.map((item, idx) => {
                const product = item.product || item
                const price =
                  item.variation?.sale_price ||
                  item.variation?.price ||
                  product.sale_price ||
                  product.price ||
                  0
                const image =
                  item.variation?.image_url ||
                  (Array.isArray(product.images) && product.images[0]) ||
                  product.image_url ||
                  product.image

                return (
                  <div key={idx} className="py-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="flex gap-4 items-center">
                      <img
                        src={image}
                        alt={product.name}
                        className="w-20 h-24 sm:w-24 sm:h-28 object-cover rounded-xl border border-brand-border/60 shrink-0"
                      />
                      <div>
                        <Link
                          to={`/product/${product.slug || product.id}`}
                          className="font-heading text-lg font-semibold text-brand-dark hover:text-primary transition-colors line-clamp-1"
                        >
                          {product.name}
                        </Link>
                        {item.variation && (
                          <span className="text-xs text-brand-muted block mt-0.5">
                            Color: {item.variation.color} {item.variation.size ? `· Size: ${item.variation.size}` : ''}
                          </span>
                        )}
                        <span className="text-primary font-bold text-sm mt-1 block">
                          {formatPrice(price)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 self-end sm:self-center">
                      {/* Quantity stepper */}
                      <div className="flex items-center border border-brand-border rounded-xl overflow-hidden text-sm">
                        <button
                          onClick={() =>
                            updateQuantity(product.id, item.variation?.id, Math.max(1, item.quantity - 1))
                          }
                          className="px-3 py-1.5 hover:bg-gray-100 text-brand-dark"
                        >
                          -
                        </button>
                        <span className="px-4 py-1.5 font-medium">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(product.id, item.variation?.id, item.quantity + 1)
                          }
                          className="px-3 py-1.5 hover:bg-gray-100 text-brand-dark"
                        >
                          +
                        </button>
                      </div>

                      {/* Subtotal */}
                      <span className="font-body font-bold text-brand-dark w-24 text-right">
                        {formatPrice(price * item.quantity)}
                      </span>

                      {/* Remove */}
                      <button
                        onClick={() => removeFromCart(product.id, item.variation?.id)}
                        className="text-brand-muted hover:text-red-500 transition-colors p-2"
                        aria-label="Remove item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-brand-border/60">
              <Link to="/shop" className="text-sm font-semibold text-primary hover:underline">
                ← Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="text-xs text-brand-muted hover:text-red-500 transition-colors"
              >
                Clear Shopping Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl border border-brand-border/60 p-6 shadow-sm space-y-6 sticky top-24">
            <h3 className="font-heading text-2xl font-semibold text-brand-dark pb-4 border-b border-brand-border/60">
              Order Summary
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-brand-body">
                <span>Subtotal</span>
                <span className="font-semibold text-brand-dark">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-brand-body">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-emerald-600 font-semibold">FREE</span>
                  ) : (
                    formatPrice(shipping)
                  )}
                </span>
              </div>
              {subtotal < freeShippingThreshold && (
                <p className="text-xs text-brand-muted bg-primary-light p-2.5 rounded-lg">
                  Add <strong>{formatPrice(freeShippingThreshold - subtotal)}</strong> more to unlock Free Shipping!
                </p>
              )}
              <div className="border-t border-brand-border/60 pt-4 flex justify-between text-lg font-bold text-brand-dark">
                <span>Total Amount</span>
                <span className="text-primary">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="w-full bg-primary hover:bg-primary-hover text-white py-3.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/25 transition-all"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} />
            </Link>

            <div className="pt-2 flex items-center justify-center gap-2 text-xs text-brand-muted">
              <ShieldCheck size={16} className="text-emerald-600" />
              <span>Safe & Secure 256-Bit SSL Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
