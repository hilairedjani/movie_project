import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { getMovies } from "../../app_actions/movies";
import MovieSearchBar from "./MovieSearchBar";

const ratingsList = ["G", "PG", "A", "14A", "R", "18A"];
const genresList = ["Action", "Adventure", "Animation", "Comedy"];
const minRatingsList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Movies = () => {
  const [genres, setGenres] = useState([...genresList]);
  const [ratings, setRatings] = useState([...ratingsList]);
  const [yearFilterInput, setYearFilterInput] = useState("2020");
  const [minRatings, setMinRatings] = useState([...minRatingsList]);
  const [minRatingFilterInput, setMinRatingFilterInput] = useState(7);

  const { movies, loading } = useSelector((state) => state.movies);

  const dispatch = useDispatch();

  useEffect(() => {
    if (movies.length <= 0) dispatch(getMovies({}));
  }, []);

  return (
    <div className="row">
      <div className="col-12 col-lg-2">
        <h5 className="text-white">Filters</h5>

        <div className="accordion" id="filters">
          <div className="card">
            <div className="card-header">
              <a
                className=" h6"
                href="#genres-filter"
                data-toggle="collapse"
                data-target="#genres-filter"
                aria-expanded="true"
                aria-controls="genres-filter"
              >
                Genre
              </a>
            </div>

            <div
              id="genres-filter"
              className="collapse show"
              data-parent="#filters"
            >
              <div className="card-body p-1">
                {genres.map((genre) => (
                  <span
                    key={genre}
                    className="badge badge-pill badge-secondary p-2 mr-1 mb-1"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      dispatch(getMovies({ queryParams: `genre=${genre}` }))
                    }
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <a
                className=" h6"
                href="#year-filter"
                data-toggle="collapse"
                data-target="#year-filter"
                aria-expanded="false"
                aria-controls="year-filter"
              >
                Year
              </a>
            </div>

            <div id="year-filter" className="collapse" data-parent="#filters">
              <div className="card-body p-1">
                <div className="row">
                  <div className="col">
                    <input
                      type="number"
                      id="yearFilterInput"
                      name="yearFilterInput"
                      min="1900"
                      max="2025"
                      value={yearFilterInput}
                      onChange={(e) => setYearFilterInput(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="col-auto">
                    <button
                      type="button"
                      className="btn btn-block btn-secondary"
                      onClick={() => {
                        if (yearFilterInput.length == 4)
                          dispatch(
                            getMovies({
                              queryParams: `releaseYear=${yearFilterInput}`,
                            })
                          );
                      }}
                    >
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <a
                className=" h6"
                href="#ratings-filter"
                data-toggle="collapse"
                data-target="#ratings-filter"
                aria-expanded="false"
                aria-controls="ratings-filter"
              >
                Rating
              </a>
            </div>

            <div
              id="ratings-filter"
              className="collapse"
              data-parent="#filters"
            >
              <div className="card-body p-1">
                {ratings.map((rating) => (
                  <span
                    key={rating}
                    className="badge badge-pill badge-secondary p-2 mr-1 mb-1"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      dispatch(getMovies({ queryParams: `rating=${rating}` }))
                    }
                  >
                    {rating}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <a
                className=" h6"
                href="#min-rating-filter"
                data-toggle="collapse"
                data-target="#min-rating-filter"
                aria-expanded="false"
                aria-controls="min-rating-filter"
              >
                Score
              </a>
            </div>

            <div
              id="min-rating-filter"
              className="collapse"
              data-parent="#filters"
            >
              <div className="card-body p-1">
                <div className="row">
                  <div className="col">
                    <select
                      className="custom-select custom-select-lg mb-3 app-input"
                      id="minRating"
                      name="minRating"
                      onChange={(e) => {
                        setMinRatingFilterInput(e.target.value);
                      }}
                      value={minRatingFilterInput}
                    >
                      {minRatings.map((minRAting) => (
                        <option key={minRAting} value={minRAting}>
                          {minRAting}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-auto">
                    <button
                      type="button"
                      className="btn btn-block btn-secondary"
                      onClick={() => {
                        dispatch(
                          getMovies({
                            queryParams: `minRating=${minRatingFilterInput}`,
                          })
                        );
                      }}
                    >
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-8 col-12">
        <MovieSearchBar></MovieSearchBar>
        {!loading && movies.length <= 0 && (
          <h2 className=" py-3 text-white">No movies found...</h2>
        )}
        <div className="card-columns pt-2">
          {movies.map((movie) => {
            return (
              <Link to={`/movies/${movie._id}`} key={movie._id}>
                <div className="card card-body p-0">
                  <img
                    src={movie.image}
                    className="card-img"
                    alt={`${movie.title}`}
                  />

                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      width: "100%",
                      backgroundColor: "rgb(0, 0, 0, 0.75)",
                    }}
                  >
                    <h5 className="text-center text-white py-2">
                      {movie.title}
                    </h5>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Movies;
