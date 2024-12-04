require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

// Importiere Routen
const authRoutes = require('./routes/auth');
const scanRoutes = require('./routes/scan');
const uploadRoutes = require('./routes/upload');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Erfolgreich mit MongoDB verbunden!'))
  .catch((err) => {
    console.error('Fehler bei der Verbindung zu MongoDB:', err.message);
    process.exit(1); // Beende den Prozess bei Verbindungsfehler
  });

// // Debugging: Überprüfe, was importiert wurde
// console.log('authRoutes:', authRoutes);
// console.log('scanRoutes:', scanRoutes);
// console.log('uploadRoutes:', uploadRoutes);

// Routen einbinden
app.use('/auth', authRoutes);
app.use('/scan', scanRoutes);
app.use('/api', uploadRoutes);

// Standardroute
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// Server starten
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));