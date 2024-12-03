import React, { useRef, useCallback, useState } from 'react';
import { Flex, Text, Button } from '@radix-ui/themes';
import Webcam from 'react-webcam';

const ScanPage = () => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
  }, [webcamRef]);

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
      <Button onClick={capture}>Foto aufnehmen</Button>
      {imageSrc && (
        <Flex direction="column" align="center" gap="2">
          <Text size="4" weight="medium">Aufgenommenes Bild:</Text>
          <img src={imageSrc} alt="Aufgenommene Pokémon-Karte" style={{ width: '350px', height: 'auto' }} />
        </Flex>
      )}
    </Flex>
  );
};

export default ScanPage;
