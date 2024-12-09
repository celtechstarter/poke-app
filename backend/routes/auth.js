require('dotenv').config(); // .env-Datei laden
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const router = express.Router();

// Konfiguration von Passport mit Google OAuth
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, // Aus der .env-Datei
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Aus der .env-Datei
      callbackURL: 'http://localhost:5000/auth/google/callback', // Lokale Callback-URL
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('Profil:', profile); // Profil verarbeiten
      done(null, profile);
    }
  )
);

// Google Login Route
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google Callback Route
router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/scan', // Weiterleitung nach erfolgreichem Login
    failureRedirect: '/login', // Weiterleitung bei Fehler
  })
);

// Route zum Überprüfen der Anmeldung
router.get('/current_user', (req, res) => {
  if (req.user) {
    res.send(req.user);
  } else {
    res.status(401).send({ error: 'Nicht angemeldet' });
  }
});

// Route zum Abmelden
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send({ error: 'Fehler beim Abmelden' });
    }
    res.redirect('/');
  });
});

module.exports = router;
