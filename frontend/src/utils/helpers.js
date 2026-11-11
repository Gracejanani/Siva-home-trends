// ─── Price ───────────────────────────────────────────────────────────────────

/**
 * Format a numeric price into Indian Rupee format.
 * @param {number} price
 * @returns {string} e.g. "₹1,299"
 */
export function formatPrice(price) {
  if (price == null || isNaN(price)) return '₹0'
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

// ─── Date ────────────────────────────────────────────────────────────────────

/**
 * Format a date string or Date object into a human-readable string.
 * @param {string|Date} date
 * @returns {string} e.g. "11 Nov 2024"
 */
export function formatDate(date) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

// ─── Slugify ─────────────────────────────────────────────────────────────────

/**
 * Convert a string to a URL-friendly slug.
 * @param {string} text
 * @returns {string} e.g. "silk-banarasi-saree"
 */
export function slugify(text) {
  if (!text) return ''
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')       // spaces → hyphens
    .replace(/[^\w-]+/g, '')    // remove non-word chars
    .replace(/--+/g, '-')       // collapse multiple hyphens
    .replace(/^-+|-+$/g, '')    // trim leading/trailing hyphens
}

// ─── Discount ────────────────────────────────────────────────────────────────

/**
 * Calculate the discount percentage between original and sale price.
 * @param {number} original
 * @param {number} sale
 * @returns {number} percentage (0–100), rounded to nearest integer
 */
export function calculateDiscount(original, sale) {
  if (!original || !sale || original <= 0) return 0
  return Math.round(((original - sale) / original) * 100)
}

// ─── Text ────────────────────────────────────────────────────────────────────

/**
 * Truncate text to a maximum length, appending "..." if needed.
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export function truncateText(text, maxLength = 100) {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + '...'
}

// ─── Order ───────────────────────────────────────────────────────────────────

/**
 * Generate a unique order number prefixed with "SJ".
 * @returns {string} e.g. "SJ1699987654321"
 */
export function generateOrderNumber() {
  return `SJ${Date.now()}`
}

// ─── Images ──────────────────────────────────────────────────────────────────

const PLACEHOLDER =
  'https://placehold.co/400x500/fff5f8/c4005b?text=SJ+Saree'

/**
 * Return the image URL if valid, otherwise a branded placeholder.
 * @param {string|null|undefined} url
 * @param {string} [fallback]
 * @returns {string}
 */
export function getImageUrl(url, fallback = PLACEHOLDER) {
  if (!url || typeof url !== 'string' || url.trim() === '') return fallback
  return url
}
