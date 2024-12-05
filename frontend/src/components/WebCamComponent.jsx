import React from 'react';
import Webcam from 'react-webcam';
import { Button, Flex } from '@radix-ui/themes';

const WebCamComponent = ({ webcamRef, capture }) => (
  <Flex direction="column" align="center" gap="4">
    <Webcam
      ref={webcamRef}
      screenshotFormat="image/jpeg"
      width={350}
      height={350}
      css={{ borderRadius: '8px', border: '2px solid #ddd' }}
    />
    <Button onClick={capture} variant="solid" color="blue">
      Foto aufnehmen
    </Button>
  </Flex>
);

export default WebCamComponent;
