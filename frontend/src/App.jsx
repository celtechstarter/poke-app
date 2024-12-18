import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Theme } from "@radix-ui/themes";
import Home from "./pages/Home";
import About from "./pages/About";
import ScanPage from "./pages/Scan";
import LoginPage from "./pages/LoginPage";
import MyCards from "./pages/MyCards";
import Navbar from "./components/Navbar";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  return (

    
 


    <Theme appearance="light" 
           accentColor="crimson" 
           grayColor="sand" 
           radius="medium" 
           scaling="95%">
      <Router>
      <div className="content background">

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
