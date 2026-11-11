const { supabase, isConfigured } = require('../config/supabase')
const { MOCK_PRODUCTS } = require('../config/mockData')

/**
 * GET /api/products
 */
async function getProducts(req, res, next) {
  try {
    const {
      category,
      search,
      minPrice,
      maxPrice,
      colors,
      sort = 'newest',
      page = 1,
      limit = 12,
    } = req.query

    const pageNum = Math.max(1, parseInt(page, 10))
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10)))
    const offset = (pageNum - 1) * limitNum

    if (isConfigured) {
      try {
        let query = supabase
          .from('products')
          .select('*, categories ( id, name, slug )', { count: 'exact' })
          .eq('is_active', true)

        if (category) {
          const { data: cat } = await supabase
            .from('categories')
            .select('id')
            .eq('slug', category)
            .single()
          if (cat) query = query.eq('category_id', cat.id)
        }

        if (search) {
          query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`)
        }

        if (minPrice) query = query.gte('price', parseFloat(minPrice))
        if (maxPrice) query = query.lte('price', parseFloat(maxPrice))

        switch (sort) {
          case 'price_asc':
            query = query.order('price', { ascending: true })
            break
          case 'price_desc':
            query = query.order('price', { ascending: false })
            break
          case 'popular':
            query = query.order('total_sales', { ascending: false })
            break
          case 'rating':
            query = query.order('average_rating', { ascending: false })
            break
          case 'newest':
          default:
            query = query.order('created_at', { ascending: false })
            break
        }

        query = query.range(offset, offset + limitNum - 1)
        const { data: products, error, count } = await query

        if (!error && products) {
          return res.json({
            success: true,
            data: products,
            pagination: {
              page: pageNum,
              limit: limitNum,
              total: count || products.length,
              totalPages: Math.ceil((count || products.length) / limitNum),
            },
          })
        }
      } catch (err) {
        console.warn('Supabase query error, falling back to mock catalog:', err.message)
      }
    }

    // Fallback Mock Filter logic
    let filtered = [...MOCK_PRODUCTS]
    if (category) {
      filtered = filtered.filter(
        (p) =>
          p.category_id === category ||
          p.categories?.slug === category ||
          p.category_name?.toLowerCase().includes(category.toLowerCase())
      )
    }
    if (search) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.description?.toLowerCase().includes(search.toLowerCase())
      )
    }
    if (minPrice) filtered = filtered.filter((p) => (p.sale_price || p.price) >= parseFloat(minPrice))
    if (maxPrice) filtered = filtered.filter((p) => (p.sale_price || p.price) <= parseFloat(maxPrice))

    if (sort === 'price_asc') {
      filtered.sort((a, b) => (a.sale_price || a.price) - (b.sale_price || b.price))
    } else if (sort === 'price_desc') {
      filtered.sort((a, b) => (b.sale_price || b.price) - (a.sale_price || a.price))
    } else if (sort === 'rating') {
      filtered.sort((a, b) => (b.average_rating || 0) - (a.average_rating || 0))
    }

    const total = filtered.length
    const paginated = filtered.slice(offset, offset + limitNum)

    res.json({
      success: true,
      data: paginated,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    })
  } catch (err) {
    next(err)
  }
}

/**
 * GET /api/products/:id
 */
async function getProductById(req, res, next) {
  try {
    const { id } = req.params

    if (isConfigured) {
      try {
        const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
        let query = supabase.from('products').select(`*, categories ( id, name, slug )`).eq('is_active', true)
        query = isUUID ? query.eq('id', id) : query.eq('slug', id)
        const { data: product, error } = await query.single()

        if (!error && product) {
          const [variationsRes, reviewsRes] = await Promise.all([
            supabase.from('product_variations').select('*').eq('product_id', product.id).eq('is_active', true),
            supabase.from('reviews').select('*').eq('product_id', product.id).eq('is_approved', true),
          ])

          return res.json({
            success: true,
            data: {
              ...product,
              variations: variationsRes.data || [],
              reviews: reviewsRes.data || [],
            },
          })
        }
      } catch (err) {
        console.warn('Supabase getProductById fallback:', err.message)
      }
    }

    const found = MOCK_PRODUCTS.find((p) => p.id === id || p.slug === id)
    if (!found) {
      return res.status(404).json({ success: false, error: 'Product not found' })
    }

    res.json({
      success: true,
      data: {
        ...found,
        variations: found.variations || [],
        reviews: [],
      },
    })
  } catch (err) {
    next(err)
  }
}

/**
 * GET /api/products/featured
 */
async function getFeaturedProducts(req, res, next) {
  try {
    if (isConfigured) {
      const { data } = await supabase.from('products').select('*, categories(id, name, slug)').eq('is_featured', true).limit(8)
      if (data && data.length > 0) return res.json({ success: true, data })
    }
    const featured = MOCK_PRODUCTS.filter((p) => p.is_featured).slice(0, 8)
    res.json({ success: true, data: featured })
  } catch (err) {
    next(err)
  }
}

/**
 * GET /api/products/new-arrivals
 */
async function getNewArrivals(req, res, next) {
  try {
    if (isConfigured) {
      const { data } = await supabase.from('products').select('*, categories(id, name, slug)').eq('is_new_arrival', true).limit(8)
      if (data && data.length > 0) return res.json({ success: true, data })
    }
    const arrivals = MOCK_PRODUCTS.filter((p) => p.is_new_arrival).slice(0, 8)
    res.json({ success: true, data: arrivals })
  } catch (err) {
    next(err)
  }
}

/**
 * GET /api/products/best-sellers
 */
async function getBestSellers(req, res, next) {
  try {
    if (isConfigured) {
      const { data } = await supabase.from('products').select('*, categories(id, name, slug)').eq('is_best_seller', true).limit(8)
      if (data && data.length > 0) return res.json({ success: true, data })
    }
    const best = MOCK_PRODUCTS.filter((p) => p.is_best_seller).slice(0, 8)
    res.json({ success: true, data: best })
  } catch (err) {
    next(err)
  }
}

/**
 * GET /api/products/:id/related
 */
async function getRelatedProducts(req, res, next) {
  try {
    const { id } = req.params
    const target = MOCK_PRODUCTS.find((p) => p.id === id || p.slug === id)
    const related = MOCK_PRODUCTS.filter((p) => p.id !== id && p.slug !== id).slice(0, 4)
    res.json({ success: true, data: related })
  } catch (err) {
    next(err)
  }
}

/**
 * GET /api/products/search
 */
async function searchProducts(req, res, next) {
  try {
    const { q = '' } = req.query
    const matches = MOCK_PRODUCTS.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()))
    res.json({ success: true, data: matches })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getProducts,
  getProductById,
  getFeaturedProducts,
  getNewArrivals,
  getBestSellers,
  getRelatedProducts,
  searchProducts,
}
