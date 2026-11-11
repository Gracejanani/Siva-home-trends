import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { formatPrice } from '../../utils/helpers'

export default function ProductCard({ product, onQuickView }) {
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()

  if (!product) return null

  const isWishlisted = isInWishlist(product.id)
  const isSale = product.sale_price && product.sale_price < product.price
  const discountPercent =
    product.discount_percentage ||
    (isSale ? Math.round(((product.price - product.sale_price) / product.price) * 100) : 0)

  // Fallback image
  const displayImage =
    (Array.isArray(product.images) && product.images[0]) ||
    product.image_url ||
    product.image ||
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80'

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, null, 1)
  }

  const handleToggleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product)
  }

  return (
    <div className="product-card group relative bg-white border border-brand-border/60 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Top badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {isSale && (
          <span className="bg-primary text-white text-[11px] font-semibold px-2 py-0.5 rounded-full tracking-wide">
            -{discountPercent}%
          </span>
        )}
        {product.is_new_arrival && (
          <span className="bg-emerald-600 text-white text-[11px] font-semibold px-2 py-0.5 rounded-full tracking-wide">
            NEW
          </span>
        )}
      </div>

      {/* Wishlist button */}
      <button
        onClick={handleToggleWishlist}
        aria-label="Wishlist"
        className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${
          isWishlisted
            ? 'bg-primary text-white'
            : 'bg-white/90 text-brand-dark hover:bg-primary hover:text-white backdrop-blur-sm'
        }`}
      >
        <Heart size={16} className={isWishlisted ? 'fill-current' : ''} />
      </button>

      {/* Product Image */}
      <Link
        to={`/product/${product.slug || product.id}`}
        className="relative block aspect-[4/5] overflow-hidden bg-brand-border/20"
      >
        <img
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Hover quick action overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
          {product.is_variable ? (
            <Link
              to={`/product/${product.slug || product.id}`}
              className="flex-1 bg-white hover:bg-primary hover:text-white text-brand-dark text-xs font-medium py-2 rounded-lg text-center transition-colors shadow-md flex items-center justify-center gap-1.5"
            >
              <span>Select Options</span>
            </Link>
          ) : (
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-primary hover:bg-primary-hover text-white text-xs font-medium py-2 rounded-lg text-center transition-colors shadow-md flex items-center justify-center gap-1.5"
            >
              <ShoppingBag size={14} />
              <span>Add to Cart</span>
            </button>
          )}

          {onQuickView && (
            <button
              onClick={(e) => {
                e.preventDefault()
                onQuickView(product)
              }}
              aria-label="Quick View"
              className="bg-white/90 hover:bg-white text-brand-dark p-2 rounded-lg shadow-md transition-colors"
            >
              <Eye size={16} />
            </button>
          )}
        </div>
      </Link>

      {/* Details body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category */}
          <span className="text-[11px] text-brand-muted uppercase tracking-wider block mb-1">
            {product.categories?.name || product.category_name || 'Traditional Wear'}
          </span>

          {/* Product Title */}
          <Link
            to={`/product/${product.slug || product.id}`}
            className="font-heading text-lg font-semibold text-brand-dark hover:text-primary transition-colors line-clamp-1"
          >
            {product.name}
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-1.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={
                  i < Math.floor(product.average_rating || 5)
                    ? 'fill-gold text-gold'
                    : 'text-gray-300'
                }
              />
            ))}
            <span className="text-[11px] text-brand-muted ml-1">
              ({product.review_count || 12})
            </span>
          </div>
        </div>

        {/* Pricing */}
        <div className="mt-3 pt-3 border-t border-brand-border/40 flex items-baseline gap-2">
          <span className="text-primary font-body font-bold text-lg">
            {formatPrice(isSale ? product.sale_price : product.price)}
          </span>
          {isSale && (
            <span className="text-brand-muted line-through text-xs font-body">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
