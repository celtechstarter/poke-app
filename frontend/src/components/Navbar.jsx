import React from "react";
import { Link } from "react-router-dom";
import { Flex } from "@radix-ui/themes";


const Navbar = ({ onLogout }) => (
  <Flex className="navbar">
    {/* Logo */}
    <Link to="/" className="rotating-logo-container">
      <img src="/images/Pokeball.png" 
      alt="Logo" 
      className="rotating-logo"/>
    </Link>

    {/* Navigation Links */}
    <Flex className="links">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/my-cards" className="nav-link">My Cards</Link>
      <Link to="/scan" className="nav-link">Scan</Link>
      <Link to="/about" className="nav-link">About Us</Link>
    </Flex>

    {/* Logout Button */}
    <button onClick={onLogout}>Logout</button>
  </Flex>
);

export default Navbar;

