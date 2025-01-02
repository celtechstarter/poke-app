const request = require('supertest');
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const authRouter = require('../../backend/routes/auth.js'); // Passe den Pfad zu deinem Router an
const session = require('express-session');
const mockSession = { cookie: { maxAge: 3600000 }, id: 'test-session' };



jest.mock('passport-google-oauth20'); // Mock von GoogleStrategy

describe('Auth Routes', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/auth', authRouter); // Router einbinden
    app.use(session({ secret: 'test-secret', resave: false, saveUninitialized: false }));
    app.use(passport.initialize());
    app.use(passport.session());
  });

  beforeEach(() => {
    // Vor jedem Test die Anmeldedaten zurücksetzen (falls benötigt)
    jest.clearAllMocks();
  });

  test('Check if GOOGLE_CLIENT_ID is loaded', () => {
    expect(process.env.GOOGLE_CLIENT_ID).toBeDefined();
  });
  
  test('Google Login Route /google', async () => {
    // Wir testen nur, ob die Route richtig funktioniert
    const response = await request(app).get('/auth/google');
    expect(response.status).toBe(302); // Erfolgreiche Umleitung nach Google OAuth
    expect(response.header.location).toMatch(/google/); // Stelle sicher, dass die Anfrage korrekt weitergeleitet wird
  });

  test('Google Callback Route /google/callback', async () => {
    // Mock passport.authenticate
    const mockAuthenticate = jest.fn((strategy, options) => (req, res, next) => {
      console.log('Mocking authenticate'); // Logge die Ausgabe, wenn authenticate aufgerufen wird
      req.user = { id: '123', name: 'Test User' }; 
      next(); // Fahre mit der nächsten Middleware fort
    });
  
    passport.authenticate = mockAuthenticate;
  
    // Testen der Route
    const response = await request(app).get('/auth/google/callback');
    console.log('Response header location:', response.header.location); // Logge den Location-Header der Antwort
  
    expect(response.status).toBe(302);
    expect(response.header.location).toBe('/scan');
  });
  
  

  test('Current User Route /current_user when logged in', async () => {
    // Teste die Route /current_user, wenn der User eingeloggt ist
    const mockUser = { id: '123', name: 'Test User', email: 'test@example.com' };
    passport.deserializeUser = jest.fn().mockImplementationOnce((id, done) => done(null, mockUser));

    const response = await request(app)
      .get('/auth/current_user')
      .set('Cookie', 'connect.sid=test-session'); // Simuliere eine Session (falls du eine Sessions-basierte Authentifizierung hast)

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser); // Erwartete Benutzerinformationen
  });

  test('Current User Route /current_user when not logged in', async () => {
    // Teste die Route /current_user, wenn der User nicht eingeloggt ist
    const response = await request(app).get('/auth/current_user');
    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Nicht angemeldet');
  });

  test('Logout Route /logout', async () => {
    // Teste die Logout-Route
    const response = await request(app).get('/auth/logout');
    expect(response.status).toBe(302); // Erfolgreiche Weiterleitung nach Logout
    expect(response.header.location).toBe('/'); // Weiterleitung zur Startseite nach dem Logout
  });
});
