import { useCallback, useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Main from "./Components/Main";
import Logo from "./Components/Logo";
import Search from "./Components/Search";
import NumResults from "./Components/NumResults";
import Movies from "./Components/Movies";
import Box from "./Components/Box";
import WatchedMoviesSummary from "./Components/WatchedMoviesSummary";
import WatchedMoviesList from "./Components/WatchedMoviesList";
import Loader from "./Utils/Loader";
import Error from "./Utils/Error";
import MovieDetails from "./Components/MovieDetails";
import { useMovies } from "./Hooks/useMovies";
import { useLocalStorage } from "./Hooks/useLocalStorage";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];
const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

export default function App() {
  const [watched, setWatched] = useLocalStorage([], "watchedMovies");
  const [querry, setQuerry] = useState();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const handleCloseMovie = useCallback(() => setSelectedMovie(null), []);
  const [movies, isLoading, error] = useMovies(querry, handleCloseMovie);
  const setQuerryHandler = (q) => {
    setQuerry(q);
    console.log(q);
  };

  const setMovieToWatchedHandler = (movie) => {
    if (watched.some((w) => w.imdbID === movie.imdbID)) {
      return;
    }
    setWatched((prevState) => [...prevState, movie]);
  };
  const removeMovieFromWatchedHandler = (movieId) => {
    setWatched((prevState) =>
      prevState.filter((movie) => movie.imdbID !== movieId)
    );
  };

  return (
    <>
      <Navbar>
        <Logo />
        <Search querry={querry} onSetQuerry={setQuerryHandler} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Error message={error} />
          ) : (
            <Movies
              movies={movies}
              onMovieSelect={(movieId) =>
                setSelectedMovie((prevState) =>
                  prevState === movieId ? null : movieId
                )
              }
            />
          )}
        </Box>
        <Box>
          {selectedMovie ? (
            <MovieDetails
              movieId={selectedMovie}
              onCloseMovie={handleCloseMovie}
              onMovieSetToWatched={setMovieToWatchedHandler}
              watchedMovies={watched}
              onMovieRemoveFromWatched={removeMovieFromWatchedHandler}
            />
          ) : (
            <>
              <WatchedMoviesSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onMovieRemoveFromWatched={removeMovieFromWatchedHandler}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
