import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Flex, Text, Button } from '@radix-ui/themes';
import axios from 'axios';

const CardDetails = () => {
  const { id } = useParams(); // ID der Karte aus der Route
  const [card, setCard] = useState(null);
  const [price, setPrice] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/scan/cards/${id}`);
        setCard(response.data);
      } catch (error) {
        console.error('Fehler beim Abrufen der Kartendetails:', error);
        setStatusMessage('Fehler beim Laden der Kartendetails.');
      }
    };

    fetchCardDetails();
  }, [id]);

  const fetchPrice = async () => {
    if (!card) return;

    try {
      setStatusMessage('Preis wird abgerufen...');
      const response = await axios.post('http://localhost:5000/scrape-price', {
        cardName: card.name,
      });

      if (response.data.price) {
        setPrice(response.data.price);
        setStatusMessage('');
      } else {
        setStatusMessage('Preis konnte nicht gefunden werden.');
      }
    } catch (error) {
      console.error('Fehler beim Abrufen des Preises:', error);
      setStatusMessage('Fehler beim Abrufen des Preises.');
    }
  };

  if (!card) {
    return <Text>Lädt...</Text>;
  }

  return (
    <Flex direction="column" align="center" gap="4" style={{ height: '100vh' }}>
      <Text size="6" weight="bold">{card.name}</Text>
      <img src={card.image} alt={card.name} style={{ width: '300px', borderRadius: '8px' }} />
      <Text size="4">Wert: {card.value} €</Text>
      <Text size="4">Erkannter Text: {card.data}</Text>
      {price && <Text size="4" weight="bold">Aktueller Preis: {price} €</Text>}
      <Button onClick={fetchPrice} color="blue">Aktuellen Preis abrufen</Button>
      {statusMessage && (
        <Text size="4" weight="medium" style={{ marginTop: '20px' }}>
          {statusMessage}
        </Text>
      )}
    </Flex>
  );
};

export default CardDetails;
