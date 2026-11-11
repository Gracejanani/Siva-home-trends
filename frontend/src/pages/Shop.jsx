import { useState, useEffect, useCallback, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X, ChevronLeft, ChevronRight } from 'lucide-react'
import ProductGrid from '../components/products/ProductGrid'
import ProductFilter from '../components/products/ProductFilter'
import { getProducts, getCategories } from '../services/api'

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Top Rated' },
]

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [categories, setCategories] = useState([])
  const [filterOpen, setFilterOpen] = useState(false)

  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    search: searchParams.get('search') || '',
    minPrice: '',
    maxPrice: '',
    colors: [],
    sizes: [],
    inStock: false,
    onSale: false,
    sort: searchParams.get('sort') || 'newest',
    page: 1,
  })

  const debounceRef = useRef(null)

  // Load categories once
  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data?.categories || data || []))
      .catch(() => setCategories([]))
  }, [])

  // Sync URL params → filters when params change externally
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category: searchParams.get('category') || prev.category,
      search: searchParams.get('search') || prev.search,
      sort: searchParams.get('sort') || prev.sort,
      page: 1,
    }))
  }, [searchParams.get('category'), searchParams.get('search'), searchParams.get('sort')]) // eslint-disable-line

  // Debounced fetch
  const fetchProducts = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      setLoading(true)
      try {
        const params = {
          page: filters.page,
          limit: 12,
          sort: filters.sort,
        }
        if (filters.category) params.category = filters.category
        if (filters.search) params.search = filters.search
        if (filters.minPrice) params.min_price = filters.minPrice
        if (filters.maxPrice) params.max_price = filters.maxPrice
        if (filters.colors.length) params.colors = filters.colors.join(',')
        if (filters.sizes.length) params.sizes = filters.sizes.join(',')
        if (filters.inStock) params.in_stock = true
        if (filters.onSale) params.on_sale = true

        const data = await getProducts(params)
        setProducts(data?.products || data || [])
        setTotal(data?.total || 0)
        setTotalPages(data?.totalPages || data?.total_pages || 1)
      } catch {
        setProducts([])
        setTotal(0)
      } finally {
        setLoading(false)
      }
    }, 350)
  }, [filters])

  useEffect(() => {
    fetchProducts()
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [fetchProducts])

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }))
  }

  const removeFilter = (key) => {
    setFilters((prev) => ({
      ...prev,
      [key]: Array.isArray(prev[key]) ? [] : key === 'inStock' || key === 'onSale' ? false : '',
      page: 1,
    }))
  }

  const goToPage = (p) => {
    setFilters((prev) => ({ ...prev, page: p }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const activeFilterCount = [
    filters.category,
    filters.minPrice,
    filters.maxPrice,
    ...filters.colors,
    ...filters.sizes,
    filters.inStock,
    filters.onSale,
  ].filter(Boolean).length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Banner */}
      <div className="bg-primary py-10 text-center text-white">
        <h1 className="font-heading text-4xl mb-1">Shop</h1>
        <nav className="text-white/60 font-body text-sm">
          <Link to="/" className="hover:text-white">Home</Link>
          <span className="mx-2">/</span>
          <span>Shop{filters.category && ` / ${filters.category}`}</span>
        </nav>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="lg:flex gap-8">
          {/* ─── Sidebar (desktop) ─── */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-5 sticky top-24">
              <h3 className="font-heading text-xl mb-4 border-b pb-3">Filters</h3>
              <ProductFilter
                filters={filters}
                categories={categories}
                onChange={updateFilter}
              />
            </div>
          </aside>

          {/* ─── Mobile filter drawer ─── */}
          {filterOpen && (
            <div className="fixed inset-0 z-50 flex flex-col justify-end lg:hidden">
              <div
                className="absolute inset-0 bg-black/40"
                onClick={() => setFilterOpen(false)}
              />
              <div className="relative bg-white rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading text-xl">Filters</h3>
                  <button onClick={() => setFilterOpen(false)}>
                    <X size={22} />
                  </button>
                </div>
                <ProductFilter
                  filters={filters}
                  categories={categories}
                  onChange={updateFilter}
                />
                <button
                  className="btn-primary w-full mt-6"
                  onClick={() => setFilterOpen(false)}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}

          {/* ─── Main content ─── */}
          <div className="flex-1 min-w-0">
            {/* Top bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                {/* Mobile filter button */}
                <button
                  className="lg:hidden flex items-center gap-2 btn-outline text-sm px-4 py-2"
                  onClick={() => setFilterOpen(true)}
                >
                  <SlidersHorizontal size={16} />
                  Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
                </button>
                <p className="text-gray-500 font-body text-sm">
                  {loading
                    ? 'Loading…'
                    : `Showing ${products.length} of ${total} results${
                        filters.search ? ` for "${filters.search}"` : ''
                      }${filters.category ? ` in "${filters.category}"` : ''}`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600 font-body">Sort:</label>
                <select
                  value={filters.sort}
                  onChange={(e) => updateFilter('sort', e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active filter badges */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {filters.category && (
                  <FilterBadge label={`Category: ${filters.category}`} onRemove={() => removeFilter('category')} />
                )}
                {filters.minPrice && (
                  <FilterBadge label={`Min: ₹${filters.minPrice}`} onRemove={() => removeFilter('minPrice')} />
                )}
                {filters.maxPrice && (
                  <FilterBadge label={`Max: ₹${filters.maxPrice}`} onRemove={() => removeFilter('maxPrice')} />
                )}
                {filters.colors.map((c) => (
                  <FilterBadge
                    key={c}
                    label={`Color: ${c}`}
                    onRemove={() =>
                      setFilters((prev) => ({
                        ...prev,
                        colors: prev.colors.filter((x) => x !== c),
                        page: 1,
                      }))
                    }
                  />
                ))}
                {filters.sizes.map((s) => (
                  <FilterBadge
                    key={s}
                    label={`Size: ${s}`}
                    onRemove={() =>
                      setFilters((prev) => ({
                        ...prev,
                        sizes: prev.sizes.filter((x) => x !== s),
                        page: 1,
                      }))
                    }
                  />
                ))}
                {filters.inStock && (
                  <FilterBadge label="In Stock" onRemove={() => removeFilter('inStock')} />
                )}
                {filters.onSale && (
                  <FilterBadge label="On Sale" onRemove={() => removeFilter('onSale')} />
                )}
                <button
                  className="text-xs text-primary underline font-body ml-1"
                  onClick={() =>
                    setFilters({
                      category: '',
                      search: '',
                      minPrice: '',
                      maxPrice: '',
                      colors: [],
                      sizes: [],
                      inStock: false,
                      onSale: false,
                      sort: 'newest',
                      page: 1,
                    })
                  }
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Product Grid */}
            <ProductGrid products={products} loading={loading} />

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => goToPage(filters.page - 1)}
                  disabled={filters.page === 1}
                  className="p-2 rounded-lg border border-gray-300 disabled:opacity-40 hover:bg-gray-100"
                >
                  <ChevronLeft size={18} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => goToPage(p)}
                    className={`w-9 h-9 rounded-lg text-sm font-body font-medium ${
                      p === filters.page
                        ? 'bg-primary text-white'
                        : 'border border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => goToPage(filters.page + 1)}
                  disabled={filters.page === totalPages}
                  className="p-2 rounded-lg border border-gray-300 disabled:opacity-40 hover:bg-gray-100"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function FilterBadge({ label, onRemove }) {
  return (
    <span className="flex items-center gap-1 bg-primary/10 text-primary text-xs font-body px-3 py-1 rounded-full">
      {label}
      <button onClick={onRemove} className="ml-1 hover:text-primary/60">
        <X size={12} />
      </button>
    </span>
  )
}
