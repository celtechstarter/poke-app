import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Theme, Button, Flex, Text } from "@radix-ui/themes";
import Home from "./pages/Home";
import About from "./pages/About";
import ScanPage from "./pages/Scan";
import LoginPage from "./pages/LoginPage";
import MyCards from "./pages/MyCards";
import Navbar from "./components/Navbar";
import "./Footer.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [themeMode, setThemeMode] = useState("light");
  const [userName, setUserName] = useState(""); // Benutzername speichern

  // Überprüfen, ob der Benutzer eingeloggt ist
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsAuthenticated(true);
      setUserName(user.name || user.email); // Zeige den Namen oder die E-Mail an
    }
  }, []);

  // Login-Handler
  const handleLoginSuccess = (userData) => {
    setIsAuthenticated(true);
    setUserName(userData.name || userData.email); // Benutzername/E-Mail speichern
    localStorage.setItem("user", JSON.stringify(userData)); // Speichere die Benutzerdaten
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
        <div className="content background">
          <Flex justify="between" align="center" p="3">
            {/* Darkmode Toggle Button */}
            <Button onClick={toggleTheme}>
              {themeMode === "light" ? "Dark Mode aktivieren" : "Light Mode aktivieren"}
            </Button>

            {/* Anzeige des eingeloggten Benutzers */}
            {isAuthenticated && (
              <Text size="3" weight="bold" color="gray">
                Eingeloggt als: {userName}
              </Text>
            )}
          </Flex>

          {isAuthenticated ? (
            <>
              <Navbar onLogout={handleLogout} />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/scan" element={<ScanPage />} />
                <Route path="/my-cards" element={<MyCards />} />
              </Routes>
            </>
          ) : (
            <Routes>
              <Route path="*" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
            </Routes>
          )}

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
