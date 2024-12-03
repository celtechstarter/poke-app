const express = require('express');
const passport = require('passport');

const router = express.Router();

// Google Authentifizierung starten
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google Authentifizierung Callback
router.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/scan',
  failureRedirect: '/'
}));

module.exports = router;
