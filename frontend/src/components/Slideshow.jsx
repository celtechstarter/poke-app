import React, { useEffect, useState, useRef } from 'react';
import './Slideshow.css';

const images = [
  'https://assets.tcgdex.net/en/tcgp/A1/117/low.webp',
  'https://assets.tcgdex.net/en/tcgp/A1/142/low.webp',
  'https://www.tcgdex.net/_next/image?url=https%3A%2F%2Fassets.tcgdex.net%2Fen%2Ftcgp%2FA1%2F080%2Flow.webp&w=384&q=75',
  'https://www.tcgdex.net/_next/image?url=https%3A%2F%2Fassets.tcgdex.net%2Fen%2Ftcgp%2FA1%2F036%2Flow.webp&w=384&q=75',
  'https://www.tcgdex.net/_next/image?url=https%3A%2F%2Fassets.tcgdex.net%2Fen%2Ftcgp%2FA1%2F094%2Flow.webp&w=384&q=75',
  'https://www.tcgdex.net/_next/image?url=https%3A%2F%2Fassets.tcgdex.net%2Fen%2Ftcgp%2FA1%2F268%2Flow.webp&w=384&q=75',
  'https://www.tcgdex.net/_next/image?url=https%3A%2F%2Fassets.tcgdex.net%2Fen%2Ftcgp%2FA1%2F218%2Flow.webp&w=384&q=75',
  'https://www.tcgdex.net/_next/image?url=https%3A%2F%2Fassets.tcgdex.net%2Fen%2Ftcgp%2FA1%2F007%2Flow.webp&w=384&q=75',
  'https://www.tcgdex.net/_next/image?url=https%3A%2F%2Fassets.tcgdex.net%2Fen%2Ftcgp%2FA1%2F186%2Flow.webp&w=384&q=75',
  'https://www.tcgdex.net/_next/image?url=https%3A%2F%2Fassets.tcgdex.net%2Fen%2Fbase%2Fbase5%2F3%2Fhigh.webp&w=1920&q=75',
  'https://www.tcgdex.net/_next/image?url=https%3A%2F%2Fassets.tcgdex.net%2Fen%2Fbase%2Fbase5%2F15%2Fhigh.webp&w=1920&q=75',
  'https://www.tcgdex.net/_next/image?url=https%3A%2F%2Fassets.tcgdex.net%2Fen%2Fsv%2Fsv03.5%2F143%2Fhigh.webp&w=1920&q=75',
  'https://www.tcgdex.net/_next/image?url=https%3A%2F%2Fassets.tcgdex.net%2Fen%2Fsv%2Fsv03.5%2F145%2Fhigh.webp&w=1920&q=75',
  'https://www.tcgdex.net/_next/image?url=https%3A%2F%2Fassets.tcgdex.net%2Fen%2Fsv%2Fsv03.5%2F151%2Fhigh.webp&w=1920&q=75',
  'https://www.tcgdex.net/_next/image?url=https%3A%2F%2Fassets.tcgdex.net%2Fen%2Fsv%2Fsv03.5%2F170%2Fhigh.webp&w=1920&q=75',
  'https://www.tcgdex.net/_next/image?url=https%3A%2F%2Fassets.tcgdex.net%2Fen%2Fsv%2Fsv03.5%2F176%2Fhigh.webp&w=1920&q=75',
  'https://www.tcgdex.net/_next/image?url=https%3A%2F%2Fassets.tcgdex.net%2Fen%2Fsv%2Fsv03.5%2F188%2Fhigh.webp&w=1920&q=75',
  'https://www.tcgdex.net/_next/image?url=https%3A%2F%2Fassets.tcgdex.net%2Fen%2Fsv%2Fsv03.5%2F205%2Fhigh.webp&w=1920&q=75',
  'https://www.tcgdex.net/_next/image?url=https%3A%2F%2Fassets.tcgdex.net%2Fen%2Fsv%2Fsv08%2F057%2Fhigh.webp&w=1920&q=75',
  'https://www.tcgdex.net/_next/image?url=https%3A%2F%2Fassets.tcgdex.net%2Fen%2Fsv%2Fsv08%2F235%2Fhigh.webp&w=1920&q=75'
];

export default function Slideshow() {
  const [currentOffset, setCurrentOffset] = useState(0);
  const cardWidth = 220; // Breite der Karten inkl. Margin
  const intervalRef = useRef(null);
  const totalCards = images.length;
  const duplicatedImages = [...images, ...images, ...images]; // Mehrere Kopien für nahtlose Schleife

  const startSlide = () => {
    intervalRef.current = setInterval(() => {
      setCurrentOffset((prevOffset) => {
        const resetPoint = -(cardWidth * totalCards);
        return prevOffset - 1 <= resetPoint ? 0 : prevOffset - 1;
      });
    }, 15); // Stetige Bewegung, alle 15ms um 1px verschieben
  };

  const stopSlide = () => clearInterval(intervalRef.current);

  useEffect(() => {
    startSlide();
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="slideshow-container">
      <div
        className="slideshow-track"
        style={{ transform: `translateX(${currentOffset}px)` }}
        onMouseEnter={stopSlide}
        onMouseLeave={startSlide}
      >
        {duplicatedImages.map((image, index) => (
          <div key={index} className="card-box">
            <img
              src={image}
              alt={`Card ${index % totalCards + 1}`}
              className="card-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
}