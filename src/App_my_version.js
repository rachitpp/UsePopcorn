import { useState } from "react";

export default function App() {
  return (
    <main>
      <Navbar />
      <div className="main">
        <FirstBox />

        <SecondBox />
      </div>
    </main>
  );
}
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
function Navbar() {
  const [query, setQuery] = useState("");
  return (
    <nav className="nav-bar">
      <Logo />
      <Search query={query} setQuery={setQuery} />
      <NumResults />
    </nav>
  );
}
function Logo() {
  return (
    <div className="logo">
      <span>🍿</span> <h1>usePopcorn</h1>
    </div>
  );
}
function Search({ query, setQuery }) {
  return (
    <input
      type="text"
      placeholder="Search Movies"
      className="search"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
function NumResults() {
  return <p className="num-results">Found 3 results</p>;
}
function Button({ children, onClick }) {
  return (
    <button className="btn-toggle" onClick={onClick}>
      {children}
    </button>
  );
}
function FirstBox() {
  const [movies, setMovies] = useState(tempMovieData);
  const [btnState, setbtnState] = useState(true);
  function handleBtn() {
    setbtnState((btn) => !btn);
  }
  return (
    <div className="box">
      <Button onClick={handleBtn}>{btnState ? "–" : "+"}</Button>
      {btnState && <MovieList movieData={movies} />}
    </div>
  );
}
function MovieList({ movieData }) {
  return (
    <ul className="list">
      {" "}
      {movieData.map((movie) => (
        <>
          <Movie firstmovie={movie} key={`first-${movie.imdbID}`} />
        </>
      ))}
    </ul>
  );
}
function Movie({ firstmovie }) {
  return (
    <div>
      <li>
        <img src={firstmovie.Poster} alt={firstmovie.Title} />
        <h3>{firstmovie.Title}</h3>

        <p>
          <span>🗓️</span>
          <span>{firstmovie.Year}</span>
        </p>
      </li>
    </div>
  );
}
function SecondBox({ firstmovie }) {
  const [btnState, setbtnState] = useState(true);
  const [avgmovie, setAvgMovie] = useState(tempWatchedData);
  function handleBtn() {
    setbtnState((btn) => !btn);
  }
  return (
    <div className="box">
      <Button onClick={handleBtn}>{btnState ? "–" : "+"}</Button>
      {btnState && (
        <>
          <Summary />
          <WatchedMovie avgmovie={avgmovie} />
        </>
      )}
    </div>
  );
}
function WatchedMovie({ avgmovie }) {
  return (
    <ul className="list">
      {avgmovie.map((movie) => (
        <BoxSecond avgdata={movie} />
      ))}
    </ul>
  );
}
function Summary() {
  return (
    <div className="summary">
      <h2>Movies you Watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>2 movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>8.65</span>
        </p>
        <p>
          <span>🌟</span>
          <span>9.5</span>
        </p>
        <p>
          <span>⏳</span>
          <span>132 min</span>
        </p>
      </div>
    </div>
  );
}
function BoxSecond({ avgdata }) {
  return (
    <div>
      <li>
        <img src={avgdata.Poster} alt={avgdata.Title} />
        <h3>Inception</h3>
        <div>
          <p>
            <span>⭐️</span>
            <span>{avgdata.imdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{avgdata.userRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{avgdata.runtime}min</span>
          </p>
        </div>
      </li>
    </div>
  );
}
