const express = require("express");
const Tesseract = require("tesseract.js");
const axios = require("axios");
const { uploadToS3 } = require("../s3Integration");
const dotenv = require("dotenv");

dotenv.config();
const router = express.Router();

// OCR-Route
router.post("/ocr", async (req, res) => {
  const { image } = req.body;

  if (!image) {
    return res.status(400).json({ error: "Kein Bild bereitgestellt." });
  }

  try {
    console.log("OCR gestartet mit Bild...");

    const {
      data: { text },
    } = await Tesseract.recognize(image, "deu", {
      logger: (info) => console.log(info),
    });

    console.log("OCR-Ergebnis:", text);

    res.status(200).json({ text });
  } catch (error) {
    console.error("Fehler bei der OCR:", error.message);
    res.status(500).json({ error: "Texterkennung fehlgeschlagen." });
  }
});

// ScraperAPI-Route
router.post("/scrape", async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Suchbegriff fehlt." });
  }

  try {
    const scraperAPIKey = process.env.SCRAPER_API_KEY;
    if (!scraperAPIKey) {
      throw new Error("SCRAPER_API_KEY fehlt.");
    }

    const scraperURL = `${process.env.SCRAPER_API_URL}?api_key=${scraperAPIKey}&url=https://www.google.com/search?q=${encodeURIComponent(
      query + " site:cardmarket.com"
    )}`;

    const response = await axios.get(scraperURL);
    const links = (response.data.match(/<a href="\/url\?q=(.*?)&amp;/g) || [])
      .map((link) => {
        const match = link.match(/q=(.*?)&/);
        return match ? decodeURIComponent(match[1]) : null;
      })
      .filter((link) => link && link.includes("cardmarket.com"));

    res.status(200).json({ success: true, links });
  } catch (error) {
    console.error("Fehler bei der ScraperAPI:", error.message);
    res.status(500).json({ error: "Fehler bei der Suche." });
  }
});

// Route zum Abrufen des zuletzt hochgeladenen Bildes und OCR-Texterkennung
router.get("/latest", async (req, res) => {
  try {
    // Beispielimplementierung, falls Datenbankanbindung existiert:
    const latestImage = await getLatestImageFromDB(); // getLatestImageFromDB muss implementiert werden

    if (!latestImage) {
      return res.status(404).json({ error: "Kein Bild gefunden." });
    }

    res.status(200).json({ card: latestImage });
  } catch (error) {
    console.error("Fehler beim Abrufen des Bildes:", error.message);
    res.status(500).json({ error: "Fehler beim Abrufen des Bildes." });
  }
});

// Route zum Hochladen eines Bildes
router.post("/upload", async (req, res) => {
  const { image, metadata } = req.body;

  if (!image || !metadata) {
    return res.status(400).json({ error: "Bild oder Metadaten fehlen." });
  }

  try {
    const imageKey = `images/${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;
    const metadataKey = `metadata/${Date.now()}-${Math.random().toString(36).substring(7)}.json`;

    const base64Image = image.replace(/^data:image\/\w+;base64,/, "");
    const imageBuffer = Buffer.from(base64Image, "base64");

    await uploadToS3(process.env.S3_BUCKET_NAME, imageKey, imageBuffer, "image/jpeg");
    await uploadToS3(process.env.S3_BUCKET_NAME, metadataKey, JSON.stringify(metadata), "application/json");

    console.log("Bild und Metadaten erfolgreich hochgeladen.");

    res.status(201).json({ success: true, imageKey, metadataKey });
  } catch (error) {
    console.error("Fehler beim Hochladen:", error.message);
    res.status(500).json({ error: "Fehler beim Hochladen des Bildes." });
  }
});

module.exports = router;




// Alte scan.js-Datei
// const express = require("express");
// const Tesseract = require("tesseract.js"); // OCR-Bibliothek
// const axios = require("axios"); // Für ScraperAPI-Anfragen
// const dotenv = require("dotenv"); // Für Umgebungsvariablen
// const Card = require("../models/card"); // Mongoose-Modell

// dotenv.config(); // Lade Umgebungsvariablen aus der .env-Datei

// const router = express.Router();

// // OCR-Route
// router.post("/ocr", async (req, res) => {
//   const { image } = req.body;

//   if (!image) {
//     return res.status(400).json({ error: "Kein Bild bereitgestellt." });
//   }

//   try {
//     console.log("OCR gestartet mit Bild:", image);

//     // OCR ausführen
//     const { data: { text } } = await Tesseract.recognize(image, "deu", {
//       logger: (info) => console.log(info), // Fortschritt protokollieren
//     });

//     console.log("OCR-Ergebnis:", text);

//     res.status(200).json({ text });
//   } catch (error) {
//     console.error("Fehler bei der Texterkennung:", error);
//     res.status(500).json({ error: "Fehler bei der Texterkennung." });
//   }
// });

// // ScraperAPI-Route für Google-Suche nach Cardmarket-Links
// router.post("/scrape", async (req, res) => {
//   const { query } = req.body;

//   if (!query) {
//     return res.status(400).json({ error: "Suchbegriff fehlt." });
//   }

//   try {
//     console.log("Starte ScraperAPI-Suche für:", query);

//     const scraperAPIKey = process.env.SCRAPER_API_KEY;

//     if (!scraperAPIKey) {
//       throw new Error("SCRAPER_API_KEY fehlt in der .env-Datei.");
//     }

//     // ScraperAPI-URL für Google-Suche mit Cardmarket-Filter
//     const scraperURL = `http://api.scraperapi.com?api_key=${scraperAPIKey}&url=https://www.google.com/search?q=${encodeURIComponent(
//       query + " site:cardmarket.com"
//     )}`;

//     // Anfrage an ScraperAPI senden
//     const response = await axios.get(scraperURL);

//     // Links aus der Google-HTML-Antwort extrahieren
//     const links = response.data.match(/<a href="\/url\?q=(.*?)&amp;/g) || [];
//     const cardmarketLinks = links
//       .map((link) => {
//         const match = link.match(/q=(.*?)&/);
//         return match ? decodeURIComponent(match[1]) : null;
//       })
//       .filter((link) => link && link.includes("cardmarket.com"));

//     if (cardmarketLinks.length > 0) {
//       res.status(200).json({ success: true, links: cardmarketLinks });
//     } else {
//       res.status(404).json({ error: "Keine passenden Karten gefunden." });
//     }
//   } catch (error) {
//     console.error("Fehler bei der ScraperAPI-Suche:", error.message);
//     res.status(500).json({ error: "Fehler bei der Suche nach der Karte." });
//   }
// });

// // Route zum Speichern eines Bildes in der Datenbank
// router.post("/upload", async (req, res) => {
//   const { image, data } = req.body;

//   if (!image || !data) {
//     return res.status(400).json({ error: "Bild oder Daten fehlen." });
//   }

//   try {
//     if (!image.startsWith("data:image")) {
//       return res.status(400).json({ error: "Ungültiges Bildformat." });
//     }

//     const newCard = new Card({ image, data });
//     await newCard.save();

//     res.status(201).json({
//       success: true,
//       message: "Bild erfolgreich gespeichert.",
//       card: newCard,
//     });
//   } catch (error) {
//     console.error("Fehler beim Speichern der Karte:", error);
//     res.status(500).json({ error: "Speichern fehlgeschlagen." });
//   }
// });

// // Route zum Abrufen des zuletzt gespeicherten Bildes und Texts
// router.get("/latest", async (req, res) => {
//   try {
//     const latestCard = await Card.findOne().sort({ createdAt: -1 });

//     if (!latestCard) {
//       return res.status(404).json({ error: "Kein Bild in der Datenbank gefunden." });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Erfolgreich abgerufen.",
//       card: latestCard,
//     });
//   } catch (error) {
//     console.error("Fehler beim Abrufen des Bildes:", error);
//     res.status(500).json({ error: "Fehler beim Abrufen des Bildes." });
//   }
// });

// module.exports = router;
