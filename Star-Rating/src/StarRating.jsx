import React, { useState } from "react";
import { FaStar } from "react-icons/fa"; // FontAwesome Stars

const StarRating = ({ totalStars = 5 }) => {
  const [rating, setRating] = useState(0); // Selected rating
  const [hover, setHover] = useState(0);   // Hover rating

  return (
    <div className="star-rating-container">
      <h2>Rate Us</h2>
      <div className="stars">
        {/* Generate stars dynamically using .map() */}
        {[...Array(totalStars)].map((_, index) => {
          const starValue = index + 1;

          return (
            <FaStar
              key={starValue}
              onClick={() => setRating(starValue)} // Click to select rating
              onMouseEnter={() => setHover(starValue)} // Hover effect
              onMouseLeave={() => setHover(0)} // Reset hover
              className={`star ${starValue <= (hover || rating) ? "selected" : "unselected"}`}
            />
          );
        })}
      </div>
      <p className="rating-text">
        {rating ? `You rated ${rating}/${totalStars}` : "Click a star to rate"}
      </p>
    </div>
  );
};

export default StarRating;
