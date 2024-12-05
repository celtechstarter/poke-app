import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Theme } from '@radix-ui/themes';
import Home from './pages/Home';
import About from './pages/About';
import ScanPage from './pages/Scan';
import LoginPage from './pages/LoginPage'; 
import MyCards from './pages/MyCards';
import Navbar from './components/Navbar';
import OcrPage from './pages/OcrPage'; // Importiere die OCR-Seite


function App() {
  return (
    <Theme appearance="dark" accentColor="crimson" grayColor="sand" radius="medium" scaling="95%"> 
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/my-cards" element={<MyCards />} />
        <Route path="/ocr" element={<OcrPage />} /> {/* Hier wird die OCR-Seite hinzugefügt */}

      </Routes>
    </Router>
    </Theme>
  );
}

export default App;
