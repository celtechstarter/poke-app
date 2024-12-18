import React from 'react';
import { Flex, Text, Button, Box, Card, Avatar } from '@radix-ui/themes';

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

      {/* Christian Sawatzky */}
      <Box maxWidth="350px" style={{ marginBottom: '20px' }}>
        <Card>
          <Flex gap="3" align="center">
            <Avatar
              size="5"
              src="/images/christian.png"
              radius="full"
              fallback="M"
            />
            <Box>
              <Text as="div" size="4" weight="bold">
                Christian Sawatzky
              </Text>
              <Text as="div" size="3" weight="bold">
                DevOps Engineer
              </Text>
              <Text as="p" size="2" mt="3" color="gray">
              Ich bin hauptverantwortlich für die Einrichtung und Wartung externer Cloud-Software 
              wie die Datenbank, die Server von AWS, den S3-Bucket etc.
              sowie das Assistieren des Designs und das Schreiben des Readme-Datei.
              </Text>
            <Flex mt="3" gap="2" justify="center">
              <Button
              as="a"
              href="https://github.com/Chrisawatzky"
              target="_blank"
              variant="solid"
              color="gray"
              >
              GitHub
            </Button>
            <Button
              as="a"
              href="mailto:sawatzkychristian@gmail.com"
              variant="solid"
              color="green"
            >
              Kontakt
            </Button>
            <Button
              as="a"
              href="https://www.linkedin.com/in/christian-sawatzky-78b985341/"
              target="_blank"
              variant="solid"
              color="blue"
            >
              LinkedIn
            </Button> 
            </Flex>
            </Box>
          </Flex>
        </Card>
      </Box>

      {/* Marcel Welk - Angepasst mit erweiterten Informationen */}
      <Box maxWidth="350px" p="5" borderRadius="lg" shadow="lg" style={{ marginBottom: '20px' }}>
        <Card>
          <Flex gap="3" align="center">
            <Avatar
              size="5"
              src="/images/marcel.png"
              radius="full"
              fallback="M"
            />
            <Box>
              <Text size="4" weight="bold">Marcel Welk</Text>
              <Text size="3" color="gray">Full Stack Entwickler & Projektleiter</Text>
            </Box>
          </Flex>
          <Text as="p" size="2" mt="3" color="gray">
            Als Full Stack Entwickler und Projektleiter war ich verantwortlich für die 
            gesamte Systemarchitektur, die Entwicklung des Frontends mit React, 
            die Implementierung des Backends mit Node.js sowie die Cloud-Integration 
            mit AWS. Zudem habe ich Tesseract.js für Texterkennung und externe APIs 
            für Datenverarbeitung eingebunden.
          </Text>
          {/* Buttons */}
          <Flex mt="3" gap="2" justify="center">
            <Button
              as="a"
              href="https://github.com/celtechstarter"
              target="_blank"
              variant="solid"
              color="gray"
            >
              GitHub
            </Button>
            <Button
              as="a"
              href="mailto:marcel.welk87@gmail.com"
              variant="solid"
              color="green"
            >
              Kontakt
            </Button>
            <Button
              as="a"
              href="https://www.linkedin.com/in/marcel-welk-572a412ab/"
              target="_blank"
              variant="solid"
              color="blue"
            >
              LinkedIn
            </Button>
          </Flex>
        </Card>
      </Box>

      {/* Willy Ellwart */}
      <Box maxWidth="350px" style={{ marginBottom: '20px' }}>
        <Card>
          <Flex gap="3" align="center">
            <Avatar
              size="3"
              src="/images/willy.png"
              radius="full"
              fallback="T"
            />
            <Box>
              <Text as="div" size="4" weight="bold">
                Willy Ellhart
              </Text>
              <Text as="div" size="3" color="gray">
                DevOps Engineering
              </Text>
              <Flex mt="3" gap="2" justify="center">
              <Button
              as="a"
              href="https://github.com/WillyEllwart"
              target="_blank"
              variant="solid"
              color="gray"
              >
              GitHub
            </Button>
            <Button
              as="a"
              href="mailto:willellwart@gmail.com"
              variant="solid"
              color="green"
            >
              Kontakt
            </Button>
            <Button
              as="a"
              href="https://www.linkedin.com/in/willy-ellwart-b1977a2b8/"
              target="_blank"
              variant="solid"
              color="blue"
            >
              LinkedIn
            </Button> 
            </Flex>
            </Box>
          </Flex>
        </Card>
      </Box>
    </Flex>
  );
};

export default About;
