/*const express = require('express');
const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const router = express.Router();

// AWS S3 Setup
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Multer für Datei-Uploads
const upload = multer();

// Datei hochladen
router.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file;
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME, // Stelle sicher, dass dies in deiner .env-Datei definiert ist
    Key: `${Date.now()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read',
  };

  try {
    const command = new PutObjectCommand(params);
    const response = await s3.send(command);
    res.json({ message: 'Upload successful', data: response });
  } catch (error) {
    res.status(500).json({ message: 'Upload failed', error });
  }
});

module.exports = router; // Exportiere den Router

*/

const express = require('express');
const router = express.Router();
const Card = require('../models/card'); // MongoDB-Modell

// Route: POST /upload
router.post('/upload', async (req, res) => {
  const { image, data } = req.body; // Die Felder, die das Frontend sendet

  // Validierung: Überprüfe, ob Bilddaten vorhanden sind
  if (!image) {
    return res.status(400).json({ message: 'Bilddaten fehlen!' });
  }

  try {
    // Neues Dokument in der Datenbank speichern
    const newCard = new Card({
      image, // Base64-Bild
      data: data || 'Pokémon Card', // Zusätzliche Informationen
    });
    await newCard.save(); // Speichern in der Datenbank

    res.status(201).json({ message: 'Bild erfolgreich gespeichert', card: newCard });
  } catch (error) {
    console.error('Fehler beim Speichern:', error);
    res.status(500).json({ message: 'Fehler beim Speichern', error });
  }
});

module.exports = router;