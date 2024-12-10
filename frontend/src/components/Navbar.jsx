import React from "react";
import { Link } from "react-router-dom";
import { Flex } from "@radix-ui/themes";

const Navbar = ({ onLogout }) => (
  <Flex
    className="navbar"
    style={{
      position: "relative",
      backgroundColor: "#1e1e1e",
      height: "70px",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      padding: "0 20px",
      boxShadow: "0 3px 7px rgba(0, 0, 0, 0.3)",
    }}
  >
    <Flex gap="20px" style={{ zIndex: 100 }}>
      <Link to="/" style={{ textDecoration: "none", color: "pink", fontWeight: "bold", fontSize: "16px" }}>
        Home
      </Link>
      <Link to="/my-cards" style={{ textDecoration: "none", color: "white", fontWeight: "bold", fontSize: "16px" }}>
        My Cards
      </Link>
      <Link to="/scan" style={{ textDecoration: "none", color: "white", fontWeight: "bold", fontSize: "16px" }}>
        Scan
      </Link>
      <Link to="/about" style={{ textDecoration: "none", color: "white", fontWeight: "bold", fontSize: "16px" }}>
        About Us
      </Link>
    </Flex>
    <div className="logout-container">
      <button
        onClick={onLogout}
        style={{
          textDecoration: "none",
          color: "red",
          fontWeight: "bold",
          fontSize: "16px",
          background: "none",
          border: "1px solid red",
          padding: "5px 10px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  </Flex>
);

export default Navbar;
