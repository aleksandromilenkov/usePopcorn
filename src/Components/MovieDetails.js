import React, { useEffect, useState } from "react";
import StarRating from "../Utils/StarRating";
import Loader from "../Utils/Loader";
import Error from "../Utils/Error";

const MovieDetails = ({ movieId, onCloseMovie }) => {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const resp = await fetch(
          `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_MY_API_KEY}&i=${movieId}`
        );
        const data = await resp.json();
        console.log(data);
        setMovie(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieDetails();
  }, [movieId]);
  return isLoading ? (
    <Loader />
  ) : error ? (
    <Error message={error} />
  ) : (
    <div className="details">
      <header>
        <button className="btn-black" onClick={onCloseMovie}>
          &larr;
        </button>
        <img src={movie?.Poster} alt="movie poster" />
        <div class="details-overview">
          <h2>{movie?.Title}</h2>
          <p>
            {movie?.Released} &bull; {movie?.Runtime}
          </p>
          <p>{movie?.Genre}</p>
          <p>
            <span>⭐</span>
            {movie?.ImdbRaiting} IMDb raiting
          </p>
        </div>
      </header>
      <section>
        <div class="rating">
          <StarRating maxRating={10} size={24} />
        </div>
        <p>
          <em>{movie?.Plot}</em>
        </p>
        <p>Starring {movie?.Actors}</p>
        <p>Directed by {movie?.Director}</p>
      </section>
    </div>
  );
};

export default MovieDetails;
