import { useState, useEffect } from "react";
export const useLocalStorage = (initialState, key) => {
  const [value, setValue] = useState(() => {
    const watchedMovies = JSON.parse(localStorage.getItem(key));
    console.log(watchedMovies);
    return watchedMovies ? watchedMovies : initialState;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);
  return [value, setValue];
};
