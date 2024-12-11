const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const axios = require('axios');
const authRoutes = require('./routes/auth'); // Authentifizierungsrouten
const uploadRoutes = require('./routes/upload'); // Upload-Route
const scanRoutes = require('./routes/scan'); // Scan-Route
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: '10mb' })); // JSON-Größenlimit erhöhen
app.use(express.urlencoded({ extended: true })); // Unterstützt URL-codierte Daten
app.use(cors());

// Debugging: Alle eingehenden Anfragen protokollieren
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Session-Management
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'default-secret-key', // Sicherer Schlüssel
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
    process.exit(1); // Beendet den Server bei Verbindungsfehler
  });

// Authentifizierungsrouten
app.use('/auth', authRoutes);

// Upload- und Scan-Routen
app.use('/upload', uploadRoutes);
app.use('/scan', scanRoutes);

// ScraperAPI-Route
app.post('/scrape-price', async (req, res) => {
  try {
    const { cardName } = req.body; // Kartentext aus OCR
    if (!cardName) {
      return res.status(400).json({ error: 'CardName ist erforderlich.' });
    }

    const scraperApiUrl = `http://api.scraperapi.com?api_key=${process.env.SCRAPER_API_KEY}&url=https://www.cardmarket.com/en/Magic/Products/Search?searchString=${encodeURIComponent(
      cardName
    )}`;

    // ScraperAPI-Anfrage
    const response = await axios.get(scraperApiUrl);
    const html = response.data;

    const priceRegex = /<span class="price">\s*€(\d+\.\d{2})\s*<\/span>/;
    const match = html.match(priceRegex);

    if (match && match[1]) {
      const price = match[1];
      res.json({ cardName, price });
    } else {
      res.status(404).json({ error: 'Preis nicht gefunden.' });
    }
  } catch (error) {
    console.error('Fehler beim Scraping-Prozess:', error);
    res.status(500).json({ error: 'Fehler beim Scraping-Prozess.' });
  }
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

// Standardroute
app.get('/', (req, res) => res.send('Server läuft!'));

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
