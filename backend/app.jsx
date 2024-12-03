require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');

// Importiere Routen
const authRoutes = require('./routes/auth');
const scanRoutes = require('./routes/scan');
const uploadRoutes = require('./routes/upload');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

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