import React from 'react'
import { Link } from 'react-router-dom'
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../utils/helpers'

export default function CartDrawer({ isOpen, onClose }) {
  const { items, removeFromCart, updateQuantity, cartSubtotal, cartTotal } = useCart()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-brand-border/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="text-primary" size={20} />
              <h3 className="font-heading text-2xl font-semibold text-brand-dark">
                Shopping Cart
              </h3>
            </div>
            <button
              onClick={onClose}
              aria-label="Close cart drawer"
              className="text-brand-muted hover:text-brand-dark p-2"
            >
              <X size={20} />
            </button>
          </div>

          {/* Items Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {!items || items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 rounded-full bg-primary-light flex items-center justify-center text-primary mb-4">
                  <ShoppingBag size={36} />
                </div>
                <h4 className="font-heading text-2xl font-semibold text-brand-dark mb-1">
                  Your cart is empty
                </h4>
                <p className="text-brand-muted text-sm max-w-xs mb-6">
                  Looks like you haven’t added any sarees or jewellery to your cart yet.
                </p>
                <button
                  onClick={onClose}
                  className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors"
                >
                  Return To Shop
                </button>
              </div>
            ) : (
              items.map((item, idx) => {
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
                  <div key={idx} className="flex gap-4 pb-6 border-b border-brand-border/40">
                    <img
                      src={image}
                      alt={product.name}
                      className="w-20 h-24 object-cover rounded-lg border border-brand-border/60"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h5 className="font-heading text-base font-semibold text-brand-dark line-clamp-1">
                            {product.name}
                          </h5>
                          <button
                            onClick={() => removeFromCart(product.id, item.variation?.id)}
                            className="text-brand-muted hover:text-red-500 transition-colors ml-2"
                            aria-label="Remove item"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        {item.variation && (
                          <span className="text-xs text-brand-muted block mt-0.5">
                            {item.variation.color} {item.variation.size ? `· ${item.variation.size}` : ''}
                          </span>
                        )}
                        <span className="text-primary font-semibold text-sm mt-1 block">
                          {formatPrice(price)}
                        </span>
                      </div>

                      {/* Quantity stepper */}
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center border border-brand-border rounded-lg overflow-hidden text-xs">
                          <button
                            onClick={() =>
                              updateQuantity(product.id, item.variation?.id, Math.max(1, item.quantity - 1))
                            }
                            className="px-2.5 py-1 hover:bg-gray-100 text-brand-dark"
                          >
                            -
                          </button>
                          <span className="px-3 py-1 font-medium">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(product.id, item.variation?.id, item.quantity + 1)
                            }
                            className="px-2.5 py-1 hover:bg-gray-100 text-brand-dark"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-xs font-semibold text-brand-dark ml-auto">
                          {formatPrice(price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {/* Footer / Checkout */}
          {items && items.length > 0 && (
            <div className="p-6 border-t border-brand-border/60 bg-gray-50/50 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-brand-muted">Subtotal</span>
                <span className="font-bold text-brand-dark text-lg">
                  {formatPrice(cartSubtotal || cartTotal)}
                </span>
              </div>
              <p className="text-xs text-brand-muted">
                Taxes and shipping calculated at checkout.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Link
                  to="/cart"
                  onClick={onClose}
                  className="w-full text-center border-2 border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white py-3 rounded-full text-sm font-semibold transition-colors"
                >
                  View Cart
                </Link>
                <Link
                  to="/checkout"
                  onClick={onClose}
                  className="w-full text-center bg-primary hover:bg-primary-hover text-white py-3 rounded-full text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-md"
                >
                  <span>Checkout</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
