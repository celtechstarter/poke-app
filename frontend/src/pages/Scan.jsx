import React, { useRef, useCallback, useState } from "react";
import { Flex, Text, Button } from "@radix-ui/themes";
import Webcam from "react-webcam";
import axios from "axios";

const ScanPage = () => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [ocrResult, setOcrResult] = useState("");
  const [isOcrRunning, setIsOcrRunning] = useState(false);
  const [searchLinks, setSearchLinks] = useState([]); // Speichert die Suchergebnisse

  // Foto aufnehmen
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot(); // Screenshot der Webcam als Base64
    setImageSrc(imageSrc);
    setStatusMessage("");
    setSearchLinks([]); // Zurücksetzen der Suchergebnisse
  }, [webcamRef]);

  // Bild hochladen
  const saveImage = async () => {
    if (!imageSrc) {
      setStatusMessage("Kein Bild zum Hochladen vorhanden.");
      return;
    }

    try {
      setStatusMessage("Wird hochgeladen...");
      const response = await axios.post("http://localhost:5000/scan/upload", {
        image: imageSrc,
        data: "Metadaten hier einfügen", // Optional: Metadaten
      });

      if (response.data.success) {
        setStatusMessage("Bild erfolgreich abgespeichert!");
      } else {
        setStatusMessage("Fehler beim Speichern des Bildes.");
      }
    } catch (error) {
      console.error("Fehler beim Speichern des Bildes:", error);
      setStatusMessage("Fehler beim Speichern des Bildes.");
    }
  };

  // OCR-Texterkennung starten
  const startOcr = async () => {
    try {
      setIsOcrRunning(true);
      setOcrResult("Texterkennung läuft...");
      setSearchLinks([]);

      // Anforderung an den OCR-Endpunkt
      const response = await axios.get("http://localhost:5000/scan/latest");
      const { image } = response.data.card;

      const ocrResponse = await axios.post("http://localhost:5000/scan/ocr", {
        image,
      });
      const { text } = ocrResponse.data;

      if (text) {
        setOcrResult(`Erkannter Text: ${text}`);
        await performSearch(text); // Suche nach der Karte durchführen
      } else {
        setOcrResult("Kein Text erkannt.");
      }
    } catch (error) {
      console.error("Fehler bei der Texterkennung:", error);
      setOcrResult("Fehler bei der Texterkennung.");
    } finally {
      setIsOcrRunning(false);
    }
  };

  // Suche nach der Karte durchführen
  const performSearch = async (query) => {
    try {
      setStatusMessage("Suche nach der Karte läuft...");
      const response = await axios.post("http://localhost:5000/scan/scrape", {
        query,
      });

      if (response.data.links && response.data.links.length > 0) {
        setSearchLinks(response.data.links);
        setStatusMessage("Suchergebnisse gefunden!");
      } else {
        setSearchLinks([]);
        setStatusMessage("Keine passenden Ergebnisse gefunden.");
      }
    } catch (error) {
      console.error("Fehler bei der Suche:", error);
      setStatusMessage("Fehler bei der Suche nach der Karte.");
    }
  };

  return (
    
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap="20px"
      style={{
        height: "calc(100vh - 60px)",
        marginTop: "60px",
        textAlign: "center",
      }}
    >
      <Text size="6" weight="bold">
        Scannen Sie Ihre Pokémon-Karte
      </Text>
      <Flex
        direction="column"
        align="center"
        justify="center"
        gap="20px"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "300px",
            height: "400px",
            borderRadius: "10px",
            overflow: "hidden",
            border: "2px solid #ccc",
          }}
        >
          {!imageSrc ? (
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <img
              src={imageSrc}
              alt="Aufgenommene Pokémon-Karte"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}
        </div>

        <Flex gap="10px">
          {!imageSrc && (
            <Button onClick={capture} size="large" variant="solid">
              Foto aufnehmen
            </Button>
          )}
          {imageSrc && (
            <>
              <Button onClick={saveImage} color="green" size="large">
                Speichern
              </Button>
              <Button
                onClick={startOcr}
                color="blue"
                size="large"
                disabled={isOcrRunning}
              >
                OCR starten
              </Button>
            </>
          )}
        </Flex>
      </Flex>

      {statusMessage && (
        <Text
          size="4"
          weight="medium"
          style={{ color: statusMessage.includes("Fehler") ? "red" : "green" }}
        >
          {statusMessage}
        </Text>
      )}
      {ocrResult && (
        <Text
          size="4"
          weight="medium"
          style={{
            marginTop: "20px",
            color: ocrResult.includes("Fehler") ? "red" : "blue",
          }}
        >
          {ocrResult}
        </Text>
      )}

      {/* Suchergebnisse anzeigen */}
      {searchLinks.length > 0 && (
        <div style={{ marginTop: "20px", textAlign: "left" }}>
          <Text size="4" weight="medium">
            Suchergebnisse:
          </Text>
          <ul>
            {searchLinks.map((link, index) => (
              <li key={index}>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Flex>
    
  );
};

export default ScanPage;
