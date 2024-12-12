// db.test.js
const mongoose = require('mongoose');
const { connectToDatabase, closeDatabase } = require('../backend/server.js'); // Verbindungsfunktionen
require('dotenv').config(); // Umgebungsvariablen laden

describe('MongoDB-Verbindung', () => {
  beforeAll(async () => {
    // Verbindet sich mit MongoDB vor den Tests
    await connectToDatabase();
  });

  afterAll(async () => {
    // Schließt die Verbindung nach den Tests
    await closeDatabase();
  });

  test('sollte mit der MongoDB-Datenbank verbunden sein', async () => {
    const connectionState = mongoose.connection.readyState; 
    // 1 bedeutet "verbunden", 0 bedeutet "nicht verbunden"
    expect(connectionState).toBe(1); // Überprüfe, ob die Verbindung hergestellt wurde
  });
});
