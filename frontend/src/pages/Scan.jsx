import React, { useRef, useCallback, useState } from 'react';
import { Flex, Text, Button } from '@radix-ui/themes';
import Webcam from 'react-webcam';
import axios from 'axios';

const ScanPage = () => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [ocrText, setOcrText] = useState(''); // OCR-Text speichern

  // Foto aufnehmen
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
  }, [webcamRef]);

  // Bild hochladen und OCR-Text extrahieren
  const saveImage = async () => {
    if (!imageSrc) {
      setStatusMessage('Kein Bild zum Hochladen vorhanden.');
      return;
    }

    try {
      setStatusMessage('Wird hochgeladen...');
      const formData = new FormData();
      const blob = await fetch(imageSrc).then((res) => res.blob());
      formData.append('file', blob, 'screenshot.jpg');

      // Bild hochladen und OCR durchführen
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // OCR Text setzen, der vom Server zurückgegeben wurde
      if (response.data && response.data.text) {
        setOcrText(response.data.text); // OCR-Text speichern
      }

      setStatusMessage('Bild erfolgreich gespeichert!');
      setImageSrc(null); // Bild nach dem Speichern zurücksetzen
    } catch (error) {
      console.error('Fehler beim Speichern des Bildes:', error);
      setStatusMessage('Fehler beim Speichern des Bildes.');
    }
  };

  // Bild löschen
  const deleteImage = () => {
    setImageSrc(null); // Lösche das aktuelle Bild
  };

  return (
    <Flex direction="column" align="center" justify="center" gap="4" style={{ height: '100vh' }}>
      <Text size="6" weight="bold">Scannen Sie Ihre Pokémon-Karte</Text>
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" width={350} height={350} />
      
      {/* Foto aufnehmen Button */}
      {!imageSrc && <Button onClick={capture}>Foto aufnehmen</Button>}
      
      {/* Aufgenommenes Bild anzeigen */}
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
      
      {/* Status Nachricht anzeigen */}
      {statusMessage && <Text size="4" weight="medium" style={{ marginTop: '20px' }}>{statusMessage}</Text>}

      {/* OCR Text anzeigen, wenn vorhanden */}
      {ocrText && (
        <Flex direction="column" align="center" gap="2" style={{ marginTop: '20px' }}>
          <Text size="5" weight="bold">Erkannter Text:</Text>
          <Text size="4">{ocrText}</Text> {/* Hier wird der OCR Text angezeigt */}
        </Flex>
      )}
    </Flex>
  );
};

export default ScanPage;
