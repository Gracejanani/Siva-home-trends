const express = require('express');
const router = express.Router();

const { createUserProfile, getUserProfile, updateUserProfile } = require('../controllers/authController');
const { requireAuth } = require('../middleware/auth');

// Create / upsert user profile (called after client-side Supabase signup)
router.post('/register', createUserProfile);

// Get authenticated user's profile
router.get('/profile', requireAuth, getUserProfile);

// Update authenticated user's profile
router.put('/profile', requireAuth, updateUserProfile);

module.exports = router;
