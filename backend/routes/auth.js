require("dotenv").config(); // .env-Datei laden
const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const router = express.Router();

// Passport-Strategie konfigurieren
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URI || "http://localhost:5000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("Benutzerprofil:", profile);
      done(null, profile); // Profil weitergeben
    }
  )
);

// Benutzersitzung serialisieren
passport.serializeUser((user, done) => {
  done(null, user);
});

// Benutzersitzung deserialisieren
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Google Login Route
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google Callback Route
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    res.redirect("/scan"); // Erfolgreiches Login
  }
);

// Route zum Überprüfen der aktuellen Benutzersitzung
router.get("/current_user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: "Nicht angemeldet" });
  }
});

// Route zum Abmelden
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send({ error: "Fehler beim Abmelden" });
    }
    res.redirect("/");
  });
});

module.exports = router;
 //app.use(passport.initialize());
//app.use(passport.session());