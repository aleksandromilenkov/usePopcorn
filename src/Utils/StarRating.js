import React, { useState } from "react";
import Star from "./Star";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
};

const textStyle = {
  lineHeight: "1",
  margin: 0,
};

const StarRating = ({ maxRating = 5 }) => {
  const [stars, setStars] = useState(0);
  const [hoveredStars, setHoveredStars] = useState(0);
  const setStarsHandler = (id) => {
    setStars(id + 1);
  };
  const setHoveredStarsHandler = (id) => {
    setHoveredStars(id + 1);
  };
  const setHoveredOutStarsHandler = () => {
    setHoveredStars(0);
  };
  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, idx) => (
          <Star
            key={idx}
            id={idx}
            stars={stars}
            isFill={hoveredStars ? hoveredStars >= idx + 1 : stars >= idx + 1}
            onClickHandler={setStarsHandler}
            onHoverIn={setHoveredStarsHandler}
            onHoverOut={setHoveredOutStarsHandler}
          />
        ))}
      </div>
      <p style={textStyle}>{hoveredStars || stars || ""}</p>
    </div>
  );
};

export default StarRating;
