const { supabaseAdmin } = require('../config/supabase');

/**
 * Extract and verify a Bearer JWT from the Authorization header.
 * Returns the user object on success, or null on failure.
 */
async function verifyToken(req) {
  const authHeader = req.headers.authorization || '';
  if (!authHeader.startsWith('Bearer ')) return null;

  const token = authHeader.slice(7).trim();
  if (!token) return null;

  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data?.user) return null;

  return data.user;
}

/**
 * requireAuth — 401 if the request carries no valid token.
 * Sets req.user = { id, email, ... } on success.
 */
async function requireAuth(req, res, next) {
  try {
    const user = await verifyToken(req);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required. Please log in.',
      });
    }
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}

/**
 * optionalAuth — sets req.user if a valid token is present;
 * continues without error if no token or an invalid token is supplied.
 */
async function optionalAuth(req, res, next) {
  try {
    const user = await verifyToken(req);
    req.user = user || null;
    next();
  } catch (err) {
    // Even if something goes wrong, don't block the request
    req.user = null;
    next();
  }
}

module.exports = { requireAuth, optionalAuth };
