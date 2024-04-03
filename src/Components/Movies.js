import React from "react";
import Movie from "./Movie";

const Movies = ({ movies }) => {
  return (
    <ul className="list">
      {movies?.map((movie, idx) => (
        <Movie movie={movie} key={idx} />
      ))}
    </ul>
  );
};

export default Movies;
