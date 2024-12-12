const express = require('express');
const Card = require('../models/card'); // Dein Mongoose-Modell

const router = express.Router();

// Route zum Hochladen von Base64-Bildern
router.post('/', async (req, res) => {
  try {
    const { image, data } = req.body;

    // Prüfen, ob Bild und Daten vorhanden sind
    if (!image || !data) {
      return res.status(400).json({ success: false, error: 'Bild oder Daten fehlen.' });
    }

    // Prüfen, ob das Bild im Base64-Format vorliegt
    if (!image.startsWith('data:image')) {
      return res.status(400).json({ success: false, error: 'Ungültiges Bildformat.' });
    }

    // Generiere zufälligen Namen für die Datei
    const randomName = require('crypto').randomBytes(16).toString('hex');

    // Erstelle ein neues Dokument und speichere es in der MongoDB
    const newCard = new Card({
      imageName: randomName,
      image,
      data,
    });

    await newCard.save();

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
