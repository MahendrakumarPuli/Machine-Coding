import React, { useState, useEffect } from "react";
import { FaThLarge, FaList } from "react-icons/fa";

// Sample product list
const productsList = [
  { id: 1, name: "Smartphone", price: "$699", image: "https://shorturl.at/6RIuu" },
  { id: 2, name: "Laptop", price: "$1199", image: "https://shorturl.at/SoiMv" },
  { id: 3, name: "Headphones", price: "$199", image: "https://shorturl.at/fAUij" },
  { id: 4, name: "Smartwatch", price: "$299", image: "https://shorturl.at/HA8Oa" },
  { id: 5, name: "Camera", price: "$499", image: "https://rb.gy/gax5zl" },
  { id: 6, name: "Tablet", price: "$399", image: "https://rb.gy/dez3zz" },
  { id: 7, name: "Gaming Console", price: "$599", image: "https://tinyurl.com/3bu7csst" },
  { id: 8, name: "Monitor", price: "$349", image: "https://tinyurl.com/4uepew9n" },
  { id: 9, name: "Keyboard", price: "$89", image: "https://tinyurl.com/yp7ynm92" },
  { id: 10, name: "Mouse", price: "$49", image: "https://tinyurl.com/3djwmev7" },
];

const App = () => {
  // State to manage view mode (true = Grid View, false = List View)
  const [isGridView, setIsGridView] = useState(() => {
    // Retrieve saved view mode from localStorage or default to false (List View)
    return localStorage.getItem("isGridView") === "true";
  });

  // Save the view preference in local storage when it changes
  useEffect(() => {
    localStorage.setItem("isGridView", isGridView);
  }, [isGridView]);

  // Toggle between List and Grid view
  const toggleView = () => setIsGridView((prev) => !prev);

  return (
    <div className="App">
      <h1>🛍️ Product Catalog</h1>

      {/* Toggle Button */}
      <button id="toggleViewBtn" onClick={toggleView}>
        {isGridView ? <FaList /> : <FaThLarge />}
        {isGridView ? " Switch to List View" : " Switch to Grid View"}
      </button>

      {/* Product Container */}
      <div className={`product-container ${isGridView ? "grid-view" : "list-view"}`}>
        {productsList.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-info">
              <h2>{product.name}</h2>
              <p>{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
