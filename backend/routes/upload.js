const express = require("express");
const crypto = require("crypto"); // Für zufällige Dateinamen
const { uploadToS3 } = require("../s3Integration"); // S3-Funktionen importieren
const router = express.Router();

// Middleware: JSON-Daten validieren und Größe beschränken
router.use(express.json({ limit: "10mb" })); // Maximale JSON-Größe auf 10 MB

// Route zum Hochladen von Base64-Bildern
router.post("/", async (req, res) => {
  try {
    const { image, metadata } = req.body;

    if (!image || !metadata) {
      return res
        .status(400)
        .json({ success: false, error: "Bild oder Metadaten fehlen." });
    }

    if (!image.startsWith("data:image")) {
      return res
        .status(400)
        .json({ success: false, error: "Ungültiges Bildformat." });
    }

    const imageKey = `images/${crypto.randomBytes(16).toString("hex")}.jpg`;
    const metadataKey = `metadata/${crypto.randomBytes(16).toString("hex")}.json`;

    const base64Image = image.replace(/^data:image\/\w+;base64,/, "");
    const imageBuffer = Buffer.from(base64Image, "base64");

    await uploadToS3(process.env.S3_BUCKET_NAME, imageKey, imageBuffer, "image/jpeg");
    await uploadToS3(
      process.env.S3_BUCKET_NAME,
      metadataKey,
      JSON.stringify(metadata),
      "application/json"
    );

    console.log("Erfolgreich hochgeladen:", imageKey);

    res.status(201).json({
      success: true,
      message: "Bild und Metadaten erfolgreich hochgeladen.",
      imageKey,
      metadataKey,
    });
  } catch (error) {
    console.error("Fehler beim Hochladen:", error.message);
    res.status(500).json({ success: false, error: "Interner Serverfehler beim Hochladen." });
  }
});

module.exports = router;






// Lokale Logik auskommentiert da wir jetzt die AWS Logik verwenden

// const express = require('express');
// const Card = require('../models/card'); // Dein Mongoose-Modell
// const crypto = require('crypto'); // Für zufällige Namen
// const router = express.Router();

// // Middleware: JSON-Daten validieren und Größe beschränken
// router.use(express.json({ limit: '10mb' })); // Maximale JSON-Größe auf 10 MB

// // Route zum Hochladen von Base64-Bildern
// router.post('/', async (req, res) => {
//   try {
//     const { image, data } = req.body;

//     // 1. Prüfen, ob Bild und Daten vorhanden sind
//     if (!image || !data) {
//       return res
//         .status(400)
//         .json({ success: false, error: 'Bild oder Daten fehlen.' });
//     }

//     // 2. Validieren, ob das Bild im Base64-Format ist
//     if (!image.startsWith('data:image')) {
//       console.warn('Ungültiges Bildformat erkannt.');
//       return res
//         .status(400)
//         .json({ success: false, error: 'Ungültiges Bildformat.' });
//     }

//     // 3. Generiere zufälligen Namen für die Datei
//     const randomName = crypto.randomBytes(16).toString('hex');

//     // 4. Erstelle ein neues Dokument und speichere es in der MongoDB
//     const newCard = new Card({
//       imageName: randomName,
//       image,
//       data,
//     });

//     await newCard.save();

//     console.log('Datei erfolgreich hochgeladen:', randomName);

//     // 5. Erfolgsantwort zurücksenden
//     res.status(201).json({
//       success: true,
//       message: 'Datei erfolgreich hochgeladen.',
//       card: newCard,
//     });
//   } catch (error) {
//     console.error('Fehler beim Hochladen der Datei:', error.message);
//     res
//       .status(500)
//       .json({ success: false, error: 'Interner Serverfehler beim Hochladen.' });
//   }
// });

// module.exports = router;
