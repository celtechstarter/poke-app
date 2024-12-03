import React from 'react';
import { Flex, Text, Button } from '@radix-ui/themes';

const IndexPage = () => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap="4"
      style={{ height: '100vh' }}
    >
      <img
        src="/images/logo1.jpg"
        alt="Logo"
        style={{ width: '150px', marginBottom: '16px' }}
      />
      <Text size="6" weight="bold">
        Welcome to Pokémon Card Scanner
      </Text>
      <Button variant="solid" onClick={() => (window.location.href = '/scan')}>
        <img
          src="/images/pikachu.png"
          alt="Pikachu"
          style={{ width: '20px', height: '20px', marginRight: '8px' }}
        />
        Go to Scan
      </Button>
    </Flex>
  );
};

export default IndexPage;
