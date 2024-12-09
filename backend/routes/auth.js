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
      console.log('Profil:', profile); // Hier kannst du das Profil des Nutzers speichern oder verarbeiten
      done(null, profile);
    }
  )
);

// Endpunkte für Google OAuth
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/scan', // Weiterleitung nach erfolgreichem Login
    failureRedirect: '/login', // Weiterleitung bei Fehler
  })
);

module.exports = router;
