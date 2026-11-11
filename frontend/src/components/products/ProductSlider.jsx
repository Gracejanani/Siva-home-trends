import React, { useRef } from 'react'
import ProductCard from './ProductCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function ProductSlider({
  title = 'Featured Products',
  subtitle = 'Specially handcrafted for timeless grace',
  products = [],
  loading = false,
}) {
  const scrollRef = useRef(null)

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current
      const scrollAmount = clientWidth * 0.75
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-10 text-center sm:text-left gap-4">
          <div>
            <h2 className="font-heading text-3xl sm:text-4xl text-brand-dark font-semibold">
              {title}
            </h2>
            <p className="text-brand-muted text-sm mt-1">{subtitle}</p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              aria-label="Previous products"
              className="w-10 h-10 rounded-full border border-brand-border hover:border-primary hover:bg-primary hover:text-white flex items-center justify-center transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Next products"
              className="w-10 h-10 rounded-full border border-brand-border hover:border-primary hover:bg-primary hover:text-white flex items-center justify-center transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Loading skeleton */}
        {loading ? (
          <div className="flex gap-6 overflow-x-hidden">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-72 shrink-0 animate-pulse bg-white border border-brand-border/60 rounded-xl p-3"
              >
                <div className="aspect-[4/5] bg-gray-200 rounded-lg mb-3" />
                <div className="h-3 bg-gray-200 rounded w-1/3 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-none pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((product) => (
              <div
                key={product.id || product.slug}
                className="w-[260px] sm:w-[280px] shrink-0 snap-start"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-brand-muted py-8 text-sm">
            No products available at the moment.
          </p>
        )}
      </div>
    </section>
  )
}
