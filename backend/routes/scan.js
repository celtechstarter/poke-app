const express = require('express');
const crypto = require('crypto'); // Für zufällige Dateinamen
const Tesseract = require('tesseract.js'); // OCR-Bibliothek
const path = require('path'); // Zum Verarbeiten des tessdata-Pfads
const Card = require('../models/card'); // Dein Mongoose-Modell

const router = express.Router();

// API für das Speichern eines Bildes in der MongoDB
router.post('/upload', async (req, res) => {
  const { image, data } = req.body;

  if (!image || !data) {
    return res.status(400).json({ error: 'Bild oder Daten fehlen.' });
  }

  try {
    // Validierung: Überprüfen, ob das Bild im Base64-Format ist
    if (!image.startsWith('data:image')) {
      return res.status(400).json({ error: 'Ungültiges Bildformat.' });
    }

    // Speichere das Bild und die Metadaten in der MongoDB
    const newCard = new Card({
      image, // Speichern des Base64-Bilds
      data,   // Zusätzliche Metadaten
    });

    await newCard.save();

    res.status(201).json({
      success: true,
      message: 'Bild erfolgreich gespeichert.',
      card: newCard,
    });
  } catch (error) {
    console.error('Fehler beim Speichern der Karte:', error);
    res.status(500).json({ error: 'Speichern fehlgeschlagen.' });
  }
});

// API für OCR-Texterkennung
router.post('/ocr', async (req, res) => {
  const { image } = req.body;

  if (!image) {
    return res.status(400).json({ error: 'Kein Bild bereitgestellt.' });
  }

  try {
    console.log('Geladenes Bild für OCR:', image); // Debugging

    // OCR mit Tesseract.js (deutsche Sprache)
    const result = await Tesseract.recognize(image, 'deu', {
      langPath: path.resolve(__dirname, '../tessdata'), // Pfad zu deinem Sprachpaket
      logger: (info) => console.log('OCR-Log:', info), // Debugging-Log
    });

    console.log('OCR-Ergebnis:', result.data.text);

    res.status(200).json({ text: result.data.text });
  } catch (error) {
    console.error('Fehler bei der Texterkennung:', error);
    res.status(500).json({ error: 'Fehler bei der Texterkennung.' });
  }
});

// API zum Abrufen des zuletzt gespeicherten Bildes und Texts
router.get('/latest', async (req, res) => {
  try {
    // Finde die zuletzt gespeicherte Karte
    const latestCard = await Card.findOne().sort({ createdAt: -1 });

    if (!latestCard) {
      return res.status(404).json({ error: 'Kein Bild in der Datenbank gefunden.' });
    }

    res.status(200).json({
      success: true,
      message: 'Erfolgreich abgerufen.',
      card: latestCard,
    });
  } catch (error) {
    console.error('Fehler beim Abrufen des Bildes:', error);
    res.status(500).json({ error: 'Fehler beim Abrufen des Bildes.' });
  }
});

module.exports = router;
