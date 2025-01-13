import React from "react";
import { Link } from "react-router-dom";
import { Flex } from "@radix-ui/themes";

const Navbar = () => {
  /*
  const handleLogout = () => {
    console.log("Logout ausgeführt (ohne Google OAuth).");
    onLogout();
    navigate("/login");

    // Google OAuth Logout deaktiviert:
    try {
      const response = await fetch("http://localhost:5000/auth/logout", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        console.log("Logout erfolgreich");
        onLogout();
        navigate("/login");
      } else {
        console.error("Fehler beim Logout:", response.statusText);
      }
    } catch (err) {
      console.error("Fehler beim Logout:", err.message);
    }
  };
  */

  return (
    <Flex
      className="navbar"
      align="center"
      justify="between"
      p="3"
      style={{
        backgroundColor: "#f8f9fa",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        padding: "1rem 2rem",
      }}
    >
      <Link to="/" className="rotating-logo-container">
        <img
          src="/images/Pokeball.png"
          alt="Logo"
          className="rotating-logo"
          style={{ width: "50px", height: "50px" }}
        />
      </Link>

      <Flex
        className="links"
        gap="4"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Link to="/" className="nav-link" style={{ textDecoration: "none", color: "#333", fontWeight: "bold" }}>
          Home
        </Link>
        <Link to="/my-cards" className="nav-link" style={{ textDecoration: "none", color: "#333", fontWeight: "bold" }}>
          My Cards
        </Link>
        <Link to="/scan" className="nav-link" style={{ textDecoration: "none", color: "#333", fontWeight: "bold" }}>
          Scan
        </Link>
        <Link to="/about" className="nav-link" style={{ textDecoration: "none", color: "#333", fontWeight: "bold" }}>
          About Us
        </Link>
      </Flex>

      {/* Logout-Button deaktiviert */}
      {/*
      <Button
        variant="solid"
        color="red"
        size="3"
        onClick={handleLogout}
        style={{
          backgroundColor: "#ff4d4f",
          color: "white",
          borderRadius: "4px",
          padding: "0.5rem 1rem",
        }}
      >
        Logout
      </Button>
      */}
    </Flex>
  );
};

export default Navbar;
