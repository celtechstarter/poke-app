/*import React from 'react';
import { Flex, Card, Button, Text } from '@radix-ui/themes';

const CardList = ({ cards, scanCardValue }) => (
  <Flex wrap="wrap" gap="4" css={{ justifyContent: 'center' }}>
    {cards.map((card) => (
      <Card key={card._id} css={{ width: '200px', padding: '16px', borderRadius: '8px' }}>
        <img
          src={card.image}
          alt={card.name || 'Pokémon Card'}
          style={{ width: '100%', borderRadius: '8px', marginBottom: '8px' }}
        />
        <Text size="4" weight="bold">{card.name || 'Pokémon Card'}</Text>
        <Text size="3">Wert: {card.value || 'N/A'} €</Text>
        <Button
          variant="solid"
          onClick={() => scanCardValue(card._id)}
          css={{ marginTop: '8px' }}
        >
          Scan Wert
        </Button>
      </Card>
    ))}
  </Flex>
);

export default CardList;
*/



import React from 'react';
import { Flex, Card, Button, Text } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';

const CardList = ({ cards, scanCardValue }) => {
  const navigate = useNavigate();

  return (
    <Flex wrap="wrap" gap="4" css={{ justifyContent: 'center' }}>
      {cards.map((card) => (
        <Card key={card._id} css={{ width: '200px', padding: '16px', borderRadius: '8px' }}>
          <img
            src={card.image}
            alt={card.name || 'Pokémon Card'}
            style={{ width: '100%', borderRadius: '8px', marginBottom: '8px', cursor: 'pointer' }}
            onClick={() => navigate(`/cards/${card._id}`)} // Zur Detailseite navigieren
          />
          <Text
            size="4"
            weight="bold"
            css={{ cursor: 'pointer', color: 'blue' }}
            onClick={() => navigate(`/cards/${card._id}`)} // Zur Detailseite navigieren
          >
            {card.name || 'Pokémon Card'}
          </Text>
          <Text size="3">Wert: {card.value || 'N/A'} €</Text>

          {/* Optionaler Button für Wert-Scan */}
          {scanCardValue && (
            <Button
              variant="solid"
              onClick={() => scanCardValue(card._id)}
              css={{ marginTop: '8px' }}
            >
              Scan Wert
            </Button>
          )}
        </Card>
      ))}
    </Flex>
  );
};

export default CardList;