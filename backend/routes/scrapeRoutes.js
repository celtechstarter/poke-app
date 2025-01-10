const express = require('express');
const { scrapeCardValue } = require('../utils/openaiScraper');

const router = express.Router();

// Endpunkt für die Kartensuche
router.post('/scan/scrape', async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ success: false, message: 'Kartenname fehlt.' });
  }

  try {
    const result = await scrapeCardValue(query);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Fehler beim Scrapen.', error: error.message });
  }
});

module.exports = router;
