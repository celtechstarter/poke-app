const express = require('express');
const { addCard, getCards } = require('../models/card');
const router = express.Router();

router.post('/upload', (req, res) => {
  const { image, data } = req.body;
  const newCard = { id: Date.now(), image, data };
  addCard(newCard);
  res.json(newCard);
});

router.get('/cards', (req, res) => {
  res.json(getCards());
});

module.exports = router;
