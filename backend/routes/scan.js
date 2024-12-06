/*const express = require('express');
const Card = require('../models/card'); // Dein Card-Mongoose-Modell
const router = express.Router();

// API für das Speichern eines Bildes in der MongoDB
router.post('/upload', async (req, res) => {
  const { image, data } = req.body;
  try {
    const newCard = new Card({ image, data }); // Speichere Image und Meta-Daten
    await newCard.save();
    res.status(201).json(newCard);
  } catch (error) {
    console.error('Fehler beim Speichern der Karte:', error);
    res.status(500).json({ error: 'Speichern fehlgeschlagen' });
  }
});

// API für das Abrufen aller Karten
router.get('/cards', async (req, res) => {
  try {
    const cards = await Card.find(); // Alle Karten abrufen
    res.status(200).json(cards);
  } catch (error) {
    console.error('Fehler beim Abrufen der Karten:', error);
    res.status(500).json({ error: 'Abruf fehlgeschlagen' });
  }
});

module.exports = router;
*/

const express = require('express');
const Card = require('../models/card'); // Dein Card-Mongoose-Modell
const router = express.Router();

// API für das Speichern eines Bildes in der MongoDB
router.post('/upload', async (req, res) => {
  const { image, data, name, value, userId } = req.body; // Nutzer-ID hinzugefügt
  try {
    const newCard = new Card({
      image,
      data,
      name: name || 'Unbekannt', // Name der Karte optional
      value: value || 0, // Standardwert für Preis
      userId, // Nutzer-ID für Zuordnung
    });

    await newCard.save();
    res.status(201).json(newCard);
  } catch (error) {
    console.error('Fehler beim Speichern der Karte:', error);
    res.status(500).json({ error: 'Speichern fehlgeschlagen' });
  }
});

// API für das Abrufen aller Karten eines Nutzers
router.get('/cards', async (req, res) => {
  const { userId } = req.query; // Nutzer-ID aus der Anfrage

  if (!userId) {
    return res.status(400).json({ error: 'userId ist erforderlich.' }); // Fehler, wenn keine Nutzer-ID angegeben wird
  }

  try {
    const cards = await Card.find({ userId }); // Karten nur für den Nutzer abrufen
    res.status(200).json(cards);
  } catch (error) {
    console.error('Fehler beim Abrufen der Karten:', error);
    res.status(500).json({ error: 'Abruf fehlgeschlagen' });
  }
});

module.exports = router;
