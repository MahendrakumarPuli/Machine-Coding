import React, { useState, useEffect } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import mahi from "./assets/mahi.jpg"

const App = () => {
  // Retrieve initial values from localStorage or use defaults
  const [likeCount, setLikeCount] = useState(() => parseInt(localStorage.getItem("likeCount")) || 0);
  const [dislikeCount, setDislikeCount] = useState(() => parseInt(localStorage.getItem("dislikeCount")) || 0);
  const [userReaction, setUserReaction] = useState(() => parseInt(localStorage.getItem("userReaction")) || 0);

  // Update localStorage when counts or reaction changes
  useEffect(() => {
    localStorage.setItem("likeCount", likeCount);
    localStorage.setItem("dislikeCount", dislikeCount);
    localStorage.setItem("userReaction", userReaction);
  }, [likeCount, dislikeCount, userReaction]);

  // Handle Like Button Click
  const handleLike = () => {
    if (userReaction === 1) {
      setLikeCount(likeCount - 1);
      setUserReaction(0);
    } else {
      setLikeCount(likeCount + 1);
      if (userReaction === -1) setDislikeCount(dislikeCount - 1);
      setUserReaction(1);
    }
  };

  // Handle Dislike Button Click
  const handleDislike = () => {
    if (userReaction === -1) {
      setDislikeCount(dislikeCount - 1);
      setUserReaction(0);
    } else {
      setDislikeCount(dislikeCount + 1);
      if (userReaction === 1) setLikeCount(likeCount - 1);
      setUserReaction(-1);
    }
  };

  return (
    <div className="App">
      <div className="post">
      <h2>📚 This is an amazing React tutorial!</h2>
        <img
          src={mahi}
          alt="React Tutorial"
          className="post-image"
        />
      </div>

      <div className="reaction-buttons">
        <button
          className={`like-btn ${userReaction === 1 ? "active" : ""}`}
          onClick={handleLike}
        >
          <FaThumbsUp /> Like {likeCount}
        </button>

        <button
          className={`dislike-btn ${userReaction === -1 ? "active" : ""}`}
          onClick={handleDislike}
        >
          <FaThumbsDown /> Dislike {dislikeCount}
        </button>
      </div>

      {/* Feedback Message */}
      <p className="feedback">
        {userReaction === 1 && "👍 You liked this post!"}
        {userReaction === -1 && "👎 You disliked this post!"}
        {userReaction === 0 && "🤔 You haven't reacted yet."}
      </p>
    </div>
  );
};

export default App;
