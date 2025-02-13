import React, { useState, useEffect } from "react";

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);

      return () => clearInterval(interval); // Cleanup interval on unmount
    }
  }, [isPaused, images.length]);

  const goToPrevious = () => {
    setIsPaused(true);
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setIsPaused(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToSlide = (index) => {
    setIsPaused(true);
    setCurrentIndex(index);
  };

  return (
    <div className="carousel-container">
      <button className="prev-btn" onClick={goToPrevious} disabled={currentIndex === 0}>
        ❮
      </button>

      <div className="carousel-image">
        <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
      </div>

      <button className="next-btn" onClick={goToNext} disabled={currentIndex === images.length - 1}>
        ❯
      </button>

      <div className="dot-container">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
