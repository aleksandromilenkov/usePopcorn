import React, { useState } from "react";

const Search = ({ onSetQuerry, query }) => {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => onSetQuerry(e.target.value)}
    />
  );
};

export default Search;
