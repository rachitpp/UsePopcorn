import { useEffect, useState } from "react";
import { WatchedMoviesList } from "./WatchedMoviesList";
import { WatchedSummary } from "./WatchedSummary";
import { Search } from "./Search";
import { MovieDetail } from "./MovieDetail";
import { NumResults } from "./NumResults";
import { Box } from "./Box";
import { MovieList } from "./MovieList";
import { NavBar, Main, ErrorMessage } from "./NavBar";
import { Loader } from "./Loader";
export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const key = "516bc283";
  useEffect(
    function () {
      const controller = new AbortController();
      async function FetchMovies() {
        if (query.length < 2) {
          setMovies([]);
          setError("");
          return;
        }
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${key}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");
          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");
          setMovies(data.Search);
        } catch (err) {
          if (err.name !== "AbortError") setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      FetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );
  function HandleMovieClick(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }
  function HandleCloseButton() {
    setSelectedId(null);
  }
  function HandleAddWatched(movie) {
    setWatched((movies) => [...movies, movie]);
  }
  function HandleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }
  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} isLoading={isLoading} isError={isError} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !isError && (
            <MovieList movies={movies} handleClick={HandleMovieClick} />
          )}
          {isError && <ErrorMessage message={isError} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetail
              selectedId={selectedId}
              handleClose={HandleCloseButton}
              key={selectedId}
              handleWatched={HandleAddWatched}
              watchedArray={watched}
              HandleDelete={HandleDeleteWatched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                handleDelete={HandleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
