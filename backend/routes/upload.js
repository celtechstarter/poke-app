/*const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

const router = express.Router();

// AWS-Konfiguration
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

// Multer-S3-Setup
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'Ihr-S3-Bucket-Name',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '-' + file.originalname);
    },
  }),
});

// Route zum Hochladen von Dateien
router.post('/upload', upload.single('datei'), (req, res) => {
  res.send('Datei erfolgreich hochgeladen: ' + req.file.location);
});

module.exports = router;
*/


const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const Card = require('../models/card'); // Modell importiert

const router = express.Router();

// AWS-Konfiguration
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

// Multer-S3-Setup
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'Ihr-S3-Bucket-Name', // S3-Bucket-Name ersetzen
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '-' + file.originalname); // Einzigartige Dateinamen
    },
  }),
});

// Route zum Hochladen von Dateien in den S3-Bucket
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { name, value, userId } = req.body; // Zusätzliche Daten

    // URL des hochgeladenen Bildes
    const fileUrl = req.file.location;

    // Karte in der MongoDB speichern
    const newCard = new Card({
      image: fileUrl,
      name: name || 'Unbekannt',
      value: value || 0,
      userId, // Nutzer-ID zur Zuordnung
    });

    await newCard.save();
    res.status(201).json(newCard);
  } catch (error) {
    console.error('Fehler beim Hochladen:', error);
    res.status(500).json({ error: 'Fehler beim Speichern der Karte.' });
  }
});

module.exports = router;
