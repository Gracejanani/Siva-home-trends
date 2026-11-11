import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

// Request interceptor — attach auth token if present
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

// Response interceptor — unwrap data or throw
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

// ─── Products ────────────────────────────────────────────────────────────────

export async function getProducts(params = {}) {
  try {
    const response = await api.get('/products', { params })
    return response.data
  } catch (error) {
    console.error('getProducts error:', error.message)
    throw error
  }
}

export async function getProductById(id) {
  try {
    const response = await api.get(`/products/${id}`)
    return response.data
  } catch (error) {
    console.error('getProductById error:', error.message)
    throw error
  }
}

export async function getFeaturedProducts() {
  try {
    const response = await api.get('/products', { params: { is_featured: true, limit: 8 } })
    return response.data
  } catch (error) {
    console.error('getFeaturedProducts error:', error.message)
    throw error
  }
}

export async function getNewArrivals() {
  try {
    const response = await api.get('/products', { params: { is_new_arrival: true, limit: 8 } })
    return response.data
  } catch (error) {
    console.error('getNewArrivals error:', error.message)
    throw error
  }
}

export async function getBestSellers() {
  try {
    const response = await api.get('/products', { params: { is_best_seller: true, limit: 8 } })
    return response.data
  } catch (error) {
    console.error('getBestSellers error:', error.message)
    throw error
  }
}

export async function searchProducts(query) {
  try {
    const response = await api.get('/products/search', { params: { q: query } })
    return response.data
  } catch (error) {
    console.error('searchProducts error:', error.message)
    throw error
  }
}

// ─── Categories ──────────────────────────────────────────────────────────────

export async function getCategories() {
  try {
    const response = await api.get('/categories')
    return response.data
  } catch (error) {
    console.error('getCategories error:', error.message)
    throw error
  }
}

// ─── Orders ──────────────────────────────────────────────────────────────────

export async function createOrder(data) {
  try {
    const response = await api.post('/orders', data)
    return response.data
  } catch (error) {
    console.error('createOrder error:', error.message)
    throw error
  }
}

export async function trackOrder(orderNumber) {
  try {
    const response = await api.get(`/orders/track/${orderNumber}`)
    return response.data
  } catch (error) {
    console.error('trackOrder error:', error.message)
    throw error
  }
}

// ─── Reviews ─────────────────────────────────────────────────────────────────

export async function getProductReviews(productId) {
  try {
    const response = await api.get(`/products/${productId}/reviews`)
    return response.data
  } catch (error) {
    console.error('getProductReviews error:', error.message)
    throw error
  }
}

export async function submitReview(data) {
  try {
    const response = await api.post('/reviews', data)
    return response.data
  } catch (error) {
    console.error('submitReview error:', error.message)
    throw error
  }
}

// ─── Newsletter & Contact ─────────────────────────────────────────────────────

export async function subscribeNewsletter(email, name) {
  try {
    const response = await api.post('/newsletter/subscribe', { email, name })
    return response.data
  } catch (error) {
    console.error('subscribeNewsletter error:', error.message)
    throw error
  }
}

export async function sendContactMessage(data) {
  try {
    const response = await api.post('/contact', data)
    return response.data
  } catch (error) {
    console.error('sendContactMessage error:', error.message)
    throw error
  }
}
