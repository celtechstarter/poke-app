import React from "react";
import { Flex, Card, Button, Text } from "@radix-ui/themes";

const CardList = ({ cards, scanCardValue }) => {
  // Prüfen, ob Karten vorhanden sind
  if (!cards || cards.length === 0) {
    return (
      <Flex justify="center" align="center" style={{ marginTop: "20px" }}>
        <Text size="4" weight="medium" color="gray">
          Keine Karten verfügbar. Laden Sie ein Bild hoch oder führen Sie einen Scan durch.
        </Text>
      </Flex>
    );
  }

  return (
    <Flex wrap="wrap" gap="4" justify="center">
      {cards.map((card) => (
        <Card
          key={card._id}
          style={{
            width: "200px",
            padding: "16px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          {/* Kartenbild */}
          <img
            src={card.image}
            alt={card.name || "Pokémon Card"}
            style={{
              width: "100%",
              height: "150px",
              objectFit: "cover",
              borderRadius: "8px",
              marginBottom: "8px",
            }}
          />

          {/* Kartenname */}
          <Text size="4" weight="bold" style={{ marginBottom: "4px" }}>
            {card.name || "Unbekannte Karte"}
          </Text>

          {/* Kartenwert */}
          <Text size="3" color="gray" style={{ marginBottom: "8px" }}>
            {card.value ? `Wert: ${card.value} €` : "Wert: N/A"}
          </Text>

          {/* Scan-Button */}
          <Button
            variant="solid"
            color="blue"
            onClick={() => scanCardValue(card._id)}
            style={{ marginTop: "8px" }}
          >
            Wert aktualisieren
          </Button>
        </Card>
      ))}
    </Flex>
  );
};

export default CardList;
