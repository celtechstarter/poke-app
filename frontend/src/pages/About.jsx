import React from "react";
import { Flex, Text, Button, Card, Avatar } from "@radix-ui/themes";
import "../components/About.css";

const About = () => {
  // Daten für Teammitglieder
  const teamMembers = [
    {
      name: "Christian Sawatzky",
      role: "DevOps Engineer",
      description: "Verantwortlich für AWS-Serverdienste, Datenbankintegration und Support im Design.",
      image: "/images/christian.png",
      github: "https://github.com/Chrisawatzky",
      email: "mailto:sawatzkychristian@gmail.com",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Marcel Welk",
      role: "Full Stack Entwickler & Projektleiter",
      description: "Architektur, Frontend mit React, Backend mit Node.js, Texterkennung mit Tesseract.js und AWS-Integration.",
      image: "/images/marcel.png",
      github: "https://github.com/celtechstarter",
      email: "mailto:marcel.welk87@gmail.com",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Willy Ellwart",
      role: "DevOps Engineer",
      description: "Datenbankverwaltung, API-Routing und Konfiguration von Cloud-Serverdiensten.",
      image: "/images/willy.png",
      github: "https://github.com/WillyEllwart",
      email: "mailto:willellwart@gmail.com",
      linkedin: "https://linkedin.com",
    },
  ];

  // Trainer-Daten
  const trainers = [
    { name: "Suheib Marzouka", role: "Trainer", description: "Trainer für PokeScan-Workshops.", image: "/images/suheib.webp" },
    { name: "Mete Adic", role: "Trainer", description: "Trainer für technische Schulungen.", image: "/images/mete.webp" },
    { name: "Hubertus Knobling", role: "Trainer", description: "Unterstützung im praktischen Bereich.", image: "/images/hubertus.webp" },
  ];

  // Teaching Assist-Daten
  const teachingAssists = [
    { name: "Sarah Borell", role: "Teaching Assist", description: "Assistenz bei Schulungen und Workshops.", image: "/images/sarah.webp" },
    { name: "Marian Tugui", role: "Teaching Assist", description: "Betreuung und Nachbereitung von Inhalten.", image: "/images/marian.webp" },
  ];

  // Komponente zum Rendern von Karten
  const renderCard = (member) => (
    <Card key={member.name} className="card-container">
      <Flex direction="column" align="center" gap="2" p="3">
        <Avatar size="5" src={member.image} radius="full" />
        <Text size="4" weight="bold">{member.name}</Text>
        <Text size="3" color="gray" mt="1">{member.role}</Text>
        <Text size="2" mt="2" textAlign="center">{member.description}</Text>
        <Flex mt="3" gap="2" justify="center">
          <Button asChild>
            <a href={member.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          </Button>
          <Button asChild>
            <a href={member.email} rel="noopener noreferrer">Kontakt</a>
          </Button>
          <Button asChild>
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </Button>
        </Flex>
      </Flex>
    </Card>
  );

  return (
    <Flex direction="column" align="center" gap="6" className="about-container">
      {/* Titel und Beschreibung */}
      <Flex direction="column" align="center" className="section-box">
        <Text size="6" weight="bold">PokeScan Technologies – Scan your Pokemon Cards</Text>
        <Text size="3" mt="3" color="gray" textAlign="center">
          PokeScan nutzt modernste Technologien, um Pokémon-Karten mithilfe von AWS Textract zu analysieren
          und deren Kartenpreise effizient darzustellen.
        </Text>
      </Flex>

      {/* Team-Sektion */}
      <Flex direction="column" align="center" gap="4" className="section-box">
        <Text size="5" weight="bold">Unser Team</Text>
        <Flex wrap="wrap" justify="center" gap="6">
          {teamMembers.map(renderCard)}
        </Flex>
      </Flex>

      {/* Trainer-Sektion */}
      <Flex direction="column" align="center" gap="4" className="section-box">
        <Text size="5" weight="bold">Unsere Trainer</Text>
        <Flex wrap="wrap" justify="center" gap="6">
          {trainers.map(renderCard)}
        </Flex>
      </Flex>

      {/* Teaching Assists-Sektion */}
      <Flex direction="column" align="center" gap="4" className="section-box">
        <Text size="5" weight="bold">Unsere Teaching Assists</Text>
        <Flex wrap="wrap" justify="center" gap="6">
          {teachingAssists.map(renderCard)}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default About;
