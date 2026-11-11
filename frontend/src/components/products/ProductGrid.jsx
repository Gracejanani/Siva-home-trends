import React from 'react'
import ProductCard from './ProductCard'
import { ShoppingBag } from 'lucide-react'

export default function ProductGrid({
  products = [],
  loading = false,
  emptyMessage = 'No products found matching your selection.',
  onQuickView,
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-white border border-brand-border/60 rounded-xl overflow-hidden p-3"
          >
            <div className="aspect-[4/5] bg-gray-200 rounded-lg mb-3" />
            <div className="h-3 bg-gray-200 rounded w-1/3 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        ))}
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-white rounded-2xl border border-brand-border/60">
        <div className="w-16 h-16 mx-auto mb-4 bg-primary-light rounded-full flex items-center justify-center text-primary">
          <ShoppingBag size={32} />
        </div>
        <h3 className="font-heading text-2xl font-semibold text-brand-dark mb-2">
          No Products Found
        </h3>
        <p className="text-brand-muted text-sm max-w-sm mx-auto mb-6">
          {emptyMessage}
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id || product.slug}
          product={product}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  )
}
