const express = require('express');
const crypto = require('crypto'); // Für zufällige Dateinamen
const Tesseract = require('tesseract.js'); // OCR-Bibliothek
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

    // Generiere einen zufälligen Namen
    const randomName = crypto.randomBytes(16).toString('hex');

    // Speichere das Bild und die Metadaten in der MongoDB
    const newCard = new Card({
      imageName: randomName,
      image,
      data,
    });

    await newCard.save();

    // Rückmeldung, dass das Bild gespeichert wurde
    res.status(201).json({
      message: 'Bild erfolgreich gespeichert.',
      card: newCard,
    });

    // OCR-Prozess starten (asynchron, um den Upload nicht zu blockieren)
    Tesseract.recognize(image, 'eng', {
      logger: (info) => console.log('OCR-Log:', info),
    })
      .then(({ data: { text } }) => {
        console.log(`Erkannter Text für Bild ${newCard._id}:`, text);
        // Aktualisiere die Karte mit dem erkannten Text
        newCard.data = text;
        newCard.save();
      })
      .catch((err) => {
        console.error('Fehler bei der Texterkennung:', err);
      });
  } catch (error) {
    console.error('Fehler beim Speichern der Karte:', error);
    res.status(500).json({ error: 'Speichern fehlgeschlagen.' });
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
      message: 'Erfolgreich abgerufen.',
      card: latestCard,
    });
  } catch (error) {
    console.error('Fehler beim Abrufen des Bildes:', error);
    res.status(500).json({ error: 'Fehler beim Abrufen des Bildes.' });
  }
});

// API zum Abrufen eines spezifischen Bildes und Texts über die ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Hole das Bild aus der Datenbank
    const card = await Card.findById(id);

    if (!card) {
      return res.status(404).json({ error: 'Bild nicht gefunden.' });
    }

    // Rückgabe des erkannten Texts
    res.status(200).json({
      message: 'Text erfolgreich abgerufen.',
      recognizedText: card.data,
    });
  } catch (error) {
    console.error('Fehler beim Abrufen des Bildes:', error);
    res.status(500).json({ error: 'Fehler beim Abrufen des Bildes.' });
  }
});

module.exports = router;
