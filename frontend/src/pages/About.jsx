import React from 'react';
import { Flex, Text, Button, Box, Card, Avatar } from "@radix-ui/themes";

const About = () => {
  return (
    <Flex 
    direction="column" // Vertikale Ausrichtung
    justify="center"   // Vertikale Zentrierung
    align="center"     // Horizontale Zentrierung
    style={{ minHeight: '100vh' }} // Stellt sicher, dass der Container die volle Höhe des Bildschirms einnimmt
    >
      <h1>Über uns</h1>
      <p>Informationen über die Pokémon Karten-Scanner App.</p>

      <Box maxWidth="240px" style={{ marginBottom: '20px' }}
      >
        <Card>
          <Flex gap="3" align="center">
            <Avatar
              size="3"
              src="/images/christian.png"
              radius="full"
              fallback="T"
            />
            <Box>
              <Text as="div" size="2" weight="bold">
                Christian Sawatzky
              </Text>
              <Text as="div" size="2" color="gray">
                DevOps Engineering
              </Text>
              <a 
                href="https://www.linkedin.com/in/christian-sawatzky-78b985341/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </Box>
          </Flex>
        </Card>
      </Box>
      <Box maxWidth="240px" style={{ marginBottom: '20px'  }}
      >
        <Card>
          <Flex gap="3" align="center">
            <Avatar
              size="3"
              src="/images/marcel.png"
              radius="full"
              fallback="T"
            />
            <Box>
              <Text as="div" size="2" weight="bold">
                Marcel Welk
              </Text>
              <Text as="div" size="2" color="gray">
                DevOps Engineering
              </Text>
            </Box>
          </Flex>
        </Card>
      </Box>
      <Box maxWidth="240px">
        <Card>
          <Flex gap="3" align="center">
            <Avatar
              size="3"
              src="/images/willy.png" // Korrigierte Pfadangabe für das Bild
              radius="full"
              fallback="T"
            />
            <Box>
              <Text as="div" size="2" weight="bold">
                Willy Ellwart
              </Text>
              <Text as="div" size="2" color="gray">
                DevOps Engineering
              </Text>
              <a 
                href="https://www.linkedin.com/in/willy-ellwart-b1977a2b8/"

                target="_blank" 
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </Box>
          </Flex>
        </Card>
      </Box>
    </Flex>
  );
};

export default About;
