import React from "react";
import {
  Flex,
  Text,
  Button,
  Box,
  Card,
  Avatar,
  ScrollArea,
  Container,
} from "@radix-ui/themes";
import "../components/About.css";

const About = () => {
  const teamMembers = [
    {
      name: "Christian Sawatzky",
      role: "DevOps Engineer",
      description:
        "Verantwortlich für AWS-Serverdienste, Datenbankintegration und Support im Design.",
      image: "/images/christian.png",
      github: "https://github.com/Chrisawatzky",
      email: "mailto:sawatzkychristian@gmail.com",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Marcel Welk",
      role: "Full Stack Entwickler & Projektleiter",
      description:
        "Architektur, Frontend mit React, Backend mit Node.js, Texterkennung mit Tesseract.js und AWS-Integration.",
      image: "/images/marcel.png",
      github: "https://github.com/celtechstarter",
      email: "mailto:marcel.welk87@gmail.com",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Willy Ellwart",
      role: "DevOps Engineer",
      description:
        "Datenbankverwaltung, API-Routing und Konfiguration von Cloud-Serverdiensten.",
      image: "/images/willy.png",
      github: "https://github.com/WillyEllwart",
      email: "mailto:willellwart@gmail.com",
      linkedin: "https://linkedin.com",
    },
  ];

  const trainers = [
    { name: "Suheib Marzouka", role: "Trainer", description: "Trainer für PokeScan-Workshops.", image: "/images/suheib.webp" },
    { name: "Mete Adic", role: "Trainer", description: "Trainer für technische Schulungen.", image: "/images/mete.webp" },
    { name: "Hubertus Knobling", role: "Trainer", description: "Unterstützung im praktischen Bereich.", image: "/images/hubertus.webp" },
  ];

  const teachingAssists = [
    { name: "Sarah Borell", role: "Teaching Assist", description: "Assistenz bei Schulungen und Workshops.", image: "/images/sarah.webp" },
    { name: "Marian Tugui", role: "Teaching Assist", description: "Betreuung und Nachbereitung von Inhalten.", image: "/images/marian.webp" },
  ];

  const renderCard = (member, cardClass) => (
    <Box key={member.name} className={`card-container ${cardClass}`}>
      <Card className="card-content">
        <Flex direction="column" align="center" gap="2" p="3">
          <Avatar size="5" src={member.image} radius="full" className="card-avatar" />
          <Box textAlign="center">
            <Text size="4" weight="bold" className="card-title">{member.name}</Text>
            <Text size="3" mt="1" className="card-role">{member.role}</Text>
          </Box>
          <Text as="p" size="2" mt="2" textAlign="center" className="card-description">
            {member.description}
          </Text>
          <Flex mt="3" gap="2" justify="center">
            <Button asChild className="button github-button">
              <a href={member.github || "#"} target="_blank" rel="noopener noreferrer">GitHub</a>
            </Button>
            <Button asChild className="button contact-button">
              <a href={member.email || "#"} rel="noopener noreferrer">Kontakt</a>
            </Button>
            <Button asChild className="button linkedin-button">
              <a href={member.linkedin || "#"} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </Button>
          </Flex>
        </Flex>
      </Card>
    </Box>
  );

  return (
    <ScrollArea className="scroll-container">
      <Container size="3" px="4" py="5">
        <Box className="section-box">
          <Text className="project-title">PokeScan – Ein innovatives Projekt</Text>
          <Text className="project-description">
            PokeScan nutzt modernste Technologien, um Pokémon-Karten mithilfe von OCR-Texterkennung zu analysieren und deren Informationen effizient darzustellen.
          </Text>
        </Box>

        <Box className="section-box">
          <Text className="section-title">Unser Team</Text>
          <Flex wrap="wrap" justify="center" gap="6">
            {teamMembers.map((member) => renderCard(member, "team-card"))}
          </Flex>
        </Box>

        <Box className="section-box">
          <Text className="section-title">Unsere Trainer</Text>
          <Flex wrap="wrap" justify="center" gap="6">
            {trainers.map((member) => renderCard(member, "trainer-card"))}
          </Flex>
        </Box>

        <Box className="section-box">
          <Text className="section-title">Unsere Teaching Assists</Text>
          <Flex wrap="wrap" justify="center" gap="6">
            {teachingAssists.map((member) => renderCard(member, "teaching-card"))}
          </Flex>
        </Box>
      </Container>
    </ScrollArea>
  );
};

export default About;
