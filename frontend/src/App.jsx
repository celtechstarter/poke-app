import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Theme, Flex, Text } from "@radix-ui/themes";
import Home from "./pages/Home";
import About from "./pages/About";
import ScanPage from "./pages/Scan";
import MyCards from "./pages/MyCards";
import Navbar from "./components/Navbar";
import "./Footer.css";
import "./App.css";

function App() {
  const [themeMode, setThemeMode] = useState("light");

  // Benutzer-Status prüfen (Google OAuth auskommentiert)
  /*
  useEffect(() => {
    fetch("http://localhost:5000/auth/current_user", {
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Nicht authentifiziert");
        }
      })
      .then((data) => {
        if (data && data.displayName) {
          setIsAuthenticated(true);
          setUserName(data.displayName);
        }
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
  }, []);
  */

  // Theme-Umschaltung
  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <Theme appearance={themeMode} accentColor="gray" grayColor="sand" radius="medium" scaling="95%">
      <Router>
        <div className="app-container">
          <Navbar />
          <div className="content background">
            <Flex justify="between" align="center" p="3">
              <button onClick={toggleTheme} style={{ padding: "10px", border: "none", cursor: "pointer" }}>
                {themeMode === "light" ? "Dark Mode aktivieren" : "Light Mode deaktivieren"}
              </button>
            </Flex>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/scan" element={<ScanPage />} />
              <Route path="/my-cards" element={<MyCards />} />
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
