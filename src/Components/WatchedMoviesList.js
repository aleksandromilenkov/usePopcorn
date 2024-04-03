import React from "react";
import WatchedMovie from "./WatchedMovie";

const WatchedMoviesList = ({ watched }) => {
  return (
    <ul className="list">
      {watched.map((movie, idx) => (
        <WatchedMovie key={idx} movie={movie} />
      ))}
    </ul>
  );
};

export default WatchedMoviesList;
