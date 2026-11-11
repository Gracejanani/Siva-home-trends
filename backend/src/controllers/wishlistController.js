const { supabase } = require('../config/supabase');

// ─── getWishlist ──────────────────────────────────────────────────────────────
/**
 * GET /api/wishlist   (requires auth)
 */
async function getWishlist(req, res, next) {
  try {
    const { data, error } = await supabase
      .from('wishlists')
      .select(
        `
        id, created_at,
        products (
          id, name, slug, price, sale_price, discount_percentage,
          images, average_rating, review_count, stock_quantity
        )
      `
      )
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

// ─── addToWishlist ────────────────────────────────────────────────────────────
/**
 * POST /api/wishlist
 * Body: { product_id }
 */
async function addToWishlist(req, res, next) {
  try {
    const { product_id } = req.body;

    if (!product_id) {
      return res.status(400).json({ success: false, error: 'product_id is required' });
    }

    // Upsert to avoid duplicates
    const { data, error } = await supabase
      .from('wishlists')
      .upsert(
        { user_id: req.user.id, product_id },
        { onConflict: 'user_id,product_id', ignoreDuplicates: true }
      )
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ success: true, data, message: 'Product added to wishlist' });
  } catch (err) {
    next(err);
  }
}

// ─── removeFromWishlist ───────────────────────────────────────────────────────
/**
 * DELETE /api/wishlist/:productId   (requires auth)
 */
async function removeFromWishlist(req, res, next) {
  try {
    const { productId } = req.params;

    const { error } = await supabase
      .from('wishlists')
      .delete()
      .eq('user_id', req.user.id)
      .eq('product_id', productId);

    if (error) throw error;

    res.json({ success: true, message: 'Product removed from wishlist' });
  } catch (err) {
    next(err);
  }
}

module.exports = { getWishlist, addToWishlist, removeFromWishlist };
