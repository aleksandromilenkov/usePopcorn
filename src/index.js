import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import StarRating from "./Utils/StarRating";
const Test = () => {
  const [movieStars, setMovieStars] = useState(0);
  return (
    <div>
      <StarRating maxRating={5} getStars={(stars) => setMovieStars(stars)} />
      <p>the movie is rated with: {movieStars}stars</p>
    </div>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating
      maxRating={5}
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
      defaultRating={3}
    />
    <Test />
  </React.StrictMode>
);
