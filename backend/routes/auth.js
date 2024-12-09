const express = require('express');
const passport = require('passport');
require('dotenv').config(); // Um Umgebungsvariablen zu nutzen

const router = express.Router();

// Google Login Route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google Callback Route
router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/scan', // Bei Erfolg weiterleiten
    failureRedirect: '/', // Bei Fehler zurück zur Login-Seite
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
