const { supabase, supabaseAdmin } = require('../config/supabase');

// ─── createUserProfile ────────────────────────────────────────────────────────
/**
 * POST /api/auth/register
 * Called after Supabase client-side signup to create the user_profiles row.
 * Body: { userId, fullName, phone? }
 */
async function createUserProfile(req, res, next) {
  try {
    const { userId, fullName, phone } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, error: 'userId is required' });
    }

    const { data, error } = await supabaseAdmin
      .from('user_profiles')
      .upsert(
        {
          id: userId,
          full_name: fullName || null,
          phone: phone || null,
        },
        { onConflict: 'id' }
      )
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

// ─── getUserProfile ───────────────────────────────────────────────────────────
/**
 * GET /api/auth/profile   (requires auth)
 */
async function getUserProfile(req, res, next) {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', req.user.id)
      .single();

    if (error) {
      return res.status(404).json({ success: false, error: 'Profile not found' });
    }

    // Merge auth user email into profile
    res.json({
      success: true,
      data: {
        ...data,
        email: req.user.email,
      },
    });
  } catch (err) {
    next(err);
  }
}

// ─── updateUserProfile ────────────────────────────────────────────────────────
/**
 * PUT /api/auth/profile   (requires auth)
 * Body: { fullName?, phone?, defaultAddress? }
 */
async function updateUserProfile(req, res, next) {
  try {
    const { fullName, phone, defaultAddress } = req.body;

    const updates = { updated_at: new Date().toISOString() };
    if (fullName !== undefined) updates.full_name = fullName;
    if (phone !== undefined) updates.phone = phone;
    if (defaultAddress !== undefined) updates.default_address = defaultAddress;

    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', req.user.id)
      .select()
      .single();

    if (error) throw error;

    res.json({ success: true, data, message: 'Profile updated successfully' });
  } catch (err) {
    next(err);
  }
}

module.exports = { createUserProfile, getUserProfile, updateUserProfile };
