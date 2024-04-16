import { useEffect, useState } from "react";
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
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [querry, setQuerry] = useState("interstellar");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const setQuerryHandler = (q) => {
    setQuerry(q);
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
  const handleCloseMovie = () => {
    setSelectedMovie(null);
  };
  useEffect(() => {
    const controller = new AbortController(); // this is js api just like fetch
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const resp = await fetch(
          `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_MY_API_KEY}&s=${querry}`,
          {
            signal: controller.signal,
          }
        );
        if (!resp.ok) {
          throw new Error("Something went wrong");
        }
        const data = await resp.json();
        if (data.Response === "False") {
          throw new Error("Movie not found!");
        }
        setMovies(data.Search);
        console.log(data.Search);
        setError(null);
      } catch (err) {
        console.log(err);
        if (
          err?.message ===
          "_Utils_Error__WEBPACK_IMPORTED_MODULE_11__.default is not a constructor"
        ) {
          setError("Movie not found");
          return;
        }
        if (err === "AbortError") {
          return;
        }
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (!querry.length) {
      setMovies([]);
      setError(null);
      return;
    }
    fetchMovies();
    handleCloseMovie();
    return () => {
      controller.abort();
    };
  }, [querry]);

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
