import React, { useRef, useCallback, useState } from 'react';
import { Flex, Text, Button } from '@radix-ui/themes';
import Webcam from 'react-webcam';
import axios from 'axios';

const ScanPage = () => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [ocrText, setOcrText] = useState('');

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

      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data && response.data.text) {
        setOcrText(response.data.text);
      }

      setStatusMessage('Bild erfolgreich gespeichert!');
      setImageSrc(null);
    } catch (error) {
      console.error('Fehler beim Speichern des Bildes:', error);
      setStatusMessage('Fehler beim Speichern des Bildes.');
    }
  };

  // Bild löschen
  const deleteImage = () => {
    setImageSrc(null);
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap="20px"
      style={{
        height: 'calc(100vh - 60px)', // Platz für die Navbar
        marginTop: '60px',
        textAlign: 'center',
      }}
    >
      <Text size="6" weight="bold">Scannen Sie Ihre Pokémon-Karte</Text>
      <Flex
        direction="column"
        align="center"
        justify="center"
        gap="20px"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          padding: '20px',
          borderRadius: '10px',
        }}
      >
        {/* Webcam und aufgenommenes Bild nebeneinander */}
        <Flex direction="row" align="center" justify="center" gap="20px">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            style={{
              width: '350px',
              height: 'auto',
              borderRadius: '10px',
              border: '2px solid #ccc',
            }}
          />

          {imageSrc && (
            <img
              src={imageSrc}
              alt="Aufgenommene Pokémon-Karte"
              style={{
                width: '350px',
                height: 'auto',
                borderRadius: '10px',
                border: '2px solid #ccc',
              }}
            />
          )}
        </Flex>

        {/* Buttons */}
        <Flex gap="10px">
          {!imageSrc && (
            <Button onClick={capture} size="large" variant="solid">
              Foto aufnehmen
            </Button>
          )}

          {imageSrc && (
            <>
              <Button onClick={deleteImage} color="red" size="large">
                Löschen
              </Button>
              <Button onClick={saveImage} color="green" size="large">
                Speichern
              </Button>
            </>
          )}
        </Flex>
      </Flex>

      {/* Status Nachricht */}
      {statusMessage && (
        <Text
          size="4"
          weight="medium"
          style={{ color: statusMessage.includes('Fehler') ? 'red' : 'green' }}
        >
          {statusMessage}
        </Text>
      )}

      {/* OCR Text */}
      {ocrText && (
        <Flex direction="column" align="center" gap="10px">
          <Text size="5" weight="bold">Erkannter Text:</Text>
          <Text size="4">{ocrText}</Text>
        </Flex>
      )}
    </Flex>
  );
};

export default ScanPage;
