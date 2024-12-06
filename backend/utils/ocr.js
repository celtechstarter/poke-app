const fs = require('fs');
const path = require('path');
const Tesseract = require('tesseract.js');
const mongoose = require('mongoose');

const ocrHandler = async (req, res) => {
  try {
    const { fileId } = req.body; // Bild-ID aus der Anfrage
    if (!fileId) {
      return res.status(400).json({ error: 'FileId ist erforderlich.' });
    }

    // Bild aus MongoDB oder GridFS herunterladen
    const tempFilePath = path.join(__dirname, `../temp/${fileId}.jpg`);
    const downloadStream = gfs.openDownloadStream(new mongoose.Types.ObjectId(fileId));
    const writeStream = fs.createWriteStream(tempFilePath);

    downloadStream.pipe(writeStream);

    writeStream.on('close', async () => {
      try {
        // OCR mit Tesseract.js
        const { data: { text } } = await Tesseract.recognize(tempFilePath, 'eng');
        fs.unlinkSync(tempFilePath); // Temporäre Datei löschen
        res.json({ text });
      } catch (error) {
        console.error('Fehler bei der Texterkennung:', error);
        fs.unlinkSync(tempFilePath);
        res.status(500).json({ error: 'Fehler bei der Texterkennung.' });
      }
    });

    writeStream.on('error', (err) => {
      console.error('Fehler beim Herunterladen der Datei:', err);
      res.status(500).json({ error: 'Fehler beim Herunterladen der Datei.' });
    });
  } catch (error) {
    console.error('Fehler bei der Texterkennung:', error);
    res.status(500).json({ error: 'Fehler bei der Texterkennung.' });
  }
};

module.exports = { ocrHandler };