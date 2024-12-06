import React from 'react';

function OcrPage({ text }) {
  return (
    <div>
      <h1>Erkannter Text</h1>
      <p>{text}</p> {/* Hier wird der OCR-Text angezeigt */}
    </div>
  );
}

export default OcrPage;
