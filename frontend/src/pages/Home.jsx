import React from "react";
import { Flex, Text, Button } from "@radix-ui/themes";
import Slideshow from "../components/Slideshow"; // Korrekt angepasster Importpfad

const Home = () => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap="4"
      style={{ height: "100vh", padding: "16px" }}
    >
      <Text size="6" weight="bold">
        Willkommen zum Pokémon Card Scanner
      </Text>
      {/* Integrierte Slideshow-Komponente */}
      <Slideshow />
      <Button variant="solid" onClick={() => (window.location.href = "/scan")}>
        Zur Scan-Seite
      </Button>
    </Flex>
  );
};

export default Home;
