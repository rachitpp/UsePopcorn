import { useState, useEffect } from "react";
import { Loader } from "./Loader";
import StarRating from "./StarRating";

export function MovieDetail({
  selectedId,
  handleClose,
  handleWatched,
  key,
  watchedArray,
  HandleDelete,
}) {
  const [movieDetail, setMovieDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  const Key = "516bc283";

  // Check if movie is already in watched list
  const isWatched = watchedArray?.some((movie) => movie.imdbID === selectedId);
  const watchedUserRating = watchedArray?.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  useEffect(
    function () {
      async function GetMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${Key}&i=${selectedId}`
        );
        const data = await res.json();
        setMovieDetail(data);
        setIsLoading(false);
      }
      GetMovieDetails();
    },
    [selectedId]
  );

  const runtimeNum = parseInt(movieDetail.Runtime);

  function HandleButtonAdd() {
    if (!userRating) return;

    const newWatchedArray = {
      imdbID: selectedId,
      poster: movieDetail.Poster,
      title: movieDetail.Title,
      year: movieDetail.Released,
      userRating: userRating,
      imdbRating: Number(movieDetail.imdbRating),
      runTime: runtimeNum,
    };
    handleWatched(newWatchedArray);
    handleClose();
  }
  useEffect(
    function () {
      if (!movieDetail.Title) return;
      document.title = `Movie | ${movieDetail.Title}`;
      return function () {
        document.title = "UsePopcorn";
      };
    },
    [movieDetail.Title]
  );

  useEffect(function () {
    function callback(e) {
      if (e.code === "Escape") handleClose();
    }
    document.addEventListener("keydown", callback);
    return function () {
      document.removeEventListener("keydown", callback);
    };
  });
  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button onClick={handleClose} className="btn-back">
              &larr;
            </button>
            <img src={movieDetail.Poster} alt={movieDetail.Title} />
            <div className="details-overview">
              <h2>{movieDetail.Title}</h2>
              <p>
                {movieDetail.Released} &bull; {movieDetail.Runtime}
              </p>
              <p>{movieDetail.Genre}</p>
              <p>
                <span>⭐️</span>
                {movieDetail.imdbRating}
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={HandleButtonAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p className="rating-watched">
                  You rated this movie {watchedUserRating} ⭐️
                </p>
              )}
            </div>

            <p>
              <em>{movieDetail.Plot}</em>
            </p>
            <p>Starring {movieDetail.Actors}</p>
            <p>
              Directed By -{" "}
              <span style={{ fontWeight: "bold" }}>{movieDetail.Director}</span>
            </p>
          </section>
        </>
      )}
    </div>
  );
}
