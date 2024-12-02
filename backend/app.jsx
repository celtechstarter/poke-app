require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const authRoutes = require('./routes/auth');
const scanRoutes = require('./routes/scan');
const uploadRoutes = require('./routes/upload'); // Neue Upload-Route

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/scan', scanRoutes);
app.use('/api', uploadRoutes); // Einbindung der Upload-Route

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
