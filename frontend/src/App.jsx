import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Theme } from '@radix-ui/themes';
import Navbar from './components/Navbar'; // Navbar hinzugefügt
import Home from './pages/Home';
import About from './pages/About';
import ScanPage from './pages/Scan';
import LoginPage from './pages/LoginPage';
import MyCards from './pages/MyCards';
import OcrPage from './pages/OcrPage';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Prüfen, ob der Benutzer eingeloggt ist
  useEffect(() => {
    const user = localStorage.getItem('user'); // Überprüft, ob Benutzerdaten vorhanden sind
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData)); // Speichert die Benutzerdaten lokal
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('user'); // Entfernt die Benutzerdaten
  };

  return (
    <Theme appearance="light" accentColor="crimson" grayColor="sand" radius="medium" scaling="95%">
      <Router>
        {isAuthenticated && <Navbar onLogout={handleLogout} />} {/* Zeigt die Navbar nur bei Login */}
        <Routes>
          {!isAuthenticated && (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
          <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/scan" element={<ScanPage />} />
          <Route path="/my-cards" element={<MyCards />} />
          <Route path="/ocr" element={<OcrPage />} />
        </Routes>
      </Router>
    </Theme>
  );
}

export default App;
