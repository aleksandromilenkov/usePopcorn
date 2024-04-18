import React, { useState, useRef, useEffect } from "react";

const Search = ({ onSetQuerry, querry }) => {
  const searchInput = useRef(querry);
  useEffect(() => {
    const callback = (e) => {
      if (document.activeElement === searchInput.current) return;
      if (e.code === "Enter") {
        searchInput.current.focus();
        onSetQuerry("");
      }
    };
    document.addEventListener("keydown", callback);
    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [onSetQuerry]);
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
