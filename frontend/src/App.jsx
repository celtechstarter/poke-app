import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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

  useEffect(() => {
    const user = localStorage.getItem("user"); // Überprüfen, ob der Benutzer eingeloggt ist
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData)); // Benutzerdaten speichern
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  return (
    <Theme appearance="light" accentColor="crimson" grayColor="sand" radius="medium" scaling="95%">
      <Router>
        {isAuthenticated ? (
          <>
          <Navbar onLogout={handleLogout} />
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
