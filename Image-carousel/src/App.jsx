import React from "react";
import ImageCarousel from "./Imagecarousel";

const imageUrls = [
  "https://shorturl.at/x6a8i",
  "https://shorturl.at/6dNqD",
  "https://shorturl.at/dJ269"
];

const App = () => {
  return (
    <div>
      <h1 className="heading">React Image Carousel</h1>
      <ImageCarousel images={imageUrls} />
    </div>
  );
};

export default App;
