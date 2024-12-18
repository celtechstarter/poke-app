import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Theme, Button, Flex } from "@radix-ui/themes";
import Home from "./pages/Home";
import About from "./pages/About";
import ScanPage from "./pages/Scan";
import LoginPage from "./pages/LoginPage";
import MyCards from "./pages/MyCards";
import Navbar from "./components/Navbar";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [themeMode, setThemeMode] = useState("light"); // State für Light/Dark Mode

  // Überprüfen, ob der Benutzer eingeloggt ist
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  // Login-Handler
  const handleLoginSuccess = (userData) => {
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData)); // Speichere die Benutzerdaten
  };

  // Logout-Handler
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  // Theme-Umschaltung
  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <Theme appearance={themeMode} accentColor="crimson" grayColor="sand" radius="medium" scaling="95%">
      <Router>
        <div className="content background">
          {/* Darkmode Toggle Button */}
          <Flex justify="end" p="3">
            <Button onClick={toggleTheme}>
              {themeMode === "light" ? "Dark Mode aktivieren" : "Light Mode aktivieren"}
            </Button>
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
              <Route
                path="*"
                element={<LoginPage onLoginSuccess={handleLoginSuccess} />}
              />
            </Routes>
          )}
        </div>
      </Router>
    </Theme>
  );
}

export default App;
