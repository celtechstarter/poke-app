const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const cors = require('cors');
require('dotenv').config();

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
