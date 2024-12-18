import React from 'react';
import { Flex, Text, Button, Box, Card, Avatar, Badge } from '@radix-ui/themes';

const About = () => {
  return (
    <div>
      <h1>Über uns</h1>
      <p>Informationen über die Pokémon Karten-Scanner App.</p>

      {/* Christian Sawatzky */}
      <Box maxWidth="240px" style={{ marginBottom: '20px' }}>
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
          {/* Technologie-Badges */}
          <Flex gap="2" mt="3" wrap="wrap">
            <Badge color="green">React.js</Badge>
            <Badge color="blue">Node.js</Badge>
            <Badge color="purple">MongoDB</Badge>
            <Badge color="orange">Tesseract.js</Badge>
            <Badge color="yellow">AWS S3</Badge>
            <Badge color="teal">AWS EC2</Badge>
            <Badge color="gray">Express.js</Badge>
            <Badge color="red">ScraperAPI</Badge>
            <Badge color="violet">Axios</Badge>
            <Badge color="pink">Docker</Badge>
            <Badge color="cyan">Radix UI</Badge>
            <Badge color="indigo">Git & GitHub</Badge>
          </Flex>
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
      <Box maxWidth="240px">
        <Card>
          <Flex gap="3" align="center">
            <Avatar
              size="3"
              src="/images/willy.png"
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
    </div>
  );
};

export default About;
