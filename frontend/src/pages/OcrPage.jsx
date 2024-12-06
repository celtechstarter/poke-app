

import React, { useState } from 'react';
import { Flex, Text, Button, Input } from '@radix-ui/themes';
import axios from 'axios';

const OcrPage = () => {
  const [file, setFile] = useState(null);
  const [ocrText, setOcrText] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const performOCR = async () => {
    if (!file) {
      setStatusMessage('Bitte wählen Sie eine Datei aus.');
      return;
    }

    try {
      setStatusMessage('OCR wird durchgeführt...');
      const formData = new FormData();
      formData.append('file', file);

      const uploadResponse = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (uploadResponse.data.file) {
        const fileId = uploadResponse.data.file.id;
        const ocrResponse = await axios.post('http://localhost:5000/ocr', { fileId });

        if (ocrResponse.data.text) {
          setOcrText(ocrResponse.data.text);
          setStatusMessage('OCR erfolgreich abgeschlossen!');
        } else {
          setStatusMessage('Kein Text erkannt.');
        }
      } else {
        setStatusMessage('Upload fehlgeschlagen.');
      }
    } catch (error) {
      console.error('Fehler bei der OCR-Verarbeitung:', error);
      setStatusMessage('Fehler bei der OCR-Verarbeitung.');
    }
  };

  return (
    <Flex direction="column" align="center" justify="center" gap="4" style={{ height: '100vh' }}>
      <Text size="6" weight="bold">OCR durchführen</Text>
      <Input type="file" accept="image/*" onChange={handleFileChange} />
      <Button onClick={performOCR} color="green">OCR starten</Button>
      {statusMessage && (
        <Text size="4" weight="medium" style={{ marginTop: '20px' }}>
          {statusMessage}
        </Text>
      )}
      {ocrText && (
        <Flex direction="column" align="center" gap="2" style={{ marginTop: '20px' }}>
          <Text size="5" weight="bold">Erkannter Text:</Text>
          <Text size="4">{ocrText}</Text>
        </Flex>
      )}
    </Flex>
  );
};

export default OcrPage;
