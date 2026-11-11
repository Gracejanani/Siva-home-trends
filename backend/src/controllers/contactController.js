const { supabase } = require('../config/supabase');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ─── sendMessage ──────────────────────────────────────────────────────────────
/**
 * POST /api/contact
 * Body: { name, email, phone?, subject?, message }
 */
async function sendMessage(req, res, next) {
  try {
    const { name, email, phone = '', subject = '', message } = req.body;

    // Validate required fields
    if (!name || name.trim().length < 2) {
      return res.status(400).json({ success: false, error: 'Name must be at least 2 characters' });
    }
    if (!email || !EMAIL_REGEX.test(email)) {
      return res.status(400).json({ success: false, error: 'A valid email address is required' });
    }
    if (!message || message.trim().length < 10) {
      return res.status(400).json({
        success: false,
        error: 'Message must be at least 10 characters',
      });
    }

    const { data, error } = await supabase
      .from('contact_messages')
      .insert({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        phone: phone.trim() || null,
        subject: subject.trim() || null,
        message: message.trim(),
        status: 'unread',
      })
      .select('id, name, email, created_at')
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      data,
      message:
        'Thank you for reaching out! We will get back to you within 24 hours.',
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { sendMessage };
