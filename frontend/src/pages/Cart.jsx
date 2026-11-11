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

  const handleOrderViaWhatsApp = () => {
    let msg = `Hello SJ Sri Jananin Saree,\n\nI would like to place an order for the following items:\n\n`
    items.forEach((item, i) => {
      const prod = item.product || item
      const price = item.variation?.sale_price || item.variation?.price || prod.sale_price || prod.price || 0
      const colorStr = item.variation?.color ? ` (${item.variation.color})` : ''
      msg += `${i + 1}. ${prod.name}${colorStr} - Qty: ${item.quantity} x ${formatPrice(price)}\n`
    })
    msg += `\nSubtotal: ${formatPrice(subtotal)}\nShipping: ${shipping === 0 ? 'FREE' : formatPrice(shipping)}\nTotal: ${formatPrice(finalTotal)}\n\nPlease confirm availability and payment details.`
    window.open(`https://wa.me/919025574074?text=${encodeURIComponent(msg)}`, '_blank')
  }

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

            <button
              onClick={handleOrderViaWhatsApp}
              className="w-full bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.98] text-white py-3.5 rounded-xl font-semibold text-base flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-500/25 transition-all"
            >
              <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>Order via WhatsApp</span>
            </button>

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
