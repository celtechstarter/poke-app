const request = require('supertest');
const express = require('express');
const passport = require('passport');
const authRouter = require('../backend/routes/auth.js'); // Hier den Pfad zu deinem Router anpassen
const dotenv = require('dotenv');

dotenv.config(); // Lädt die Umgebungsvariablen aus der .env-Datei

jest.mock('passport'); // Passport mocken
jest.mock('passport-google-oauth20', () => ({
  Strategy: jest.fn().mockImplementation(() => ({
    authenticate: jest.fn(),
  })),
}));

describe('Auth Routes', () => {
  let app;

  beforeAll(() => {
    // Erstellen einer Express-App und Hinzufügen des Auth-Routers
    app = express();
    app.use(passport.initialize());
    app.use(authRouter);
  });

  beforeEach(() => {
    passport.authenticate.mockClear(); // Vor jedem Test Passport mocken
  });

  test('GET /google sollte auf /auth/google weiterleiten', async () => {
    passport.authenticate.mockImplementationOnce((strategy, options) => {
      return (req, res, next) => {
        next(); // Keine Fehler, es wird normal weitergearbeitet
      };
    });

    const response = await request(app).get('/auth/google');
    expect(response.status).toBe(302); // Redirect status
    expect(response.header.location).toBe('https://accounts.google.com/o/oauth2/v2/auth'); // Der tatsächliche Google-Redirect-URL
  });

  test('GET /google/callback sollte zur /scan-Route weiterleiten', async () => {
    passport.authenticate.jest.fn().mockImplementationOnce((strategy, options) => {
      return (req, res, next) => {
        req.user = { id: '123', name: 'Test User' }; // Mocking eines erfolgreichen Logins
        next();
      };
    });

    const response = await request(app).get('/auth/google/callback');
    expect(response.status).toBe(302); // Redirect status
    expect(response.header.location).toBe('/scan'); // Die Route nach erfolgreichem Login
  });

  test('GET /current_user sollte den angemeldeten Nutzer zurückgeben', async () => {
    const mockUser = { id: '123', name: 'Test User' };
    passport.authenticate.mockImplementationOnce((strategy, options) => {
      return (req, res, next) => {
        req.user = mockUser;
        next();
      };
    });

    const response = await request(app).get('/auth/current_user');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser); // Erwartet, dass der User zurückgegeben wird
  });

  test('GET /logout sollte den Nutzer abmelden und weiterleiten', async () => {
    const mockLogout = jest.fn((callback) => callback()); // Simuliere das Logout
    passport.logout = mockLogout;

    const response = await request(app).get('/auth/logout');
    expect(response.status).toBe(302); // Redirect
    expect(response.header.location).toBe('/'); // Erwarte eine Weiterleitung zur Startseite
    expect(mockLogout).toHaveBeenCalledTimes(1); // Überprüfen, ob logout aufgerufen wurde
  });

  test('GET /current_user gibt 401 zurück, wenn kein Nutzer angemeldet ist', async () => {
    const response = await request(app).get('/auth/current_user');
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: 'Nicht angemeldet' });
  });
});
