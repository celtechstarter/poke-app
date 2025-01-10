const puppeteer = require('puppeteer');

/**
 * Funktion zum Scrapen von Cardmarket, um den Wert einer Pokémon-Karte zu ermitteln.
 * @param {string} cardName - Der Name der Pokémon-Karte.
 * @returns {Promise<object>} - Details der Karte, einschließlich Preise.
 */
async function scrapeCardValue(cardName) {
  const cardmarketUrl = 'https://www.cardmarket.com'; // Basis-URL für Cardmarket
  const searchUrl = `${cardmarketUrl}/en/Pokemon/Products/Search?searchString=${encodeURIComponent(cardName)}`;
  
  let browser;
  try {
    // Starte Puppeteer
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    
    // Gehe zur Suchseite
    await page.goto(searchUrl, { waitUntil: 'domcontentloaded' });
    
    // Warte auf den ersten Suchergebniseintrag
    await page.waitForSelector('.table-body-row');
    
    // Extrahiere Informationen aus dem ersten Suchergebnis
    const cardData = await page.evaluate(() => {
      const firstRow = document.querySelector('.table-body-row');
      if (!firstRow) {
        return null; // Keine Ergebnisse gefunden
      }

      const title = firstRow.querySelector('.product-title')?.textContent.trim();
      const price = firstRow.querySelector('.price-container span')?.textContent.trim();
      const url = firstRow.querySelector('.product-title a')?.href;

      return { title, price, url };
    });

    if (!cardData) {
      throw new Error('Keine Karte gefunden.');
    }

    return {
      success: true,
      card: cardData,
    };
  } catch (error) {
    console.error('Fehler beim Scrapen:', error.message);
    return {
      success: false,
      error: 'Fehler beim Scrapen der Daten.',
    };
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

module.exports = { scrapeCardValue };
