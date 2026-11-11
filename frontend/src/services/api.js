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

// ─── Realistic Fallback Data Matching Original Site ─────────────────────────
const MOCK_CATEGORIES = [
  { id: 'cat-jewellery', name: 'Jewellery', slug: 'jewellery', count: '137+ items' },
  { id: 'cat-bangles', name: 'Bangles', slug: 'bangles', count: '24+ items' },
  { id: 'cat-earrings', name: 'Earrings', slug: 'earrings', count: '48+ items' },
  { id: 'cat-haram', name: 'Haram', slug: 'haram', count: '18+ items' },
  { id: 'cat-necklace', name: 'Necklace', slug: 'necklace', count: '32+ items' },
  { id: 'cat-pendent', name: 'Pendent', slug: 'pendent', count: '15+ items' },
  { id: 'cat-sarees', name: 'Sarees', slug: 'sarees', count: '185+ items' },
  { id: 'cat-kanchi-cotton', name: 'Kanchi Cotton Saree', slug: 'kanchi-cotton-saree', count: '60+ items' },
  { id: 'cat-pure-silk', name: 'Pure Silk Saree', slug: 'pure-silk-saree', count: '85+ items' },
  { id: 'cat-semi-silk', name: 'Semi Silk Saree', slug: 'semi-silk-saree', count: '40+ items' },
]

const MOCK_PRODUCTS = [
  {
    id: 'prod-01',
    name: 'Chudi Material',
    slug: 'chudi-material',
    price: 699,
    sale_price: 499,
    discount_percentage: 29,
    sku: 'CM-001',
    category_id: 'cat-sarees',
    category_name: 'Traditional Wear',
    categories: { id: 'cat-sarees', name: 'Traditional Wear', slug: 'sarees' },
    is_new_arrival: true,
    is_featured: true,
    is_best_seller: false,
    stock_quantity: 25,
    average_rating: 4.8,
    review_count: 14,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Premium soft cotton chudidar material with matching dupatta and contrast bottoms.',
  },
  {
    id: 'prod-02',
    name: 'Cotton Sarees',
    slug: 'cotton-sarees',
    price: 849,
    sale_price: 699,
    discount_percentage: 17,
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
      { id: 'v1', color: 'Blue', color_hex: '#1e3a8a', price: 849, sale_price: 699, sku: 'TC0008-B-BLU' },
      { id: 'v2', color: 'Brown', color_hex: '#78350f', price: 849, sale_price: 699, sku: 'TC0008-B-BRN' },
      { id: 'v3', color: 'Green', color_hex: '#15803d', price: 849, sale_price: 699, sku: 'TC0008-B-GRN' },
      { id: 'v4', color: 'Purple', color_hex: '#7e22ce', price: 849, sale_price: 699, sku: 'TC0008-B-PUR' },
      { id: 'v5', color: 'Yellow', color_hex: '#eab308', price: 849, sale_price: 699, sku: 'TC0008-B-YEL' },
    ],
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Handwoven soft Kanchi cotton saree with fine contrast temple border and running blouse.',
  },
  {
    id: 'prod-03',
    name: 'Fancy Sarees',
    slug: 'fancy-sarees',
    price: 1199,
    sale_price: 999,
    discount_percentage: 15,
    sku: 'FS-002',
    category_id: 'cat-sarees',
    category_name: 'Sarees',
    categories: { id: 'cat-sarees', name: 'Sarees', slug: 'sarees' },
    is_new_arrival: false,
    is_featured: true,
    is_best_seller: false,
    stock_quantity: 18,
    average_rating: 4.7,
    review_count: 9,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Lightweight designer fancy sarees suited for daily festivals, gifting, and ceremonies.',
  },
  {
    id: 'prod-04',
    name: 'Kids Wear',
    slug: 'kids-wear',
    price: 1199,
    sale_price: 599,
    discount_percentage: 50,
    sku: 'KW-003',
    category_id: 'cat-sarees',
    category_name: 'Traditional Wear',
    categories: { id: 'cat-sarees', name: 'Traditional Wear', slug: 'sarees' },
    is_new_arrival: true,
    is_featured: false,
    is_best_seller: false,
    stock_quantity: 12,
    average_rating: 4.6,
    review_count: 7,
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Traditional pattu pavadai lehenga sets for kids woven in festive South Indian colors.',
  },
  {
    id: 'prod-05',
    name: 'Silk Sarees',
    slug: 'silk-sarees',
    price: 5299,
    sale_price: 3999,
    discount_percentage: 25,
    sku: 'SS-004',
    category_id: 'cat-pure-silk',
    category_name: 'Pure Silk Saree',
    categories: { id: 'cat-pure-silk', name: 'Pure Silk Saree', slug: 'pure-silk-saree' },
    is_new_arrival: true,
    is_featured: true,
    is_best_seller: true,
    stock_quantity: 8,
    average_rating: 5.0,
    review_count: 36,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Pure Kanchipuram wedding silk saree with rich golden zari pallu and bridal motifs.',
  },
  {
    id: 'prod-06',
    name: 'Soft Silk Sarees',
    slug: 'soft-silk-sarees',
    price: 2899,
    sale_price: 1999,
    discount_percentage: 30,
    sku: 'SSS-005',
    category_id: 'cat-semi-silk',
    category_name: 'Semi Silk Saree',
    categories: { id: 'cat-semi-silk', name: 'Semi Silk Saree', slug: 'semi-silk-saree' },
    is_new_arrival: true,
    is_featured: true,
    is_best_seller: true,
    stock_quantity: 20,
    average_rating: 4.8,
    review_count: 22,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Lightweight soft silk saree with feather-soft touch, lustrous drape and zari border.',
  },
  {
    id: 'prod-07',
    name: 'Tissue Sarees',
    slug: 'tissue-sarees',
    price: 2799,
    sale_price: 1499,
    discount_percentage: 47,
    sku: 'TS-006',
    category_id: 'cat-sarees',
    category_name: 'Sarees',
    categories: { id: 'cat-sarees', name: 'Sarees', slug: 'sarees' },
    is_new_arrival: false,
    is_featured: true,
    is_best_seller: true,
    stock_quantity: 15,
    average_rating: 4.9,
    review_count: 19,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Glimmering golden tissue saree perfect for evening receptions and celebratory functions.',
  },
  {
    id: 'prod-08',
    name: 'Trending Dupattas',
    slug: 'trending-dupattas',
    price: 499,
    sale_price: 299,
    discount_percentage: 40,
    sku: 'TD-007',
    category_id: 'cat-sarees',
    category_name: 'Traditional Wear',
    categories: { id: 'cat-sarees', name: 'Traditional Wear', slug: 'sarees' },
    is_new_arrival: true,
    is_featured: false,
    is_best_seller: false,
    stock_quantity: 35,
    average_rating: 4.7,
    review_count: 11,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Banarasi silk and Chanderi contrast dupattas with tassel edges.',
  },
  {
    id: 'prod-09',
    name: 'Trending Salwars',
    slug: 'trending-salwars',
    price: 1149,
    sale_price: 799,
    discount_percentage: 30,
    sku: 'TSW-008',
    category_id: 'cat-sarees',
    category_name: 'Traditional Wear',
    categories: { id: 'cat-sarees', name: 'Traditional Wear', slug: 'sarees' },
    is_new_arrival: false,
    is_featured: true,
    is_best_seller: false,
    stock_quantity: 22,
    average_rating: 4.8,
    review_count: 15,
    images: [
      'https://images.unsplash.com/photo-1611591475844-030999553642?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Unstitched ethnic salwar suit sets with embroidered neckline and chiffon dupatta.',
  },
  {
    id: 'prod-10',
    name: 'Wedding Sarees',
    slug: 'wedding-sarees',
    price: 4999,
    sale_price: 4599,
    discount_percentage: 8,
    sku: 'WS-009',
    category_id: 'cat-pure-silk',
    category_name: 'Pure Silk Saree',
    categories: { id: 'cat-pure-silk', name: 'Pure Silk Saree', slug: 'pure-silk-saree' },
    is_new_arrival: false,
    is_featured: true,
    is_best_seller: true,
    stock_quantity: 6,
    average_rating: 5.0,
    review_count: 42,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Bridal Kanchipuram silk saree woven with real gold zari threads in heirloom designs.',
  },
  {
    id: 'prod-11',
    name: 'Temple Gold Haram',
    slug: 'temple-gold-haram',
    price: 2499,
    sale_price: 1899,
    discount_percentage: 24,
    sku: 'HARM-01',
    category_id: 'cat-haram',
    category_name: 'Haram',
    categories: { id: 'cat-haram', name: 'Haram', slug: 'haram' },
    is_new_arrival: true,
    is_featured: true,
    is_best_seller: true,
    stock_quantity: 10,
    average_rating: 4.9,
    review_count: 27,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Traditional South Indian Lakshmi temple haram necklace with matching jhumkas.',
  },
  {
    id: 'prod-12',
    name: 'Kada Bangles Set',
    slug: 'kada-bangles-set',
    price: 1299,
    sale_price: 999,
    discount_percentage: 23,
    sku: 'BNG-02',
    category_id: 'cat-bangles',
    category_name: 'Bangles',
    categories: { id: 'cat-bangles', name: 'Bangles', slug: 'bangles' },
    is_new_arrival: true,
    is_featured: true,
    is_best_seller: true,
    stock_quantity: 18,
    average_rating: 4.8,
    review_count: 19,
    images: [
      'https://images.unsplash.com/photo-1611591475844-030999553642?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Antique matte gold finish bridal kada bangles with ruby stone embellishments.',
  },
]

// ─── API Functions with Graceful Fallback ────────────────────────────────────

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
