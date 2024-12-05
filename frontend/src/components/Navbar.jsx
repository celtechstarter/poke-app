import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, Text } from '@radix-ui/themes';

const Navbar = () => (
  <Flex
    as="nav"
    css={{
      position: 'relative',
      backgroundColor: '#000', // Schwarzer Hintergrund
      height: '20px',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0 20px',
    }}
  >
    {/* Hintergrund-Text (PokeScan) */}
    <Text
      size="9"
      weight="bold"
      css={{
        color: '#2e2e2e', // Dunkelgrauer Text
        position: 'absolute',
        top: '50%', // Vertikal zentrieren
        left: '50%', // Horizontal zentrieren
        transform: 'translate(-50%, -50%)', // Perfekte Zentrierung
        zIndex: 0, // Im Hintergrund
        whiteSpace: 'nowrap',
        userSelect: 'none', // Nicht auswählbar
        pointerEvents: 'none', // Nicht interaktiv
      }}
    >
      PokeScan
    </Text>

    {/* Navigation-Links */}
    <Flex
      gap="8"
      css={{
        zIndex: 1, // Über dem Hintergrund-Text
        position: 'relative',
      }}
    >
      <Link
        to="/"
        style={{
          textDecoration: 'none',
          color: 'white', // Weiße Schrift
          fontWeight: 'bold',
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
        }}
      >
        Scan
      </Link>
      <Link
        to="/about"
        style={{
          textDecoration: 'none',
          color: '',
          fontWeight: 'bold',
        }}
      >
        About Us
      </Link>
    </Flex>
  </Flex>
);

export default Navbar;