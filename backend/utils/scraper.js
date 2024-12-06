/*const axios = require('axios');

async function performOCR(image) {
  // Implement OpenAI scraping logic here
  return 'Sample card text data';
}

module.exports = { performOCR };
*/

const axios = require('axios');

const scrapePriceHandler = async (req, res) => {
  try {
    const { cardName } = req.body; // Kartentext aus OCR
    if (!cardName) {
      return res.status(400).json({ error: 'CardName ist erforderlich.' });
    }

    const scraperApiUrl = `http://api.scraperapi.com?api_key=${process.env.SCRAPER_API_KEY}&url=https://www.cardmarket.com/en/Magic/Products/Search?searchString=${encodeURIComponent(cardName)}`;
    
    const response = await axios.get(scraperApiUrl);
    const html = response.data;

    const priceRegex = /<span class="price">\s*€(\d+\.\d{2})\s*<\/span>/;
    const match = html.match(priceRegex);

    if (match && match[1]) {
      const price = match[1];
      res.json({ cardName, price });
    } else {
      res.status(404).json({ error: 'Preis nicht gefunden' });
    }
  } catch (error) {
    console.error('Fehler beim Scraping-Prozess:', error);
    res.status(500).json({ error: 'Fehler beim Scraping-Prozess.' });
  }
};

module.exports = { scrapePriceHandler };