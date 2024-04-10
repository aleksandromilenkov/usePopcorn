import React from "react";

const Movie = ({ movie, onMovieSelect }) => {
  const onMovieSelectHandler = (e) => {
    onMovieSelect(movie.imdbID);
  };
  return (
    <li key={movie.imdbID} onClick={onMovieSelectHandler}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
};

export default Movie;
