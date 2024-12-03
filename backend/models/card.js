const mongoose = require('mongoose');

// Schema-Definition für Karten
const cardSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const CardModel = mongoose.model('Card', cardSchema);

// Temporärer Speicher in einem Array
let tempCards = [];

// Funktionen für temporären Speicher und Datenbank
module.exports = {
  // Mongoose-Modell
  CardModel,

  // Temporären Speicher abrufen
  getCards: () => tempCards,

  // Karte zum temporären Speicher hinzufügen
  addCard: (card) => {
    tempCards.push(card); // Füge Karte zum temporären Speicher hinzu
    return card;
  },

  // Karte in die Datenbank speichern
  saveCardToDB: async (card) => {
    const newCard = new CardModel(card);
    return await newCard.save();
  },
};
