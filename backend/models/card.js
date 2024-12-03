const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  image: String,
  data: String
});

let cards = []; // Temporärer Speicher in einem Array

module.exports = {
  getCards: () => cards,
  addCard: (card) => {
    cards.push(card);
    return card;
  }
};

module.exports = mongoose.model('Card', cardSchema);
