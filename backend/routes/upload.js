const express = require('express');
const multer = require('multer');
const crypto = require('crypto'); // Für zufällige Dateinamen
const Card = require('../models/card'); // Dein Mongoose-Modell

const router = express.Router();

// Multer-Konfiguration (im Arbeitsspeicher speichern)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route zum Hochladen von Dateien
router.post('/', upload.single('file'), async (req, res) => {
  try {
    // Prüfen, ob eine Datei mitgesendet wurde
    if (!req.file) {
      return res.status(400).json({ error: 'Kein Bild bereitgestellt.' });
    }

    // Generiere zufälligen Namen für die Datei
    const randomName = crypto.randomBytes(16).toString('hex');

    // Konvertiere das hochgeladene Bild in Base64
    const base64Image = req.file.buffer.toString('base64');

    // Erstelle ein neues Dokument und speichere es in der MongoDB
    const newCard = new Card({
      imageName: randomName,
      image: `data:${req.file.mimetype};base64,${base64Image}`, // Base64-Daten mit MIME-Typ
      data: req.body.data || 'Keine Metadaten', // Zusätzliche Daten aus der Anfrage
    });

    // Speichere die Karte in der MongoDB
    await newCard.save();

    // Sende erfolgreiche Antwort zurück
    res.status(201).json({
      success: true,
      message: 'Datei erfolgreich hochgeladen.',
      card: newCard,
    });
  } catch (error) {
    console.error('Fehler beim Hochladen:', error);
    res.status(500).json({ success: false, error: 'Fehler beim Hochladen.' });
  }
});

module.exports = router;
