import React from "react";

const MovieDetails = ({ movieId, onCloseMovie }) => {
  return (
    <div className="details">
      <button className="btn-black" onClick={onCloseMovie}>
        &larr;
      </button>
      {movieId}
    </div>
  );
};

export default MovieDetails;
