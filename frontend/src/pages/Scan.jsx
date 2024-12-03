import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';

const Scan = () => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
  }, [webcamRef]);

}

const ScanPage = () => {

  return (
    <div>
      <h1>Pokémon-Karten-Scanner</h1>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={350}
        height={350}
      />
      <button onClick={capture}>Foto aufnehmen</button>
      {imageSrc && (
        <div>
          <h2>Aufgenommenes Bild:</h2>
          <img src={imageSrc} alt="Aufgenommene Pokémon-Karte" />
        </div>
      )}
    </div>
  );
};

export default Scan;
