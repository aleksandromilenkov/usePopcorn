import React from "react";
import Movie from "./Movie";

const Movies = ({ movies, onMovieSelect, onMovieClose }) => {
  return (
    <ul className="list list-movies">
      {movies?.map((movie, idx) => (
        <Movie movie={movie} key={idx} onMovieSelect={onMovieSelect} />
      ))}
    </ul>
  );
};

export default Movies;
