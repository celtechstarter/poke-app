const express = require('express');
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
    bucket: 'pokecenter',
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
