import React from 'react';
import { Flex, Text, Button } from '@radix-ui/themes';

const Home = () => {
  return (
    <Flex direction="column" align="center" justify="center" gap="4" style={{ height: '100vh' }}>
      <Text size="6" weight="bold">
        Welcome to Pokémon Card Scanner
      </Text>
      <Button variant="solid" onClick={() => (window.location.href = '/scan')}>
        Go to Scan
      </Button>
    </Flex>
  );
};

export default Home;
