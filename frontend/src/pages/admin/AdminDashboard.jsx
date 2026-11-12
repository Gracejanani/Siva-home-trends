import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Package,
  Plus,
  Trash2,
  Edit2,
  Search,
  ExternalLink,
  LogOut,
  ShieldCheck,
  RefreshCw,
  MessageCircle,
  Tag,
  DollarSign,
  TrendingUp,
  CheckCircle,
  X,
  Layers,
  Phone,
  Store,
} from 'lucide-react'
import {
  getActiveProducts,
  saveAdminProduct,
  deleteAdminProduct,
  resetCatalogToDefault,
  STORE_WHATSAPP,
  STORE_NAME,
  ADMIN_EMAIL,
} from '../../services/api'
import { useAdmin } from '../../context/AdminContext'
import { formatPrice } from '../../utils/helpers'
import { toast } from 'react-hot-toast'

export default function AdminDashboard() {
  const { adminUser, adminLogout } = useAdmin()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState('products')
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Edit / Add Modal state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    category_id: 'cat-pure-silk',
    category_name: 'Pure Silk Saree',
    sku: '',
    price: '',
    sale_price: '',
    stock_quantity: 10,
    is_featured: true,
    is_new_arrival: true,
    is_best_seller: false,
    description: '',
    image: '',
  })

  // Load products from storage
  useEffect(() => {
    setProducts(getActiveProducts())
  }, [])

  const handleLogout = () => {
    adminLogout()
    toast.success('Logged out successfully')
    navigate('/admin/login')
  }

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.sku?.toLowerCase().includes(search.toLowerCase()) ||
      p.category_name?.toLowerCase().includes(search.toLowerCase())
    const matchesCat =
      selectedCategory === 'all' ||
      p.category_id === selectedCategory ||
      p.categories?.slug === selectedCategory
    return matchesSearch && matchesCat
  })

  // Open modal for add
  const handleAddNew = () => {
    setEditingProduct(null)
    setFormData({
      name: '',
      category_id: 'cat-pure-silk',
      category_name: 'Pure Silk Saree',
      sku: `SHT-${Math.floor(100 + Math.random() * 900)}`,
      price: '',
      sale_price: '',
      stock_quantity: 15,
      is_featured: true,
      is_new_arrival: true,
      is_best_seller: false,
      description: 'Handcrafted traditional saree by Siva Home Trends with fine motifs and premium fabric.',
      image: 'https://images.unsplash.com/photo-1753981031189-27bb7bd1c079?auto=format&fit=crop&w=800&q=80',
    })
    setIsModalOpen(true)
  }

  // Open modal for edit
  const handleEdit = (prod) => {
    setEditingProduct(prod)
    setFormData({
      name: prod.name || '',
      category_id: prod.category_id || 'cat-pure-silk',
      category_name: prod.category_name || prod.categories?.name || 'Pure Silk Saree',
      sku: prod.sku || '',
      price: prod.price || '',
      sale_price: prod.sale_price || '',
      stock_quantity: prod.stock_quantity ?? 10,
      is_featured: prod.is_featured || false,
      is_new_arrival: prod.is_new_arrival || false,
      is_best_seller: prod.is_best_seller || false,
      description: prod.description || '',
      image: prod.images?.[0] || prod.image_url || '',
    })
    setIsModalOpen(true)
  }

  // Save product
  const handleSaveProduct = (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.price) {
      toast.error('Please enter product name and price')
      return
    }

    const priceNum = parseFloat(formData.price)
    const salePriceNum = formData.sale_price ? parseFloat(formData.sale_price) : null
    const discount = salePriceNum && salePriceNum < priceNum
      ? Math.round(((priceNum - salePriceNum) / priceNum) * 100)
      : 0

    const productPayload = {
      ...(editingProduct || {}),
      id: editingProduct?.id || `saree-${Date.now()}`,
      name: formData.name.trim(),
      slug:
        editingProduct?.slug ||
        formData.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, ''),
      category_id: formData.category_id,
      category_name: formData.category_name,
      categories: {
        id: formData.category_id,
        name: formData.category_name,
        slug: formData.category_id.replace('cat-', '') + '-saree',
      },
      sku: formData.sku.trim(),
      price: priceNum,
      sale_price: salePriceNum,
      discount_percentage: discount,
      stock_quantity: parseInt(formData.stock_quantity, 10) || 10,
      is_featured: formData.is_featured,
      is_new_arrival: formData.is_new_arrival,
      is_best_seller: formData.is_best_seller,
      description: formData.description,
      images: formData.image ? [formData.image, ...(editingProduct?.images?.slice(1) || [])] : editingProduct?.images || [
        'https://images.unsplash.com/photo-1753981031189-27bb7bd1c079?auto=format&fit=crop&w=800&q=80',
      ],
      variations: editingProduct?.variations || [
        {
          id: 'v-grn',
          color: 'Bottle Green',
          color_hex: '#15803d',
          price: priceNum,
          sale_price: salePriceNum || priceNum,
          sku: `${formData.sku}-GRN`,
          image_url: 'https://images.unsplash.com/photo-1753981031189-27bb7bd1c079?auto=format&fit=crop&w=800&q=80',
        },
        {
          id: 'v-red',
          color: 'Crimson Red',
          color_hex: '#dc2626',
          price: priceNum,
          sale_price: salePriceNum || priceNum,
          sku: `${formData.sku}-RED`,
          image_url: 'https://images.unsplash.com/photo-1719266307151-c07fadbee416?auto=format&fit=crop&w=800&q=80',
        },
      ],
    }

    const updated = saveAdminProduct(productPayload)
    setProducts(updated)
    setIsModalOpen(false)
    toast.success(editingProduct ? 'Saree updated successfully!' : 'New saree added to store!')
  }

  // Delete product
  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from Siva Home Trends catalog?`)) {
      const updated = deleteAdminProduct(id)
      setProducts(updated)
      toast.success(`Removed ${name}`)
    }
  }

  // Reset to default
  const handleResetCatalog = () => {
    if (window.confirm('Reset catalog to default handcrafted 12 sarees? Any custom added items will be refreshed.')) {
      const def = resetCatalogToDefault()
      setProducts(def)
      toast.success('Catalog reset to initial Siva Home Trends collection')
    }
  }

  // Category counts
  const categoriesList = [
    { id: 'all', name: 'All Categories' },
    { id: 'cat-pure-silk', name: 'Pure Silk Sarees' },
    { id: 'cat-kanchi-cotton', name: 'Kanchi Cotton Sarees' },
    { id: 'cat-soft-silk', name: 'Soft Silk Sarees' },
    { id: 'cat-wedding', name: 'Wedding & Bridal' },
    { id: 'cat-tissue', name: 'Tissue Sarees' },
    { id: 'cat-semi-silk', name: 'Semi Silk' },
    { id: 'cat-fancy', name: 'Fancy & Party' },
    { id: 'cat-chettinad', name: 'Chettinad Cotton' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-body">
      {/* Top Admin Header */}
      <header className="bg-white border-b border-brand-border/80 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 border border-brand-border/60 overflow-hidden p-1 flex items-center justify-center">
              <img
                src="/logo.jpg"
                alt="Siva Home Trends"
                className="w-full h-full object-contain"
                onError={(e) => (e.target.style.display = 'none')}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading text-lg md:text-xl font-bold text-brand-dark leading-none">
                  {STORE_NAME}
                </h1>
                <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Admin
                </span>
              </div>
              <p className="text-xs text-brand-muted mt-0.5">
                Owner Portal · {adminUser?.email || ADMIN_EMAIL}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-brand-border text-xs font-semibold text-brand-dark hover:border-primary hover:text-primary transition-colors bg-white shadow-sm"
            >
              <ExternalLink size={14} />
              <span className="hidden sm:inline">View Live Store</span>
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold transition-colors"
              title="Sign Out"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-6 overflow-x-auto border-t border-brand-border/40 text-xs sm:text-sm font-semibold scrollbar-none">
          <button
            onClick={() => setActiveTab('products')}
            className={`py-3 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'products'
                ? 'border-primary text-primary font-bold'
                : 'border-transparent text-brand-muted hover:text-brand-dark'
            }`}
          >
            <Package size={16} />
            <span>Sarees & Inventory ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-primary text-primary font-bold'
                : 'border-transparent text-brand-muted hover:text-brand-dark'
            }`}
          >
            <TrendingUp size={16} />
            <span>Overview & Stats</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'settings'
                ? 'border-primary text-primary font-bold'
                : 'border-transparent text-brand-muted hover:text-brand-dark'
            }`}
          >
            <MessageCircle size={16} />
            <span>WhatsApp & Store Settings</span>
          </button>
        </div>
      </header>

      {/* Main Admin Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* TAB 1: PRODUCTS INVENTORY */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-white p-4 rounded-2xl border border-brand-border/60 shadow-sm">
              <div className="flex flex-1 flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <div className="relative flex-1 max-w-sm">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
                  <input
                    type="text"
                    placeholder="Search sarees, SKU, color..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-brand-border focus:border-primary outline-none"
                  />
                </div>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 text-xs sm:text-sm rounded-xl border border-brand-border focus:border-primary outline-none bg-white font-medium"
                >
                  {categoriesList.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={handleResetCatalog}
                  className="px-3 py-2 rounded-xl border border-brand-border text-xs font-semibold text-brand-muted hover:text-brand-dark hover:bg-gray-50 flex items-center gap-1.5 transition-colors"
                  title="Reset to default catalog"
                >
                  <RefreshCw size={14} />
                  <span>Reset Default</span>
                </button>

                <button
                  onClick={handleAddNew}
                  className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-md shadow-primary/20 transition-all hover:scale-[1.02]"
                >
                  <Plus size={16} />
                  <span>Add New Saree</span>
                </button>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-2xl border border-brand-border/60 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-gray-50/80 border-b border-brand-border text-brand-dark text-xs uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="py-3.5 px-4">Saree</th>
                      <th className="py-3.5 px-4">Category</th>
                      <th className="py-3.5 px-4">SKU</th>
                      <th className="py-3.5 px-4">Price</th>
                      <th className="py-3.5 px-4">Sale Price</th>
                      <th className="py-3.5 px-4">Stock</th>
                      <th className="py-3.5 px-4">Colors</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border/50">
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="py-12 text-center text-brand-muted">
                          No sarees found matching your criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map((p) => {
                        const img = p.images?.[0] || p.image_url || 'https://placehold.co/80x100/fff5f8/c4005b?text=Saree'
                        return (
                          <tr key={p.id} className="hover:bg-primary-light/20 transition-colors">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={img}
                                  alt={p.name}
                                  className="w-12 h-14 object-cover rounded-lg border border-brand-border shrink-0"
                                />
                                <div>
                                  <Link
                                    to={`/product/${p.slug || p.id}`}
                                    target="_blank"
                                    className="font-heading font-semibold text-brand-dark hover:text-primary transition-colors line-clamp-1"
                                  >
                                    {p.name}
                                  </Link>
                                  <span className="text-[11px] text-brand-muted block">
                                    ID: {p.id}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-brand-body whitespace-nowrap">
                              {p.categories?.name || p.category_name || 'Traditional'}
                            </td>
                            <td className="py-3 px-4 text-brand-muted font-mono text-xs whitespace-nowrap">
                              {p.sku || '-'}
                            </td>
                            <td className="py-3 px-4 font-semibold text-brand-dark whitespace-nowrap">
                              {formatPrice(p.price)}
                            </td>
                            <td className="py-3 px-4 font-bold text-primary whitespace-nowrap">
                              {p.sale_price ? formatPrice(p.sale_price) : '-'}
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                                  (p.stock_quantity ?? 10) > 5
                                    ? 'bg-emerald-50 text-emerald-700'
                                    : 'bg-amber-50 text-amber-700'
                                }`}
                              >
                                {p.stock_quantity ?? 10} in stock
                              </span>
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap">
                              <div className="flex items-center gap-1">
                                {p.variations && p.variations.length > 0 ? (
                                  p.variations.map((v, i) => (
                                    <span
                                      key={i}
                                      title={v.color}
                                      className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-xs inline-block"
                                      style={{ backgroundColor: v.color_hex || '#c4005b' }}
                                    />
                                  ))
                                ) : (
                                  <span className="text-brand-muted text-xs">Standard</span>
                                )}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleEdit(p)}
                                  className="p-1.5 rounded-lg border border-brand-border text-brand-dark hover:border-primary hover:text-primary transition-colors"
                                  title="Edit Saree"
                                >
                                  <Edit2 size={14} />
                                </button>
                                <button
                                  onClick={() => handleDelete(p.id, p.name)}
                                  className="p-1.5 rounded-lg border border-brand-border text-brand-muted hover:border-red-500 hover:text-red-500 transition-colors"
                                  title="Delete Saree"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: OVERVIEW & STATS */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-5 rounded-2xl border border-brand-border/60 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase font-semibold text-brand-muted">Total Sarees</p>
                  <p className="font-heading text-3xl font-bold text-brand-dark mt-1">{products.length}</p>
                  <span className="text-xs text-emerald-600 font-medium">100% Saree Catalog</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  <Package size={24} />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-brand-border/60 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase font-semibold text-brand-muted">Active Categories</p>
                  <p className="font-heading text-3xl font-bold text-brand-dark mt-1">8</p>
                  <span className="text-xs text-brand-muted">Silk, Cotton, Bridal</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-gold/10 text-gold flex items-center justify-center">
                  <Layers size={24} />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-brand-border/60 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase font-semibold text-brand-muted">WhatsApp Orders</p>
                  <p className="font-heading text-3xl font-bold text-emerald-600 mt-1">Active</p>
                  <span className="text-xs text-brand-muted font-medium">+91 {STORE_WHATSAPP}</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <MessageCircle size={24} />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-brand-border/60 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase font-semibold text-brand-muted">Admin Security</p>
                  <p className="font-heading text-xl font-bold text-brand-dark mt-1">Authorized</p>
                  <span className="text-xs text-emerald-600 font-medium">{ADMIN_EMAIL}</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center">
                  <ShieldCheck size={24} />
                </div>
              </div>
            </div>

            {/* Quick Saree Tips */}
            <div className="bg-white p-6 rounded-2xl border border-brand-border/60 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-brand-dark mb-3">
                Siva Home Trends — Quick Store Summary
              </h3>
              <p className="text-sm text-brand-body leading-relaxed mb-4">
                Your boutique is fully optimized for direct WhatsApp purchases. Whenever a customer browses on mobile, tablet, or desktop and selects a saree with their preferred color, tapping <strong>"Order on WhatsApp"</strong> sends an exact order ticket to your WhatsApp number <strong>+91 {STORE_WHATSAPP}</strong> with price, color, quantity, and product URL.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <strong className="block text-brand-dark mb-1">Color Switching Active</strong>
                  Color selections instantly update the main hero view on each saree page.
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <strong className="block text-brand-dark mb-1">Mobile-First UI</strong>
                  Touch-friendly buttons, bottom mobile navigation, and lightning-fast loading.
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <strong className="block text-brand-dark mb-1">Real-time Catalog Control</strong>
                  Add, edit prices, or change saree photos right from this panel.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl bg-white rounded-2xl border border-brand-border/60 p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <h3 className="font-heading text-xl font-bold text-brand-dark">
                Store & WhatsApp Configuration
              </h3>
              <p className="text-xs text-brand-muted mt-1">
                Official store credentials and contact configuration.
              </p>
            </div>

            <div className="space-y-4 text-sm">
              <div className="p-4 bg-gray-50 rounded-xl space-y-1">
                <span className="text-xs uppercase font-semibold text-brand-muted block">
                  Official Store Brand Name
                </span>
                <span className="font-heading text-lg font-bold text-primary block">
                  {STORE_NAME}
                </span>
              </div>

              <div className="p-4 bg-emerald-50/60 border border-emerald-200/60 rounded-xl space-y-2">
                <span className="text-xs uppercase font-semibold text-emerald-800 block">
                  Primary Customer WhatsApp Order Line
                </span>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg text-emerald-700 font-mono">
                    +91 {STORE_WHATSAPP}
                  </span>
                  <a
                    href={`https://wa.me/91${STORE_WHATSAPP}?text=Hello%20${encodeURIComponent(STORE_NAME)}%2C%20testing%20WhatsApp%20order%20line.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold shadow-sm transition-all"
                  >
                    <MessageCircle size={14} />
                    <span>Test WhatsApp</span>
                  </a>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl space-y-1">
                <span className="text-xs uppercase font-semibold text-brand-muted block">
                  Authorized Admin Email
                </span>
                <span className="font-semibold text-brand-dark block">
                  {ADMIN_EMAIL}
                </span>
                <span className="text-xs text-emerald-600 font-medium">
                  ✓ Protected: Only gracejana123@gmail.com can log into this portal
                </span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modal: Add or Edit Saree */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-brand-border animate-fade-in my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-brand-border">
              <h3 className="font-heading text-xl font-bold text-brand-dark">
                {editingProduct ? 'Edit Saree Details' : 'Add New Saree to Collection'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-brand-muted hover:text-brand-dark p-1 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 mt-4 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold text-brand-dark mb-1">
                  Saree Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Handwoven Kanchi Cotton Saree"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border focus:border-primary outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-brand-dark mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category_id}
                    onChange={(e) => {
                      const found = categoriesList.find((c) => c.id === e.target.value)
                      setFormData({
                        ...formData,
                        category_id: e.target.value,
                        category_name: found ? found.name : 'Pure Silk Saree',
                      })
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border focus:border-primary outline-none bg-white"
                  >
                    <option value="cat-pure-silk">Pure Silk Saree</option>
                    <option value="cat-kanchi-cotton">Kanchi Cotton Saree</option>
                    <option value="cat-soft-silk">Soft Silk Saree</option>
                    <option value="cat-wedding">Wedding & Bridal Silk</option>
                    <option value="cat-tissue">Tissue Saree</option>
                    <option value="cat-semi-silk">Semi Silk Saree</option>
                    <option value="cat-chettinad">Chettinad Cotton</option>
                    <option value="cat-fancy">Fancy & Party Saree</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-brand-dark mb-1">
                    SKU Code
                  </label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    placeholder="e.g. SHT-108"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border focus:border-primary outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-brand-dark mb-1">
                    Regular Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="999"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border focus:border-primary outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-brand-dark mb-1">
                    Sale Price (₹)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.sale_price}
                    onChange={(e) => setFormData({ ...formData, sale_price: e.target.value })}
                    placeholder="699"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border focus:border-primary outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-brand-dark mb-1">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.stock_quantity}
                    onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border focus:border-primary outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-brand-dark mb-1">
                  Primary Image URL
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border focus:border-primary outline-none font-mono text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-brand-dark mb-1">
                  Description
                </label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Description of the weave, fabric, and occasions..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border focus:border-primary outline-none"
                />
              </div>

              <div className="flex gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={formData.is_new_arrival}
                    onChange={(e) => setFormData({ ...formData, is_new_arrival: e.target.checked })}
                    className="rounded text-primary focus:ring-primary"
                  />
                  <span>New Arrival Badge</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="rounded text-primary focus:ring-primary"
                  />
                  <span>Featured Saree</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-brand-border">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-brand-border text-brand-muted hover:text-brand-dark font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold shadow-md shadow-primary/25 transition-all"
                >
                  {editingProduct ? 'Save Changes' : 'Create Saree'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
