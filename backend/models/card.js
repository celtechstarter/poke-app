const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  image: { type: String, required: true }, // URL des Bildes (S3 oder GridFS)
  data: { type: String, default: '' }, // Meta-Informationen oder OCR-Text
  name: { type: String, required: true }, // Name der Karte
  value: { type: Number, default: 0 }, // Preis oder geschätzter Wert
  userId: { type: String, required: true }, // Nutzer-ID (zur Filterung)
});

module.exports = mongoose.model('Card', cardSchema);
