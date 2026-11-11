import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingBag, Trash2 } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/helpers'
import { toast } from 'react-hot-toast'

export default function Wishlist() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()

  if (!items || items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-8 bg-white">
        <div className="w-24 h-24 rounded-full bg-primary-light flex items-center justify-center text-primary mb-6">
          <Heart size={48} />
        </div>
        <h2 className="font-heading text-3xl font-semibold text-brand-dark mb-2">
          Your Wishlist is Empty
        </h2>
        <p className="text-brand-muted text-sm max-w-sm mb-8">
          Explore our sarees and temple jewellery collections and save your favorite pieces here.
        </p>
        <Link to="/shop" className="btn-primary">
          Explore Boutique
        </Link>
      </div>
    )
  }

  const handleMoveToCart = (product) => {
    addToCart(product, null, 1)
    removeFromWishlist(product.id)
    toast.success('Moved to cart!')
  }

  return (
    <div className="bg-gray-50/50 min-h-screen py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-brand-dark">
            My Wishlist ({items.length})
          </h1>
          <button
            onClick={clearWishlist}
            className="text-xs text-brand-muted hover:text-red-500 transition-colors"
          >
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((product) => {
            const isSale = product.sale_price && product.sale_price < product.price
            const image =
              (Array.isArray(product.images) && product.images[0]) ||
              product.image_url ||
              product.image

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-brand-border/60 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="relative aspect-[4/5] bg-gray-100">
                  <img
                    src={image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    aria-label="Remove from wishlist"
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 text-brand-muted hover:text-red-500 shadow-sm flex items-center justify-center transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] text-brand-muted uppercase tracking-wider block mb-1">
                      {product.categories?.name || 'Exclusive Saree'}
                    </span>
                    <Link
                      to={`/product/${product.slug || product.id}`}
                      className="font-heading text-lg font-semibold text-brand-dark hover:text-primary transition-colors line-clamp-1"
                    >
                      {product.name}
                    </Link>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-primary font-bold">
                        {formatPrice(isSale ? product.sale_price : product.price)}
                      </span>
                      {isSale && (
                        <span className="text-xs text-brand-muted line-through">
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleMoveToCart(product)}
                    className="mt-4 w-full bg-primary hover:bg-primary-hover text-white text-xs font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag size={14} />
                    <span>Move To Cart</span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
