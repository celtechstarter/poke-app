// const express = require("express");
// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// require("dotenv").config(); // Umgebungsvariablen laden

// const router = express.Router();

// // Debugging: Umgebungsvariablen prüfen
// console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
// console.log("GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET);
// console.log("GOOGLE_REDIRECT_URI:", process.env.GOOGLE_REDIRECT_URI);

// // Passport-Strategie konfigurieren
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: process.env.GOOGLE_REDIRECT_URI || "http://localhost:5000/auth/google/callback",
//     },
//     (accessToken, refreshToken, profile, done) => {
//       console.log("Google-Benutzerprofil:", profile);
//       done(null, profile);
//     }
//   )
// );

// // Benutzer serialisieren und deserialisieren
// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

// // Google Login
// router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// // Google Callback
// router.get(
//   "/google/callback",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   (req, res) => {
//     res.redirect(process.env.FRONTEND_URL || "http://localhost:5173"); // Weiterleitung nach erfolgreichem Login
//   }
// );

// // Aktuellen Benutzer abrufen
// router.get("/current_user", (req, res) => {
//   if (req.isAuthenticated() && req.user) {
//     res.json({ user: req.user });
//   } else {
//     res.status(401).json({ error: "Nicht angemeldet" });
//   }
// });

// // Logout
// router.get("/logout", (req, res) => {
//   req.logout((err) => {
//     if (err) {
//       return res.status(500).json({ error: "Fehler beim Logout" });
//     }
//     req.session.destroy(() => {
//       res.clearCookie("connect.sid", { path: "/" }); // Session-Cookie löschen
//       res.status(200).json({ success: true, message: "Logout erfolgreich" });
//     });
//   });
// });

// module.exports = router;
