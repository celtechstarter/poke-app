/*const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const cors = require('cors');
require('dotenv').config();
const Tesseract = require('tesseract.js');


const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB URI
const mongoURI = process.env.MONGO_URI;

// Verbindung zur MongoDB herstellen
mongoose.connect(mongoURI).then(() => console.log('MongoDB verbunden')).catch((err) => console.error('MongoDB Verbindung fehlgeschlagen:', err));

// GridFS Storage konfigurieren
// const storage = new GridFsStorage({
//   url: mongoURI,
//   file: (req, file) => {
//     return {
//       bucketName: 'uploads', // Der Name der GridFS-Bucket
//       filename: `${Date.now()}-${file.originalname}`,
//     };
//   },
// });


// OCR-Route
app.post('/ocr', async (req, res) => {
  try {
    const { fileId } = req.body; // Bild-ID aus der Anfrage
    if (!fileId) {
      return res.status(400).json({ error: 'FileId ist erforderlich.' });
    }

    // Bild aus MongoDB herunterladen
    const downloadStream = gfs.openDownloadStream(new mongoose.Types.ObjectId(fileId));
    const tempFilePath = path.join(__dirname, `./temp/${fileId}.jpg`);
    
    const writeStream = fs.createWriteStream(tempFilePath);
    downloadStream.pipe(writeStream);

    writeStream.on('close', async () => {
      // OCR mit Tesseract.js
      try {
        const { data: { text } } = await Tesseract.recognize(tempFilePath, 'eng', {
          logger: (info) => console.log(info), // Protokollierungsoptionen (optional)
        });
        
        fs.unlinkSync(tempFilePath); // Temporäre Datei löschen
        res.json({ text }); // Extrahierter Text an den Client senden
      } catch (error) {
        console.error('Fehler bei der Texterkennung:', error);
        fs.unlinkSync(tempFilePath); // Temporäre Datei löschen
        res.status(500).json({ error: 'Fehler bei der Texterkennung.' });
      }
    });

    writeStream.on('error', (err) => {
      console.error('Fehler beim Herunterladen der Datei:', err);
      res.status(500).json({ error: 'Fehler beim Herunterladen der Datei.' });
    });
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

    const scraperApiUrl = `http://api.scraperapi.com?api_key=${process.env.SCRAPER_API_KEY}&url=https://www.cardmarket.com/en/Magic/Products/Search?searchString=${encodeURIComponent(cardName)}`;
    
    // ScraperAPI-Anfrage
    const response = await axios.get(scraperApiUrl);
    const html = response.data;

    // Preis aus dem HTML extrahieren
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




const storage = multer.memoryStorage();
const File = mongoose.model('File', new mongoose.Schema({}));

const upload = multer({ storage });
app.get('/', (req, res) => res.send('Hello World!'));
// Route zum Hochladen von Bildern
app.post('/upload', upload.single('file'), (req, res) => {
  console.log (req)
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
*/

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB URI
const mongoURI = process.env.MONGO_URI;

// Verbindung zur MongoDB herstellen
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB verbunden'))
  .catch((err) => console.error('MongoDB Verbindung fehlgeschlagen:', err));

// Routen importieren
const scanRoutes = require('./routes/scan');
const uploadRoutes = require('./routes/upload');

// OCR und Scraping-Funktionen importieren
const { ocrHandler } = require('./utils/ocr'); // Eine separate Datei für OCR-Logik
const { scrapePriceHandler } = require('./utils/scraper'); // Separate Datei für Scraper

// Routen registrieren
app.use('/scan', scanRoutes); // `/scan` für Karten-Operationen
app.use('/upload', uploadRoutes); // `/upload` für S3-Bilder

// OCR-Route
app.post('/ocr', ocrHandler);

// Scraper-Route
app.post('/scrape-price', scrapePriceHandler);

// Standardroute
app.get('/', (req, res) => res.send('PokeScan Backend läuft!'));

// Starten des Servers
app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});