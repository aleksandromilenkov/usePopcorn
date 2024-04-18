import React, { useState, useCallback, useRef, useEffect } from "react";
import { useKey } from "../Hooks/useKey";

const Search = ({ onSetQuerry, querry }) => {
  const searchInput = useRef(querry);
  const removeQuery = useCallback(() => {
    if (document.activeElement === searchInput.current) return;
    searchInput.current.focus();
    onSetQuerry("");
  }, [onSetQuerry]);
  useKey("Enter", removeQuery);

  return (
    <input
      className="search"
      ref={searchInput}
      type="text"
      placeholder="Search movies..."
      value={querry}
      onChange={(e) => onSetQuerry(e.target.value)}
    />
  );
};

export default Search;
