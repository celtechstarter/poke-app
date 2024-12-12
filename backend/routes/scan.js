const express = require('express');
const Tesseract = require('tesseract.js'); // OCR-Bibliothek
const path = require('path'); // Für den Pfad zu tessdata
const Card = require('../models/card'); // Mongoose-Modell

const router = express.Router();

// OCR-Route
router.post('/ocr', async (req, res) => {
  const { image } = req.body;

  if (!image) {
    return res.status(400).json({ error: 'Kein Bild bereitgestellt.' });
  }

  try {
    console.log('OCR gestartet mit Bild:', image);

    // OCR ausführen
    const { data: { text } } = await Tesseract.recognize(
      image, // Base64-String des Bildes
      'deu', // Sprache (Deutsch)
      {
        logger: (info) => console.log(info), // Fortschritt protokollieren
      }
    );

    console.log('OCR-Ergebnis:', text);

    res.status(200).json({ text });
  } catch (error) {
    console.error('Fehler bei der Texterkennung:', error);
    res.status(500).json({ error: 'Fehler bei der Texterkennung.' });
  }
});

// Route zum Speichern eines Bildes in der Datenbank
router.post('/upload', async (req, res) => {
  const { image, data } = req.body;

  if (!image || !data) {
    return res.status(400).json({ error: 'Bild oder Daten fehlen.' });
  }

  try {
    if (!image.startsWith('data:image')) {
      return res.status(400).json({ error: 'Ungültiges Bildformat.' });
    }

    const newCard = new Card({ image, data });
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

// Route zum Abrufen des zuletzt gespeicherten Bildes und Texts
router.get('/latest', async (req, res) => {
  try {
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
