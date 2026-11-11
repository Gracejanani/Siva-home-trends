const { supabase } = require('../config/supabase');

// Very simple email format check
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ─── subscribe ────────────────────────────────────────────────────────────────
/**
 * POST /api/newsletter/subscribe
 * Body: { email, name? }
 */
async function subscribe(req, res, next) {
  try {
    const { email, name = '' } = req.body;

    if (!email || !EMAIL_REGEX.test(email)) {
      return res.status(400).json({ success: false, error: 'A valid email address is required' });
    }

    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .upsert(
        {
          email: email.toLowerCase().trim(),
          name: name.trim() || null,
          is_active: true,
          subscribed_at: new Date().toISOString(),
        },
        { onConflict: 'email' }
      )
      .select('id, email')
      .single();

    if (error) throw error;

    res.status(200).json({
      success: true,
      data,
      message: 'Thank you for subscribing! You will receive our latest updates and offers.',
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { subscribe };
