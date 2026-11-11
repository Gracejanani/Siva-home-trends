const { supabase, isConfigured } = require('../config/supabase')
const { MOCK_CATEGORIES } = require('../config/mockData')

/**
 * GET /api/categories
 */
async function getCategories(req, res, next) {
  try {
    if (isConfigured) {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true })

        if (!error && data && data.length > 0) {
          return res.json({ success: true, data })
        }
      } catch (err) {
        console.warn('Supabase getCategories fallback:', err.message)
      }
    }

    res.json({
      success: true,
      data: MOCK_CATEGORIES,
    })
  } catch (err) {
    next(err)
  }
}

/**
 * GET /api/categories/:slug
 */
async function getCategoryBySlug(req, res, next) {
  try {
    const { slug } = req.params

    if (isConfigured) {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .eq('slug', slug)
          .eq('is_active', true)
          .single()

        if (!error && data) {
          return res.json({ success: true, data })
        }
      } catch (err) {
        console.warn('Supabase getCategoryBySlug fallback:', err.message)
      }
    }

    const cat = MOCK_CATEGORIES.find((c) => c.slug === slug)
    if (!cat) {
      return res.status(404).json({ success: false, error: 'Category not found' })
    }

    res.json({ success: true, data: cat })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getCategories,
  getCategoryBySlug,
}
