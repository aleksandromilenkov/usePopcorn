import React, { useState } from "react";
import Movies from "./Movies";

const ListBox = ({ movies }) => {
  const [isOpen1, setIsOpen1] = useState(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && <Movies movies={movies} />}
    </div>
  );
};

export default ListBox;
