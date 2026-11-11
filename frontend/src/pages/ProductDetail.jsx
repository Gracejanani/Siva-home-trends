import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Heart,
  Star,
  Truck,
  RotateCcw,
  ShieldCheck,
  Eye,
  Flame,
  Share2,
} from 'lucide-react'
import { getProductById, getRelatedProducts } from '../services/api'
import { useWishlist } from '../context/WishlistContext'
import ProductImageGallery from '../components/products/ProductImageGallery'
import ProductSlider from '../components/products/ProductSlider'
import MarqueeTicker from '../components/home/MarqueeTicker'
import { formatPrice } from '../utils/helpers'
import { toast } from 'react-hot-toast'

export default function ProductDetail() {
  const { slug } = useParams()
  const { toggleWishlist, isInWishlist } = useWishlist()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedVariation, setSelectedVariation] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [related, setRelated] = useState([])

  // Social proof random counters
  const [watchers] = useState(() => Math.floor(Math.random() * 8) + 9)
  const [soldLast30] = useState(() => Math.floor(Math.random() * 6) + 4)

  useEffect(() => {
    setLoading(true)
    getProductById(slug)
      .then((res) => {
        const prod = res?.data || res
        setProduct(prod)
        if (prod?.variations && prod.variations.length > 0) {
          setSelectedVariation(prod.variations[0])
        }
        return getRelatedProducts(prod?.id || slug)
      })
      .then((relRes) => {
        setRelated(relRes?.data || relRes?.products || relRes || [])
      })
      .catch((err) => {
        console.error('Error fetching product:', err)
      })
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
        <h2 className="font-heading text-3xl font-semibold mb-4 text-brand-dark">
          Product Not Found
        </h2>
        <p className="text-brand-muted mb-6">
          The requested product may have been moved or removed.
        </p>
        <Link to="/shop" className="btn-primary">
          Back to Shop
        </Link>
      </div>
    )
  }

  const isSale = product.sale_price && product.sale_price < product.price
  const currentPrice = selectedVariation?.sale_price || selectedVariation?.price || (isSale ? product.sale_price : product.price)
  const originalPrice = selectedVariation?.price || product.price
  const isWishlisted = isInWishlist(product.id)

  const handleWhatsAppOrder = () => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://siva-home-trends.vercel.app/product/${product.slug || product.id}`
    const colorInfo = selectedVariation?.color ? `• Color: ${selectedVariation.color}\n` : ''
    const message = `Hello SJ Sri Jananin Saree,\n\nI want to order this saree:\n• Product: ${product.name}\n${colorInfo}• Price: ${formatPrice(currentPrice)}\n• Quantity: ${quantity}\n• Product Link: ${currentUrl}\n\nPlease confirm availability and dispatch details.`
    const waUrl = `https://wa.me/919025574074?text=${encodeURIComponent(message)}`
    window.open(waUrl, '_blank')
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-primary-light/40 py-3 border-b border-brand-border/40 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-brand-muted">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-primary">Shop</Link>
          <span>/</span>
          <span className="text-brand-dark font-medium line-clamp-1">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Gallery Column */}
          <div>
            <ProductImageGallery
              images={product.images}
              productName={product.name}
              selectedImage={selectedVariation?.image_url}
            />
          </div>

          {/* Details Column */}
          <div className="flex flex-col justify-start">
            <div className="border-b border-brand-border/60 pb-6 mb-6">
              <span className="text-xs uppercase tracking-widest text-primary font-semibold mb-1 block">
                {product.categories?.name || 'Exclusive Ethnic Collection'}
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-brand-dark mb-3">
                {product.name}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < Math.floor(product.average_rating || 5)
                          ? 'fill-gold'
                          : 'text-gray-300'
                      }
                    />
                  ))}
                </div>
                <span className="text-xs text-brand-muted">
                  ({product.review_count || 12} customer reviews)
                </span>
                <span className="text-xs text-brand-muted">· SKU: {product.sku || 'SJ-TRAD-01'}</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 my-4">
                <span className="text-3xl font-bold text-primary font-body">
                  {formatPrice(currentPrice)}
                </span>
                {isSale && (
                  <span className="text-lg text-brand-muted line-through font-body">
                    {formatPrice(originalPrice)}
                  </span>
                )}
                {isSale && (
                  <span className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full">
                    Save {Math.round(((originalPrice - currentPrice) / originalPrice) * 100)}%
                  </span>
                )}
              </div>

              <p className="text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg inline-block font-medium">
                ✓ Tax included. Free Shipping on orders over ₹999.
              </p>
            </div>

            {/* Variations (if variable) */}
            {product.variations && product.variations.length > 0 && (
              <div className="mb-6 space-y-3">
                <label className="text-sm font-semibold text-brand-dark block">
                  Select Color: <span className="font-normal text-brand-muted">{selectedVariation?.color}</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.variations.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariation(v)}
                      className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all flex items-center gap-2 ${
                        selectedVariation?.id === v.id
                          ? 'border-primary bg-primary-light text-primary ring-2 ring-primary/20'
                          : 'border-brand-border text-brand-dark hover:border-gray-400'
                      }`}
                    >
                      {v.color_hex && (
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/10"
                          style={{ backgroundColor: v.color_hex }}
                        />
                      )}
                      <span>{v.color}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and WhatsApp Order Button */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex items-center border border-brand-border rounded-xl overflow-hidden bg-gray-50/50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-3 hover:bg-gray-100 font-semibold text-brand-dark transition-colors"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-4 py-3 font-bold text-sm min-w-[2.5rem] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 py-3 hover:bg-gray-100 font-semibold text-brand-dark transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleWhatsAppOrder}
                  className="flex-1 bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.98] text-white py-3.5 px-6 rounded-xl font-semibold text-base flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-500/25 transition-all"
                >
                  <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span>Order on WhatsApp</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  aria-label="Wishlist"
                  className={`p-3.5 border rounded-xl transition-colors ${
                    isWishlisted
                      ? 'border-primary bg-primary text-white'
                      : 'border-brand-border text-brand-dark hover:border-primary hover:text-primary'
                  }`}
                >
                  <Heart size={20} className={isWishlisted ? 'fill-current' : ''} />
                </button>
              </div>
            </div>

            {/* Urgency & Social Proof Widget */}
            <div className="bg-primary-light/50 border border-brand-border/60 rounded-2xl p-4 space-y-2 mb-6 text-xs">
              <div className="flex items-center gap-2 text-brand-dark font-medium">
                <Eye size={16} className="text-primary shrink-0" />
                <span><strong>{watchers} people</strong> are watching this product right now!</span>
              </div>
              <div className="flex items-center gap-2 text-brand-dark font-medium">
                <Flame size={16} className="text-amber-600 shrink-0" />
                <span><strong>{soldLast30} items sold</strong> in the last 30 minutes. Order soon!</span>
              </div>
            </div>

            {/* Delivery highlights */}
            <div className="grid grid-cols-3 gap-3 border-t border-brand-border/60 pt-6 text-center text-xs text-brand-body">
              <div className="flex flex-col items-center">
                <Truck size={20} className="text-primary mb-1" />
                <span>2-Day Delivery (South India)</span>
              </div>
              <div className="flex flex-col items-center">
                <RotateCcw size={20} className="text-primary mb-1" />
                <span>7-Day Return Guarantee</span>
              </div>
              <div className="flex flex-col items-center">
                <ShieldCheck size={20} className="text-primary mb-1" />
                <span>100% Certified Authentic</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed content */}
        <div className="mt-16 pt-12 border-t border-brand-border/60">
          <div className="flex border-b border-brand-border/60 gap-8 justify-center">
            {['description', 'shipping', 'returns'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 font-heading text-lg font-semibold capitalize transition-all relative ${
                  activeTab === tab
                    ? 'text-primary'
                    : 'text-brand-muted hover:text-brand-dark'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
            ))}
          </div>

          <div className="max-w-3xl mx-auto py-8 text-sm text-brand-body leading-relaxed">
            {activeTab === 'description' && (
              <div className="space-y-4">
                <p>{product.description || product.short_description || 'Authentic traditional South Indian saree woven with the finest quality pure silk and cotton threads, traditional golden zari patterns, and heritage motifs inspired by Tamil handloom.'}</p>
                <h4 className="font-heading text-lg font-semibold text-brand-dark pt-2">Product Highlights:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Premium handpicked natural silk and cotton fibers</li>
                  <li>Intricate traditional motifs designed for auspicious ceremonies</li>
                  <li>Comfortable fluid drape, skin-friendly soft feel, and breathable weave</li>
                  <li>Comes in official SJ Sri Jananin Saree luxury packaging box</li>
                </ul>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-3">
                <p>We provide prompt and secure delivery all across India:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Tamil Nadu & South India:</strong> 1-2 business days delivery.</li>
                  <li><strong>Rest of India:</strong> 3-5 business days delivery.</li>
                  <li><strong>Same Day Dispatch:</strong> Orders placed before 1:00 PM are dispatched the same day.</li>
                  <li><strong>Tracking:</strong> Complete tracking link sent via SMS and WhatsApp.</li>
                </ul>
              </div>
            )}

            {activeTab === 'returns' && (
              <div className="space-y-3">
                <p>Your satisfaction is our priority with our hassle-free return window:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>7-day return and exchange policy from date of delivery.</li>
                  <li>Products must be unworn, undamaged, with original tags intact.</li>
                  <li>Quick refund processed within 24-48 hours upon product return inspection.</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {related && related.length > 0 && (
          <div className="mt-16">
            <ProductSlider
              title="Related Products"
              subtitle="You may also like these traditional masterworks"
              products={related}
            />
          </div>
        )}
      </div>

      <MarqueeTicker />
    </div>
  )
}
