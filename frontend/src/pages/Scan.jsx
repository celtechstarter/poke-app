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
    if (!imageSrc) {
      alert('Kein Bild zum Hochladen vorhanden.');
      return;
    }

    try {
      const formData = new FormData();
      const blob = await fetch(imageSrc).then(res => res.blob());
      formData.append('file', blob, 'screenshot.jpg');

      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Bild erfolgreich gespeichert!');
      console.log('Antwort vom Server:', response.data);
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
      <Text size="6" weight="bold">Scannen Sie Ihre Pokémon-Karte</Text>
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
            <Button onClick={deleteImage} color="red">Löschen</Button>
            <Button onClick={saveImage} color="green">Speichern</Button>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default ScanPage;
