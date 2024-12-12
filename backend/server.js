const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const scanRoutes = require('./routes/scan'); // Scan-Route
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Debugging: Alle eingehenden Anfragen protokollieren
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Session-Management
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'default-secret-key',
    resave: false,
    saveUninitialized: false,
  })
);

// Verbindung zur MongoDB herstellen
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB verbunden'))
  .catch((err) => {
    console.error('MongoDB Verbindung fehlgeschlagen:', err);
    process.exit(1); // Beendet den Server, wenn die Verbindung fehlschlägt
  });

// Scan-Routen
app.use('/scan', scanRoutes);

// Test-Route für das Debugging
app.get('/scan/test', (req, res) => {
  res.status(200).json({ message: 'Test-Route erfolgreich erreichbar!' });
});

// Standardroute
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Server läuft erfolgreich!' });
});

// Fehlerbehandlung für nicht gefundene Routen
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route nicht gefunden.' });
});

// Fehler-Middleware für Server-Fehler
app.use((err, req, res, next) => {
  console.error('Interner Serverfehler:', err.message);
  res.status(500).json({ error: 'Ein interner Serverfehler ist aufgetreten.' });
});

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
