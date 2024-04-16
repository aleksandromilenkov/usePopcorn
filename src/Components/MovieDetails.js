import React, { useEffect, useState } from "react";
import StarRating from "../Utils/StarRating";
import Loader from "../Utils/Loader";
import Error from "../Utils/Error";

const MovieDetails = ({
  movieId,
  onCloseMovie,
  onMovieSetToWatched,
  watchedMovies,
  onMovieRemoveFromWatched,
}) => {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userRating, setUserRating] = useState(null);
  const isMovieSetToWatch = watchedMovies.some((w) => w.imdbID === movieId);
  const addToWatchedHandler = () => {
    const newWatchedMovie = {
      imdbID: movieId,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
      userRating: userRating,
      imdbRating: Number(movie.imdbRating),
      runtime: Number(movie.Runtime.split(" ")[0]),
    };
    if (isMovieSetToWatch) {
      onMovieRemoveFromWatched(movieId);
      onCloseMovie();
      return;
    }
    onMovieSetToWatched(newWatchedMovie);
    onCloseMovie();
  };
  const getStarsHandler = (stars) => {
    setUserRating(stars);
  };
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const resp = await fetch(
          `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_MY_API_KEY}&i=${movieId}`
        );
        const data = await resp.json();
        setMovie(data);
        isMovieSetToWatch &&
          setUserRating(
            watchedMovies.filter(
              (watchedMovie) => watchedMovie.imdbID === movieId
            )[0].userRating
          );
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieDetails();
  }, [movieId]);
  useEffect(() => {
    if (!movie?.Title) return;
    document.title = `Movie | ${movie?.Title}`;
    return () => {
      document.title = "usePopcorn";
    };
  }, [movie]);
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
        <div className="details-overview">
          <h2>{movie?.Title}</h2>
          <p>
            {movie?.Released} &bull; {movie?.Runtime}
          </p>
          <p>{movie?.Genre}</p>
          <p>
            <span>⭐</span>
            {movie?.imdbRating} IMDb raiting
          </p>
        </div>
      </header>
      <section>
        <div className="rating">
          {!isMovieSetToWatch ? (
            <StarRating maxRating={10} size={24} getStars={getStarsHandler} />
          ) : (
            <p>You rated this movie with {userRating} ⭐</p>
          )}
          {userRating && (
            <button className="btn-add" onClick={addToWatchedHandler}>
              {isMovieSetToWatch ? "Remove from Watched" : "Add to watched"}
            </button>
          )}
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
