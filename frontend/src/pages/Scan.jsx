import React, { useRef, useCallback, useState } from 'react';
import { Flex, Text, Button } from '@radix-ui/themes';
import Webcam from 'react-webcam';
import axios from 'axios';


const ScanPage = () => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
  }, [webcamRef]);

  const saveImage = async () => {
    try {
      // Sende Bild an das Backend
      await axios.post('http://localhost:3001/upload', { image: imageSrc, data: "Pokémon Card" });
      alert('Bild erfolgreich gespeichert!');
      setImageSrc(null); // Bild nach dem Speichern zurücksetzen
    } catch (error) {
      console.error('Fehler beim Speichern des Bildes:', error);
      alert('Fehler beim Speichern des Bildes.');
    }
  };

  const deleteImage = () => {
    setImageSrc(null); // Lösche das aktuelle Bild
  };

  return (
    <Flex direction="column" align="center" justify="center" gap="4" style={{ height: '100vh' }}>
      <Text size="6" weight="bold">Scan Your Pokémon Card</Text>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={350}
        height={350}
      />
      {!imageSrc && <Button onClick={capture}>Foto aufnehmen</Button>}
      {imageSrc && (
        <Flex direction="column" align="center" gap="2">
          <Text size="4" weight="medium">Aufgenommenes Bild:</Text>
          <img src={imageSrc} alt="Aufgenommene Pokémon-Karte" style={{ width: '350px', height: 'auto' }} />
          <Flex gap="4">
            <Button onClick={deleteImage} color="red">Delete</Button>
            <Button onClick={saveImage} color="green">Save</Button>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default ScanPage;