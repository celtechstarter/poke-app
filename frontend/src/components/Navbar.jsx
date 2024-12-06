import React from 'react';
import { Link } from 'react-router-dom';
import {  Flex, Text } from '@radix-ui/themes';

const Navbar = () => (
    
    <Flex
    className="navbar"
    style={{
    position: 'relative ',
    backgroundColor: '#2e2e2e ',
    height: '60px ',
    justifyContent: 'space-between ',
    alignItems: 'center ',
    padding: ' 20px ',
    }}
  >
  
    
  
    {/* Navigation-Links */}
    <Flex
      gap="20px"
      style={{
        zIndex: 1,
      }}
    >
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
  </Flex>
  
  
);
console.log('Navbar loaded');


export default Navbar;