import React from 'react'
import { Filter, X, RotateCcw } from 'lucide-react'

const COLORS = [
  { label: 'Blue', value: 'Blue', hex: '#2563eb' },
  { label: 'Brown', value: 'Brown', hex: '#78350f' },
  { label: 'Green', value: 'Green', hex: '#16a34a' },
  { label: 'Purple', value: 'Purple', hex: '#9333ea' },
  { label: 'Red', value: 'Red', hex: '#dc2626' },
  { label: 'Yellow', value: 'Yellow', hex: '#eab308' },
  { label: 'Gold', value: 'Gold', hex: '#d4af37' },
]

const SIZES = ['Free Size', 'S', 'M', 'L', 'XL', 'XXL']

export default function ProductFilter({
  filters = {},
  categories = [],
  onFilterChange,
  onReset,
}) {
  const handleCategoryClick = (slug) => {
    onFilterChange('category', filters.category === slug ? '' : slug)
  }

  const handleColorToggle = (color) => {
    const current = filters.colors ? filters.colors.split(',') : []
    const updated = current.includes(color)
      ? current.filter((c) => c !== color)
      : [...current, color]
    onFilterChange('colors', updated.join(','))
  }

  const handleSizeToggle = (size) => {
    const current = filters.sizes ? filters.sizes.split(',') : []
    const updated = current.includes(size)
      ? current.filter((s) => s !== size)
      : [...current, size]
    onFilterChange('sizes', updated.join(','))
  }

  const selectedColors = filters.colors ? filters.colors.split(',') : []
  const selectedSizes = filters.sizes ? filters.sizes.split(',') : []

  return (
    <aside className="bg-white rounded-2xl border border-brand-border/60 p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-brand-border/60">
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-primary" />
          <h3 className="font-heading text-xl font-semibold text-brand-dark">Filters</h3>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-brand-muted hover:text-primary flex items-center gap-1 transition-colors"
        >
          <RotateCcw size={13} />
          <span>Reset All</span>
        </button>
      </div>

      {/* Categories */}
      <div>
        <h4 className="font-heading text-base font-semibold text-brand-dark mb-3">
          Categories
        </h4>
        <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
          <button
            onClick={() => handleCategoryClick('')}
            className={`w-full text-left text-sm py-1.5 px-2 rounded-lg transition-colors flex justify-between items-center ${
              !filters.category
                ? 'bg-primary text-white font-medium'
                : 'text-brand-body hover:bg-primary-light hover:text-primary'
            }`}
          >
            <span>All Categories</span>
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id || cat.slug}
              onClick={() => handleCategoryClick(cat.slug)}
              className={`w-full text-left text-sm py-1.5 px-2 rounded-lg transition-colors flex justify-between items-center ${
                filters.category === cat.slug
                  ? 'bg-primary text-white font-medium'
                  : 'text-brand-body hover:bg-primary-light hover:text-primary'
              }`}
            >
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-heading text-base font-semibold text-brand-dark mb-3">
          Price Range (₹)
        </h4>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice || ''}
            onChange={(e) => onFilterChange('minPrice', e.target.value)}
            className="w-full text-xs p-2.5 border border-brand-border rounded-lg focus:outline-none focus:border-primary"
          />
          <span className="text-brand-muted text-xs">—</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice || ''}
            onChange={(e) => onFilterChange('maxPrice', e.target.value)}
            className="w-full text-xs p-2.5 border border-brand-border rounded-lg focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Color Filter */}
      <div>
        <h4 className="font-heading text-base font-semibold text-brand-dark mb-3">
          Color
        </h4>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((col) => {
            const isSelected = selectedColors.includes(col.value)
            return (
              <button
                key={col.value}
                onClick={() => handleColorToggle(col.value)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border transition-all ${
                  isSelected
                    ? 'border-primary bg-primary/10 text-primary font-medium'
                    : 'border-brand-border text-brand-body hover:border-gray-400'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full border border-black/10"
                  style={{ backgroundColor: col.hex }}
                />
                <span>{col.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h4 className="font-heading text-base font-semibold text-brand-dark mb-3">
          Size
        </h4>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((sz) => {
            const isSelected = selectedSizes.includes(sz)
            return (
              <button
                key={sz}
                onClick={() => handleSizeToggle(sz)}
                className={`px-3 py-1 rounded-lg text-xs border transition-all ${
                  isSelected
                    ? 'border-primary bg-primary text-white font-medium'
                    : 'border-brand-border text-brand-body hover:border-primary'
                }`}
              >
                {sz}
              </button>
            )
          })}
        </div>
      </div>
    </aside>
  )
}
