import React, { useState } from "react";
import axios from "axios";

const ScanPage = () => {
  const [image, setImage] = useState(null);
  const [recognizedText, setRecognizedText] = useState("");
  const [scrapeResult, setScrapeResult] = useState([]);
  const [error, setError] = useState("");

  // Bild auswählen
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // OCR starten
  const startOcr = async () => {
    if (!image) {
      setError("Bitte ein Bild hochladen.");
      return;
    }

    setError("");
    setRecognizedText("");
    setScrapeResult([]);
    try {
      const response = await axios.post("http://localhost:5000/scan/ocr", {
        image,
      });
      setRecognizedText(response.data.text);
    } catch (err) {
      setError("Fehler bei der Texterkennung.");
      console.error(err);
    }
  };

  // ScraperAPI-Suche
  const handleSearch = async () => {
    if (!recognizedText) {
      setError("Kein Text erkannt. Bitte führen Sie zuerst OCR aus.");
      return;
    }

    setError("");
    setScrapeResult([]);
    try {
      const response = await axios.post("http://localhost:5000/scan/scrape", {
        query: recognizedText,
      });

      if (response.data.links && response.data.links.length > 0) {
        setScrapeResult(response.data.links);
      } else {
        setScrapeResult([]);
      }
    } catch (err) {
      setError("Fehler bei der Suche nach Ergebnissen.");
      console.error(err);
    }
  };

  // OCR und Suche kombinieren
  const startOcrAndSearch = async () => {
    await startOcr();
    handleSearch();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Pokémon Karten Scanner</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ marginBottom: "20px" }}
      />

      {image && (
        <div>
          <img src={image} alt="Hochgeladenes Bild" width="300" />
        </div>
      )}

      <button
        onClick={startOcrAndSearch}
        style={{
          padding: "10px 20px",
          margin: "10px",
          backgroundColor: "blue",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        OCR starten & Karte suchen
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {recognizedText && (
        <div>
          <h3>Erkannter Text:</h3>
          <p>{recognizedText}</p>
        </div>
      )}

      {scrapeResult.length > 0 && (
        <div>
          <h3>Suchergebnisse:</h3>
          <ul>
            {scrapeResult.map((link, index) => (
              <li key={index}>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {scrapeResult.length === 0 && recognizedText && (
        <p>Keine passenden Ergebnisse gefunden.</p>
      )}
    </div>
  );
};

export default ScanPage;
