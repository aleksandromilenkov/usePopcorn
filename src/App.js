import { useState } from "react";
import Navbar from "./Components/Navbar";
import ListBox from "./Components/ListBox";
import WatchedMoviesBox from "./Components/WatchedMoviesBox";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="main">
        <ListBox />
        <WatchedMoviesBox />
      </main>
    </>
  );
}
