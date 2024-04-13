import React from "react";
import WatchedMovie from "./WatchedMovie";

const WatchedMoviesList = ({ watched, onMovieRemoveFromWatched }) => {
  return (
    <ul className="list">
      {watched.map((movie, idx) => (
        <WatchedMovie
          key={idx}
          movie={movie}
          onMovieRemoveFromWatched={onMovieRemoveFromWatched}
        />
      ))}
    </ul>
  );
};

export default WatchedMoviesList;
