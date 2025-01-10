const express = require('express');
const cors = require('cors');
const session = require('express-session');
const scanRoutes = require('./routes/scan'); // OCR und Scraper-Route
const uploadRoutes = require('./routes/upload'); // Upload-Route importieren
require('dotenv').config(); // .env-Datei laden

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// CORS-Konfiguration
app.use(
  cors({
    origin: ['http://localhost:5173'], // Frontend-Origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Cookies und Authentifizierung zulassen
  })
);

// Debugging: Protokolliere alle eingehenden Anfragen
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Session-Management
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'default-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true, // Sicherheit gegen XSS
      secure: process.env.NODE_ENV === 'production', // Nur HTTPS in Produktion
      maxAge: 1000 * 60 * 60 * 24, // 1 Tag
    },
  })
);

// Routes
app.use('/scan', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
}, scanRoutes);

app.use('/upload', uploadRoutes); // Upload-Routen hinzufügen

// Health-Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'Server läuft',
    time: new Date().toISOString(),
  });
});

// Route für die Basis-URL
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Willkommen bei der Pokemon-Scanner-API!',
    status: 'Server läuft',
    time: new Date().toISOString(),
  });
});

// Fehlerbehandlung für JSON-Parsing
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Fehlerhaftes JSON-Format.' });
  }
  console.error('Interner Serverfehler:', err.message);
  res.status(500).json({ error: 'Ein interner Serverfehler ist aufgetreten.' });
});

// 404 Fehlerbehandlung
app.use((req, res) => {
  res.status(404).json({ error: 'Route nicht gefunden.' });
});

// // Server starten
// app.listen(port, () => {
//   console.log(`Server läuft auf Port ${port}`);
// });

// Verbindung zur MongoDB-Datenbank herstellen
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log('MongoDB verbunden'))
//   .catch((err) => {
//     console.error('MongoDB Verbindung fehlgeschlagen:', err);
//     process.exit(1); // Beende Server bei fehlgeschlagener DB-Verbindung
//   });

// Routes
app.use('/scan', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
}, scanRoutes);

app.use('/upload', uploadRoutes); // Upload-Routen hinzufügen

// Health-Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'Server läuft',
    time: new Date().toISOString(),
  });
});

// Fehlerbehandlung für JSON-Parsing
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Fehlerhaftes JSON-Format.' });
  }
  console.error('Interner Serverfehler:', err.message);
  res.status(500).json({ error: 'Ein interner Serverfehler ist aufgetreten.' });
});

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});



// Alte Logik für das Lokale Speichern der Dateien
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const session = require('express-session');
// const scanRoutes = require('./routes/scan'); // OCR und Scraper-Route
// require('dotenv').config(); // .env-Datei laden

// const app = express();
// const port = process.env.PORT || 5000;

// // Middleware
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true }));

// // CORS-Konfiguration
// app.use(
//   cors({
//     origin: ['http://localhost:5173'], // Frontend-Origin
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true, // Cookies und Authentifizierung zulassen
//   })
// );

// // Debugging: Protokolliere alle eingehenden Anfragen
// app.use((req, res, next) => {
//   console.log(`Incoming request: ${req.method} ${req.url}`);
//   next();
// });

// // Session-Management
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || 'default-secret-key',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       httpOnly: true, // Sicherheit gegen XSS
//       secure: process.env.NODE_ENV === 'production', // Nur HTTPS in Produktion
//       maxAge: 1000 * 60 * 60 * 24, // 1 Tag
//     },
//   })
// );

// // Verbindung zur MongoDB-Datenbank herstellen
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log('MongoDB verbunden'))
//   .catch((err) => {
//     console.error('MongoDB Verbindung fehlgeschlagen:', err);
//     process.exit(1); // Beende Server bei fehlgeschlagener DB-Verbindung
//   });

// // Routes
// app.use('/scan', (req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   next();
// }, scanRoutes);

// // Health-Check Route
// app.get('/api/health', (req, res) => {
//   res.status(200).json({
//     status: 'Server läuft',
//     time: new Date().toISOString(),
//   });
// });

// // Fehlerbehandlung für JSON-Parsing
// app.use((err, req, res, next) => {
//   if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
//     return res.status(400).json({ error: 'Fehlerhaftes JSON-Format.' });
//   }
//   console.error('Interner Serverfehler:', err.message);
//   res.status(500).json({ error: 'Ein interner Serverfehler ist aufgetreten.' });
// });

// // Server starten
// app.listen(port, () => {
//   console.log(`Server läuft auf Port ${port}`);
// });
