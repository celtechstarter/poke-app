const express = require("express");
const Tesseract = require("tesseract.js"); // OCR-Bibliothek
const axios = require("axios"); // Für ScraperAPI-Anfragen
const dotenv = require("dotenv"); // Für Umgebungsvariablen
const Card = require("../models/card"); // Mongoose-Modell

dotenv.config(); // Lade Umgebungsvariablen aus der .env-Datei

const router = express.Router();

// OCR-Route
router.post("/ocr", async (req, res) => {
  const { image } = req.body;

  if (!image) {
    return res.status(400).json({ error: "Kein Bild bereitgestellt." });
  }

  try {
    console.log("OCR gestartet mit Bild:", image);

    // OCR ausführen
    const {
      data: { text },
    } = await Tesseract.recognize(image, "deu", {
      logger: (info) => console.log(info), // Fortschritt protokollieren
    });

    console.log("OCR-Ergebnis:", text);

    res.status(200).json({ text });
  } catch (error) {
    console.error("Fehler bei der Texterkennung:", error);
    res.status(500).json({ error: "Fehler bei der Texterkennung." });
  }
});

// Google-Suche mit ScraperAPI
router.post("/scrape", async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Suchbegriff fehlt." });
  }

  try {
    console.log("Starte ScraperAPI-Suche für:", query);

    const scraperAPIKey = process.env.SCRAPER_API_KEY;

    if (!scraperAPIKey) {
      throw new Error("SCRAPER_API_KEY fehlt in der .env-Datei.");
    }

    // ScraperAPI-URL für Google-Suche mit Cardmarket-Filter
    const scraperURL = `http://api.scraperapi.com?api_key=${scraperAPIKey}&url=https://www.google.com/search?q=${encodeURIComponent(
      query + " site:cardmarket.com"
    )}`;

    // Anfrage an ScraperAPI senden
    const response = await axios.get(scraperURL);

    // Links aus dem Google-HTML extrahieren
    const links = [
      ...response.data.matchAll(/<a href="\/url\?q=(.*?)&amp;/g),
    ].map((match) => decodeURIComponent(match[1]));

    // Filtern nach cardmarket.com
    const cardmarketLinks = links.filter((link) =>
      link.includes("cardmarket.com")
    );

    if (cardmarketLinks.length > 0) {
      res.status(200).json({ success: true, links: cardmarketLinks });
    } else {
      res.status(404).json({ error: "Keine passenden Karten gefunden." });
    }
  } catch (error) {
    console.error("Fehler bei der ScraperAPI-Suche:", error.message);
    res.status(500).json({ error: "Fehler bei der Suche nach der Karte." });
  }
});

// Route zum Speichern eines Bildes in der Datenbank
router.post("/upload", async (req, res) => {
  const { image, data } = req.body;

  if (!image || !data) {
    return res
      .status(400)
      .json({ error: "Bild oder Daten fehlen." });
  }

  try {
    if (!image.startsWith("data:image")) {
      return res
        .status(400)
        .json({ error: "Ungültiges Bildformat." });
    }

    const newCard = new Card({ image, data });
    await newCard.save();

    res.status(201).json({
      success: true,
      message: "Bild erfolgreich gespeichert.",
      card: newCard,
    });
  } catch (error) {
    console.error("Fehler beim Speichern der Karte:", error);
    res.status(500).json({ error: "Speichern fehlgeschlagen." });
  }
});

// Route zum Abrufen des zuletzt gespeicherten Bildes und Texts
router.get("/latest", async (req, res) => {
  try {
    const latestCard = await Card.findOne().sort({ createdAt: -1 });

    if (!latestCard) {
      return res
        .status(404)
        .json({ error: "Kein Bild in der Datenbank gefunden." });
    }

    res.status(200).json({
      success: true,
      message: "Erfolgreich abgerufen.",
      card: latestCard,
    });
  } catch (error) {
    console.error("Fehler beim Abrufen des Bildes:", error);
    res.status(500).json({ error: "Fehler beim Abrufen des Bildes." });
  }
});

module.exports = router;
