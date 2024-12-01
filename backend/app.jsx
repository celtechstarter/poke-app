require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const authRoutes = require('./routes/auth');
const scanRoutes = require('./routes/scan');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB-Teil deaktiviert
/*
const mongoose = require('mongoose');
const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));
*/

// Routes
app.use('/auth', authRoutes);
app.use('/scan', scanRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
