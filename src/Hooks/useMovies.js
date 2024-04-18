import { useState, useEffect } from "react";
export const useMovies = (querry, callback) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
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
    if (!querry?.length) {
      setMovies([]);
      setError(null);
      return;
    }
    fetchMovies();
    callback?.();
    return () => {
      controller.abort();
    };
  }, [querry, callback]);
  return [movies, isLoading, error];
};
