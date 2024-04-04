import React, { useEffect, useState } from "react";
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

const StarRating = ({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  className = "",
  messages = [],
  defaultRating = 0,
  getStars,
}) => {
  const [stars, setStars] = useState(defaultRating);
  const [hoveredStars, setHoveredStars] = useState(0);

  const setStarsHandler = (id) => {
    setStars(id + 1);
    getStars(id + 1);
  };
  const setHoveredStarsHandler = (id) => {
    setHoveredStars(id + 1);
  };
  const setHoveredOutStarsHandler = () => {
    setHoveredStars(0);
  };

  return (
    <div style={containerStyle} className={className}>
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
            color={color}
            size={size}
          />
        ))}
      </div>
      <p
        style={{
          lineHeight: "1",
          margin: 0,
          color: color,
          fontSize: `${size / 1.5}px`,
        }}
      >
        {messages.length === maxRating
          ? messages[hoveredStars ? hoveredStars - 1 : stars - 1]
          : hoveredStars || stars || ""}
      </p>
    </div>
  );
};

export default StarRating;
