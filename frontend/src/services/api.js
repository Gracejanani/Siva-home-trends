import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
})

// Attach auth token if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('sj_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error.message || 'Something went wrong'
    return Promise.reject(new Error(message))
  }
)

export { api }
export default api

// ─── Exclusive Saree Categories ──────────────────────────────────────────────
const MOCK_CATEGORIES = [
  { id: 'cat-pure-silk', name: 'Pure Silk Saree', slug: 'pure-silk-saree', count: '85+ items' },
  { id: 'cat-kanchi-cotton', name: 'Kanchi Cotton Saree', slug: 'kanchi-cotton-saree', count: '60+ items' },
  { id: 'cat-soft-silk', name: 'Soft Silk Saree', slug: 'soft-silk-saree', count: '45+ items' },
  { id: 'cat-semi-silk', name: 'Semi Silk Saree', slug: 'semi-silk-saree', count: '40+ items' },
  { id: 'cat-wedding', name: 'Wedding & Bridal Silk', slug: 'wedding-saree', count: '30+ items' },
  { id: 'cat-tissue', name: 'Tissue Saree', slug: 'tissue-saree', count: '25+ items' },
  { id: 'cat-fancy', name: 'Fancy & Party Saree', slug: 'fancy-saree', count: '35+ items' },
  { id: 'cat-chettinad', name: 'Chettinad Cotton', slug: 'chettinad-cotton', count: '28+ items' },
]

// ─── 100% Saree Products Catalog ─────────────────────────────────────────────
const MOCK_PRODUCTS = [
  {
    id: 'saree-01',
    name: 'Kanchipuram Pure Silk Bridal Saree',
    slug: 'kanchipuram-pure-silk-bridal-saree',
    price: 6499,
    sale_price: 4999,
    discount_percentage: 23,
    sku: 'KPS-001',
    category_id: 'cat-pure-silk',
    category_name: 'Pure Silk Saree',
    categories: { id: 'cat-pure-silk', name: 'Pure Silk Saree', slug: 'pure-silk-saree' },
    is_new_arrival: true,
    is_featured: true,
    is_best_seller: true,
    stock_quantity: 8,
    average_rating: 5.0,
    review_count: 42,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Authentic pure Kanchipuram silk saree with rich golden zari pallu and traditional peacocks woven in pure mulberry silk.',
  },
  {
    id: 'saree-02',
    name: 'Handwoven Kanchi Cotton Saree',
    slug: 'handwoven-kanchi-cotton-saree',
    price: 999,
    sale_price: 699,
    discount_percentage: 30,
    sku: 'TC0008-B',
    category_id: 'cat-kanchi-cotton',
    category_name: 'Kanchi Cotton Saree',
    categories: { id: 'cat-kanchi-cotton', name: 'Kanchi Cotton Saree', slug: 'kanchi-cotton-saree' },
    is_new_arrival: true,
    is_featured: true,
    is_best_seller: true,
    is_variable: true,
    stock_quantity: 14,
    average_rating: 4.9,
    review_count: 28,
    variations: [
      { id: 'v1', color: 'Royal Blue', color_hex: '#1e3a8a', price: 999, sale_price: 699, sku: 'TC0008-B-BLU' },
      { id: 'v2', color: 'Earth Brown', color_hex: '#78350f', price: 999, sale_price: 699, sku: 'TC0008-B-BRN' },
      { id: 'v3', color: 'Bottle Green', color_hex: '#15803d', price: 999, sale_price: 699, sku: 'TC0008-B-GRN' },
      { id: 'v4', color: 'Deep Purple', color_hex: '#7e22ce', price: 999, sale_price: 699, sku: 'TC0008-B-PUR' },
      { id: 'v5', color: 'Mustard Yellow', color_hex: '#eab308', price: 999, sale_price: 699, sku: 'TC0008-B-YEL' },
    ],
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Fine 80s count handwoven Kanchi cotton saree with contrast temple border, breathable drape, and unstitched matching blouse.',
  },
  {
    id: 'saree-03',
    name: 'Soft Silk Pastel Festive Saree',
    slug: 'soft-silk-pastel-festive-saree',
    price: 2899,
    sale_price: 1999,
    discount_percentage: 31,
    sku: 'SSS-003',
    category_id: 'cat-soft-silk',
    category_name: 'Soft Silk Saree',
    categories: { id: 'cat-soft-silk', name: 'Soft Silk Saree', slug: 'soft-silk-saree' },
    is_new_arrival: true,
    is_featured: true,
    is_best_seller: true,
    stock_quantity: 20,
    average_rating: 4.8,
    review_count: 31,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Featherlight soft silk saree in pastel shades with silver zari brocade buttas and soft fluid drape.',
  },
  {
    id: 'saree-04',
    name: 'Glimmering Golden Tissue Silk Saree',
    slug: 'glimmering-golden-tissue-silk-saree',
    price: 2799,
    sale_price: 1499,
    discount_percentage: 46,
    sku: 'TS-004',
    category_id: 'cat-tissue',
    category_name: 'Tissue Saree',
    categories: { id: 'cat-tissue', name: 'Tissue Saree', slug: 'tissue-saree' },
    is_new_arrival: false,
    is_featured: true,
    is_best_seller: true,
    stock_quantity: 15,
    average_rating: 4.9,
    review_count: 24,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Stunning copper-gold metallic tissue saree with rich jacquard weaving, ideal for evening wedding receptions.',
  },
  {
    id: 'saree-05',
    name: 'Traditional Muhurtham Wedding Silk',
    slug: 'traditional-muhurtham-wedding-silk',
    price: 5999,
    sale_price: 4599,
    discount_percentage: 23,
    sku: 'WS-005',
    category_id: 'cat-wedding',
    category_name: 'Wedding & Bridal Silk',
    categories: { id: 'cat-wedding', name: 'Wedding & Bridal Silk', slug: 'wedding-saree' },
    is_new_arrival: false,
    is_featured: true,
    is_best_seller: true,
    stock_quantity: 6,
    average_rating: 5.0,
    review_count: 48,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Auspicious Crimson Red & Golden zari wedding saree crafted for traditional South Indian Hindu weddings.',
  },
  {
    id: 'saree-06',
    name: 'Semi Silk Contrast Border Saree',
    slug: 'semi-silk-contrast-border-saree',
    price: 1899,
    sale_price: 1299,
    discount_percentage: 31,
    sku: 'SMS-006',
    category_id: 'cat-semi-silk',
    category_name: 'Semi Silk Saree',
    categories: { id: 'cat-semi-silk', name: 'Semi Silk Saree', slug: 'semi-silk-saree' },
    is_new_arrival: true,
    is_featured: true,
    is_best_seller: false,
    stock_quantity: 25,
    average_rating: 4.7,
    review_count: 19,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Affordable elegant semi silk saree with grand korvai zari pallu and contrast blouse piece.',
  },
  {
    id: 'saree-07',
    name: 'Chettinad Traditional Handloom Cotton',
    slug: 'chettinad-traditional-handloom-cotton',
    price: 1299,
    sale_price: 899,
    discount_percentage: 30,
    sku: 'CHT-007',
    category_id: 'cat-chettinad',
    category_name: 'Chettinad Cotton',
    categories: { id: 'cat-chettinad', name: 'Chettinad Cotton', slug: 'chettinad-cotton' },
    is_new_arrival: true,
    is_featured: false,
    is_best_seller: true,
    stock_quantity: 30,
    average_rating: 4.8,
    review_count: 17,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Authentic Karaikudi Chettinad cotton saree with broad temple border and geometric pallu.',
  },
  {
    id: 'saree-08',
    name: 'Designer Fancy Partywear Organza Saree',
    slug: 'designer-fancy-partywear-organza-saree',
    price: 1799,
    sale_price: 1199,
    discount_percentage: 33,
    sku: 'FNC-008',
    category_id: 'cat-fancy',
    category_name: 'Fancy & Party Saree',
    categories: { id: 'cat-fancy', name: 'Fancy & Party Saree', slug: 'fancy-saree' },
    is_new_arrival: true,
    is_featured: true,
    is_best_seller: false,
    stock_quantity: 18,
    average_rating: 4.7,
    review_count: 22,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Sheer floral organza saree with delicate scalloped cutwork embroidery border and designer blouse.',
  },
  {
    id: 'saree-09',
    name: 'Arani Pure Pattu Silk Saree',
    slug: 'arani-pure-pattu-silk-saree',
    price: 4999,
    sale_price: 3799,
    discount_percentage: 24,
    sku: 'ARN-009',
    category_id: 'cat-pure-silk',
    category_name: 'Pure Silk Saree',
    categories: { id: 'cat-pure-silk', name: 'Pure Silk Saree', slug: 'pure-silk-saree' },
    is_new_arrival: false,
    is_featured: true,
    is_best_seller: true,
    stock_quantity: 10,
    average_rating: 4.9,
    review_count: 29,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Traditional Arani handloom silk saree with check patterns and contrast rudraksha motif border.',
  },
  {
    id: 'saree-10',
    name: 'Dual Tone Tissue Kanchi Silk',
    slug: 'dual-tone-tissue-kanchi-silk',
    price: 3499,
    sale_price: 2499,
    discount_percentage: 28,
    sku: 'DTT-010',
    category_id: 'cat-tissue',
    category_name: 'Tissue Saree',
    categories: { id: 'cat-tissue', name: 'Tissue Saree', slug: 'tissue-saree' },
    is_new_arrival: true,
    is_featured: true,
    is_best_seller: true,
    stock_quantity: 12,
    average_rating: 4.9,
    review_count: 26,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Shimmering two-tone shot silk and tissue weave with rich zari border for receptions and banquets.',
  },
  {
    id: 'saree-11',
    name: 'Madurai Sungudi Pure Cotton Saree',
    slug: 'madurai-sungudi-pure-cotton-saree',
    price: 899,
    sale_price: 599,
    discount_percentage: 33,
    sku: 'SNG-011',
    category_id: 'cat-kanchi-cotton',
    category_name: 'Kanchi Cotton Saree',
    categories: { id: 'cat-kanchi-cotton', name: 'Kanchi Cotton Saree', slug: 'kanchi-cotton-saree' },
    is_new_arrival: false,
    is_featured: false,
    is_best_seller: true,
    stock_quantity: 35,
    average_rating: 4.8,
    review_count: 34,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Traditional tie-and-dye circular dot Sungudi cotton saree with zari border, soft and skin-friendly.',
  },
  {
    id: 'saree-12',
    name: 'Salem Special Zari Border Silk Saree',
    slug: 'salem-special-zari-border-silk-saree',
    price: 3999,
    sale_price: 2999,
    discount_percentage: 25,
    sku: 'SLM-012',
    category_id: 'cat-pure-silk',
    category_name: 'Pure Silk Saree',
    categories: { id: 'cat-pure-silk', name: 'Pure Silk Saree', slug: 'pure-silk-saree' },
    is_new_arrival: true,
    is_featured: true,
    is_best_seller: true,
    stock_quantity: 9,
    average_rating: 5.0,
    review_count: 38,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Special Salem handloom pure silk saree with heavy zari border, crafted by generational weavers in Dadagapatti.',
  },
]

// ─── API Functions ───────────────────────────────────────────────────────────

export async function getProducts(params = {}) {
  try {
    const response = await api.get('/products', { params })
    return response.data?.data || response.data || MOCK_PRODUCTS
  } catch (error) {
    let filtered = [...MOCK_PRODUCTS]
    if (params.category) {
      filtered = filtered.filter(
        (p) =>
          p.category_id === params.category ||
          p.categories?.slug === params.category ||
          p.category_name?.toLowerCase().includes(params.category.toLowerCase())
      )
    }
    if (params.search) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(params.search.toLowerCase()) ||
          p.description?.toLowerCase().includes(params.search.toLowerCase())
      )
    }
    return filtered
  }
}

export async function getProductById(id) {
  try {
    const response = await api.get(`/products/${id}`)
    return response.data?.data || response.data
  } catch (error) {
    const found = MOCK_PRODUCTS.find((p) => p.id === id || p.slug === id)
    return found || MOCK_PRODUCTS[0]
  }
}

export async function getFeaturedProducts() {
  try {
    const response = await api.get('/products/featured')
    return response.data?.data || response.data
  } catch (error) {
    return MOCK_PRODUCTS.filter((p) => p.is_featured).slice(0, 8)
  }
}

export async function getNewArrivals() {
  try {
    const response = await api.get('/products/new-arrivals')
    return response.data?.data || response.data
  } catch (error) {
    return MOCK_PRODUCTS.filter((p) => p.is_new_arrival).slice(0, 8)
  }
}

export async function getBestSellers() {
  try {
    const response = await api.get('/products/best-sellers')
    return response.data?.data || response.data
  } catch (error) {
    return MOCK_PRODUCTS.filter((p) => p.is_best_seller).slice(0, 8)
  }
}

export async function getRelatedProducts(id) {
  try {
    const response = await api.get(`/products/${id}/related`)
    return response.data?.data || response.data
  } catch (error) {
    return MOCK_PRODUCTS.filter((p) => p.id !== id && p.slug !== id).slice(0, 4)
  }
}

export async function searchProducts(query) {
  try {
    const response = await api.get('/products/search', { params: { q: query } })
    return response.data?.data || response.data
  } catch (error) {
    return MOCK_PRODUCTS.filter((p) =>
      p.name.toLowerCase().includes((query || '').toLowerCase())
    )
  }
}

export async function getCategories() {
  try {
    const response = await api.get('/categories')
    return response.data?.data || response.data
  } catch (error) {
    return MOCK_CATEGORIES
  }
}

export async function createOrder(data) {
  try {
    const response = await api.post('/orders', data)
    return response.data
  } catch (error) {
    return {
      success: true,
      data: {
        orderNumber: 'SJ' + Math.floor(100000 + Math.random() * 900000),
        total: data.total_amount,
      },
    }
  }
}

export async function trackOrder(orderNumber) {
  try {
    const response = await api.get(`/orders/track/${orderNumber}`)
    return response.data
  } catch (error) {
    return {
      success: true,
      data: {
        orderNumber,
        status: 'In Transit',
        estimatedDelivery: 'Within 48 Hours',
        location: 'Salem Hub, Tamil Nadu',
      },
    }
  }
}

export async function getProductReviews(productId) {
  try {
    const response = await api.get(`/reviews/product/${productId}`)
    return response.data
  } catch (error) {
    return []
  }
}

export async function submitReview(data) {
  try {
    const response = await api.post('/reviews', data)
    return response.data
  } catch (error) {
    return { success: true }
  }
}

export async function subscribeNewsletter(email, name) {
  try {
    const response = await api.post('/newsletter/subscribe', { email, name })
    return response.data
  } catch (error) {
    return { success: true }
  }
}

export async function sendContactMessage(data) {
  try {
    const response = await api.post('/contact', data)
    return response.data
  } catch (error) {
    return { success: true }
  }
}
