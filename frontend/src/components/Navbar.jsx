import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, Text, Button } from '@radix-ui/themes';

const Navbar = ({ onLogout }) => (
  <Flex
    className="navbar"
    style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      backgroundColor: '#2e2e2e',
      height: '60px',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 20px',
      zIndex: 1000,
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    }}
  >
    {/* Logo oder App-Name */}
    <Text
      size="5"
      weight="bold"
      style={{
        color: 'white',
      }}
    >
      PokeScan
    </Text>

    {/* Navigation-Links */}
    <Flex gap="20px">
      <Link
        to="/"
        style={{
          textDecoration: 'none',
          color: 'pink',
          fontWeight: 'bold',
          fontSize: '16px',
        }}
      >
        Home
      </Link>
      <Link
        to="/my-cards"
        style={{
          textDecoration: 'none',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '16px',
        }}
      >
        My Cards
      </Link>
      <Link
        to="/scan"
        style={{
          textDecoration: 'none',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '16px',
        }}
      >
        Scan
      </Link>
      <Link
        to="/about"
        style={{
          textDecoration: 'none',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '16px',
        }}
      >
        About Us
      </Link>
    </Flex>

    {/* Logout-Button */}
    {onLogout && (
      <Button
        variant="primary"
        size="2"
        onClick={onLogout}
        style={{
          backgroundColor: 'crimson',
          color: 'white',
          fontWeight: 'bold',
        }}
      >
        Logout
      </Button>
    )}
  </Flex>
);

export default Navbar;
