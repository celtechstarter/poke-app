import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Theme, Button, Flex, Text } from "@radix-ui/themes";
import Home from "./pages/Home";
import About from "./pages/About";
import ScanPage from "./pages/Scan";
import LoginPage from "./pages/LoginPage";
import MyCards from "./pages/MyCards";
import Navbar from "./components/Navbar";
import "./Footer.css";
import "./App.css"; // Stelle sicher, dass die globalen Stile für die App geladen werden

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [themeMode, setThemeMode] = useState("light");
  const [userName, setUserName] = useState("");

  // Überprüfen, ob der Benutzer eingeloggt ist
  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        setIsAuthenticated(true);
        setUserName(user.name || user.email);
      }
    } catch (error) {
      console.error("Fehler beim Laden der Benutzerdaten:", error);
      localStorage.removeItem("user"); // Lösche fehlerhafte Daten
    }
  }, []);

  // Login-Handler
  const handleLoginSuccess = (userData) => {
    setIsAuthenticated(true);
    setUserName(userData.name || userData.email);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Logout-Handler
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserName("");
    localStorage.removeItem("user");
  };

  // Theme-Umschaltung
  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <Theme appearance={themeMode} accentColor="gray" grayColor="sand" radius="medium" scaling="95%">
      <Router>
        <div className="app-container">
          <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} /> {/* Navbar hinzugefügt */}
          <div className="content background">
            <Flex justify="between" align="center" p="3">
              {isAuthenticated && (
                <Button onClick={toggleTheme}>
                  {themeMode === "light" ? "Dark Mode aktivieren" : "Light Mode aktivieren"}
                </Button>
              )}
              {isAuthenticated && (
                <Text size="3" weight="bold" color="gray">
                  Eingeloggt als: {userName}
                </Text>
              )}
            </Flex>

            <Routes>
              {!isAuthenticated ? (
                <>
                  <Route path="/" element={<Navigate to="/scan" />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/scan" element={<ScanPage />} />
                  <Route path="/my-cards" element={<MyCards />} />
                </>
              ) : (
                <>
                  <Route path="*" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
                </>
              )}
            </Routes>
          </div>

          {/* Footer */}
          <footer className="app-footer">
            <div className="footer-logo-container">
              <img src="/images/Pokeball.png" alt="Rotierendes Logo" className="rotating-logo-footer" />
            </div>
            <Text size="2" weight="bold" color="gray">
              © 2024 PokeScan Technologies
            </Text>
            <Text size="2" color="gray">
              Powered by AWS & React
            </Text>
          </footer>
        </div>
      </Router>
    </Theme>
  );
}

export default App;
