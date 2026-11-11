import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, Eye, Star } from 'lucide-react'
import { useWishlist } from '../../context/WishlistContext'
import { formatPrice } from '../../utils/helpers'

export default function ProductCard({ product, onQuickView }) {
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

  const handleWhatsAppClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const productUrl = typeof window !== 'undefined'
      ? `${window.location.origin}/product/${product.slug || product.id}`
      : `https://siva-home-trends.vercel.app/product/${product.slug || product.id}`
    const priceText = formatPrice(isSale ? product.sale_price : product.price)
    const msg = `Hello SJ Sri Jananin Saree,\n\nI want to order this saree:\n• Product: ${product.name}\n• Price: ${priceText}\n• Product Link: ${productUrl}\n\nPlease confirm availability and dispatch details.`
    window.open(`https://wa.me/919025574074?text=${encodeURIComponent(msg)}`, '_blank')
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
              className="flex-1 bg-white hover:bg-[#25D366] hover:text-white text-brand-dark text-xs font-semibold py-2 rounded-lg text-center transition-colors shadow-md flex items-center justify-center gap-1.5"
            >
              <span>Select Color</span>
            </Link>
          ) : (
            <button
              onClick={handleWhatsAppClick}
              className="flex-1 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold py-2 rounded-lg text-center transition-colors shadow-md flex items-center justify-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>WhatsApp</span>
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

        {/* Pricing & direct WhatsApp order button */}
        <div className="mt-3 pt-3 border-t border-brand-border/40 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-primary font-body font-bold text-lg">
              {formatPrice(isSale ? product.sale_price : product.price)}
            </span>
            {isSale && (
              <span className="text-brand-muted line-through text-xs font-body">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          {product.is_variable ? (
            <Link
              to={`/product/${product.slug || product.id}`}
              className="text-xs font-medium text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-md transition-colors"
            >
              Colors →
            </Link>
          ) : (
            <button
              onClick={handleWhatsAppClick}
              className="text-emerald-600 hover:text-emerald-700 p-1.5 rounded-lg hover:bg-emerald-50 transition-colors"
              title="Order on WhatsApp"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
