/*import React, { useEffect, useState } from 'react';
import CardList from '../components/CardList';

const MyCards = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      const response = await fetch('http://localhost:3001/scan/123/cards');
      const data = await response.json();
      setCards(data);
    };
    fetchCards();
  }, []);

  const scanCardValue = async (id) => {
    const response = await fetch(`http://localhost:3001/scan/${id}/value`, { method: 'POST' });
    const data = await response.json();
    alert(`Der neue Wert der Karte ist: ${data.card.value}`);
  };

  return (
    <div>
      <h1>My Cards</h1>
      <CardList cards={cards} scanCardValue={scanCardValue} />
    </div>
  );
};

export default MyCards;
*/

import React, { useEffect, useState } from 'react';
import CardList from '../components/CardList';

const MyCards = () => {
  const [cards, setCards] = useState([]);
  const currentUser = { id: '12345' }; // Beispiel-Nutzer-ID, dynamisch ersetzen

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(`http://localhost:5000/scan/cards?userId=${currentUser.id}`);
        const data = await response.json();
        setCards(data);
      } catch (error) {
        console.error('Fehler beim Abrufen der Karten:', error);
      }
    };

    fetchCards();
  }, []);

  const scanCardValue = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/scan/${id}/value`, { method: 'POST' });
      const data = await response.json();
      alert(`Der neue Wert der Karte ist: ${data.card.value}`);
    } catch (error) {
      console.error('Fehler beim Abrufen des Kartenwerts:', error);
    }
  };

  return (
    <div>
      <h1>Meine Karten</h1>
      <CardList cards={cards} scanCardValue={scanCardValue} />
    </div>
  );
};

export default MyCards;
