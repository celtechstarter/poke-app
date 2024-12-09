const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const authRoutes = require('./routes/auth'); // Importiere die Authentifizierungsrouten
require('dotenv').config();
const Tesseract = require('tesseract.js');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Session-Management (für Passport.js)
app.use(
  session({
    secret: 'secret-key', // Ersetze durch einen sicheren Schlüssel
    resave: false,
    saveUninitialized: false,
  })
);

// Passport.js initialisieren
app.use(passport.initialize());
app.use(passport.session());

// MongoDB URI
const mongoURI = process.env.MONGO_URI;

// Verbindung zur MongoDB herstellen
mongoose
  .connect(mongoURI)
  .then(() => console.log('MongoDB verbunden'))
  .catch((err) => console.error('MongoDB Verbindung fehlgeschlagen:', err));

// Authentifizierungsrouten
app.use('/auth', authRoutes); // Nutze die Authentifizierungsrouten

// OCR-Route
app.post('/ocr', async (req, res) => {
  try {
    const { fileId } = req.body; // Bild-ID aus der Anfrage
    if (!fileId) {
      return res.status(400).json({ error: 'FileId ist erforderlich.' });
    }

    // OCR-Logik
    // Hier kannst du deine bestehende OCR-Logik einfügen
  } catch (error) {
    console.error('Fehler bei der Texterkennung:', error);
    res.status(500).json({ error: 'Fehler bei der Texterkennung.' });
  }
});

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
      res.status(404).json({ error: 'Preis nicht gefunden' });
    }
  } catch (error) {
    console.error('Fehler beim Scraping-Prozess:', error);
    res.status(500).json({ error: 'Fehler beim Scraping-Prozess.' });
  }
});

// GridFS/Multer-Konfiguration
const storage = multer.memoryStorage();
const File = mongoose.model('File', new mongoose.Schema({}));
const upload = multer({ storage });

app.get('/', (req, res) => res.send('Hello World!'));

// Route zum Hochladen von Bildern
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Fehler beim Hochladen der Datei.' });
  }

  const file = new File({ name: req.file.originalname, data: req.file.buffer });
  file.save();
  res.status(201).json({ message: 'Datei erfolgreich hochgeladen.', file: req.file });
});

// Starten des Servers
app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
