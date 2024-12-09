import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Theme } from "@radix-ui/themes";
import Home from "./pages/Home";
import About from "./pages/About";
import ScanPage from "./pages/Scan";
import LoginPage from "./pages/LoginPage";
import MyCards from "./pages/MyCards";
import Navbar from "./components/Navbar";
import OcrPage from "./pages/OcrPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Prüfen, ob der Benutzer eingeloggt ist
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <Theme appearance="dark" accentColor="crimson" grayColor="sand" radius="medium" scaling="95%">
      <Router>
        {isAuthenticated ? (
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/scan" element={<ScanPage />} />
              <Route path="/my-cards" element={<MyCards />} />
              <Route path="/ocr" element={<OcrPage />} />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="*" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
          </Routes>
        )}
      </Router>
    </Theme>
  );
}

export default App;
