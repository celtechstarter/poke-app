import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Theme } from '@radix-ui/themes';
import Home from './pages/Home';
import About from './pages/About';
import ScanPage from './pages/Scan';
import LoginPage from './pages/LoginPage'; 
import MyCards from './pages/MyCards';
import Navbar from './components/Navbar';
import './App.css';
import OcrPage from './pages/OcrPage'; // Importiere die OCR-Seite
import CardDetails from './pages/CardDetails'; // Importiere die Seite für Kartendetails

function App() {
  return (
    <Theme appearance="light" accentColor="crimson" grayColor="sand" radius="medium" scaling="95%">
      <Router>
        <Navbar /> {/* Navigation für die gesamte App */}
        <Routes>
          {/* Allgemeine Seiten */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* Benutzerbezogene Seiten */}
          <Route path="/login" element={<LoginPage />} />

          {/* Kartenbezogene Seiten */}
          <Route path="/scan" element={<ScanPage />} />
          <Route path="/my-cards" element={<MyCards />} />
          <Route path="/cards/:id" element={<CardDetails />} /> {/* Seite für einzelne Kartendetails */}

          {/* OCR-Seite */}
          <Route path="/ocr" element={<OcrPage />} />
        </Routes>
      </Router>
    </Theme>
  );
}

export default App;