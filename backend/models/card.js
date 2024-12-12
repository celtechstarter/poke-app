const mongoose = require('mongoose');

// Definiere das Schema für die Karten
const cardSchema = new mongoose.Schema(
  {
    image: { 
      type: String, 
      required: true 
    }, // Base64-Bild als String
    data: { 
      type: String, 
      default: '' 
    }, // Erkannter Text (optional)
  },
  {
    timestamps: true, // Automatische `createdAt` und `updatedAt` Felder
    versionKey: false, // Entfernt das `__v`-Feld
  }
);

// Index hinzufügen, um die Suche nach `createdAt` zu beschleunigen
cardSchema.index({ createdAt: -1 });

// Middleware, um vor dem Speichern Validierungen hinzuzufügen
cardSchema.pre('save', function (next) {
  if (!this.image.startsWith('data:image')) {
    return next(new Error('Ungültiges Bildformat.'));
  }
  next();
});

// Erstelle das Mongoose-Modell
const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
