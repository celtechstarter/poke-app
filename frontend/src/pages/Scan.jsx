import React from 'react';
import { Flex, Text, Button } from '@radix-ui/themes';

const ScanPage = () => {
  return (
    <Flex direction="column" align="center" justify="center" gap="4" style={{ height: '100vh' }}>
      <Text size="6" weight="bold">Scan Your Pokémon Card</Text>
   
      <Button>Start Scanning</Button>
    </Flex>
  );
};

export default ScanPage;
