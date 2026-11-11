const { supabase } = require('../config/supabase');

// ─── getProductReviews ────────────────────────────────────────────────────────
/**
 * GET /api/reviews/product/:productId
 */
async function getProductReviews(req, res, next) {
  try {
    const { productId } = req.params;

    const { data: reviews, error } = await supabase
      .from('reviews')
      .select('id, rating, title, body, reviewer_name, created_at')
      .eq('product_id', productId)
      .eq('is_approved', true)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Build rating breakdown (1–5 star counts)
    const breakdown = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    let totalRating = 0;

    (reviews || []).forEach((r) => {
      const star = Math.min(5, Math.max(1, Math.round(r.rating)));
      breakdown[star] = (breakdown[star] || 0) + 1;
      totalRating += r.rating;
    });

    const count = reviews?.length || 0;
    const averageRating = count > 0 ? (totalRating / count).toFixed(2) : '0.00';

    res.json({
      success: true,
      data: reviews,
      summary: {
        averageRating: parseFloat(averageRating),
        totalReviews: count,
        breakdown,
      },
    });
  } catch (err) {
    next(err);
  }
}

// ─── submitReview ─────────────────────────────────────────────────────────────
/**
 * POST /api/reviews
 * Body: { product_id, rating, title?, body, reviewer_name, reviewer_email? }
 */
async function submitReview(req, res, next) {
  try {
    const { product_id, rating, title = '', body, reviewer_name, reviewer_email } = req.body;

    // Validate required fields
    if (!product_id) {
      return res.status(400).json({ success: false, error: 'product_id is required' });
    }
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ success: false, error: 'rating must be between 1 and 5' });
    }
    if (!body || body.trim().length < 10) {
      return res.status(400).json({ success: false, error: 'Review body must be at least 10 characters' });
    }
    if (!reviewer_name || reviewer_name.trim().length < 2) {
      return res.status(400).json({ success: false, error: 'reviewer_name is required' });
    }

    const { data, error } = await supabase
      .from('reviews')
      .insert({
        product_id,
        user_id: req.user?.id || null,
        rating: parseInt(rating, 10),
        title: title.trim(),
        body: body.trim(),
        reviewer_name: reviewer_name.trim(),
        reviewer_email: reviewer_email || null,
        is_approved: false, // Reviews require manual approval
      })
      .select('id, rating, title, body, reviewer_name, created_at')
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      data,
      message: 'Thank you! Your review has been submitted and is pending approval.',
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { getProductReviews, submitReview };
