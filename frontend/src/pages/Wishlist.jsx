import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, Trash2 } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'
import { formatPrice } from '../utils/helpers'

export default function Wishlist() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist()

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
          Explore our handcrafted traditional saree collections and save your favorite pieces here.
        </p>
        <Link to="/shop" className="btn-primary">
          Explore Boutique
        </Link>
      </div>
    )
  }

  const handleOrderOnWhatsApp = (product) => {
    const isSale = product.sale_price && product.sale_price < product.price
    const priceText = formatPrice(isSale ? product.sale_price : product.price)
    const productUrl = typeof window !== 'undefined'
      ? `${window.location.origin}/product/${product.slug || product.id}`
      : `https://siva-home-trends.vercel.app/product/${product.slug || product.id}`
    const message = `Hello SJ Sri Jananin Saree,\n\nI want to order this saree from my wishlist:\n• Product: ${product.name}\n• Price: ${priceText}\n• Product Link: ${productUrl}\n\nPlease confirm availability and dispatch details.`
    window.open(`https://wa.me/919025574074?text=${encodeURIComponent(message)}`, '_blank')
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
                    onClick={() => handleOrderOnWhatsApp(product)}
                    className="mt-4 w-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                    <span>Order on WhatsApp</span>
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
