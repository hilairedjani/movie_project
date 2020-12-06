import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { searchMovies } from "../../app_actions/movies";

const MovieSearchBar = () => {
  const [title, setTitle] = useState("");
  const { searchedMovies } = useSelector((state) => state.movies);

  const dispatch = useDispatch();

  const handleSearchMovies = (event) => {
    setTitle(event.target.value);

    if (title.length > 0) {
      dispatch(searchMovies(title));
    }
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col pb-1">
          <input
            className="form-control text-white bg-dark"
            type="search"
            placeholder="Enter movie title.."
            aria-label="Search"
            value={title}
            onChange={handleSearchMovies}
          />
        </div>
      </div>

      {title.length > 0 && (
        <div className="row">
          <div className="col">
            <div className="card card-body pb-0 bg-dark text-white">
              {searchedMovies.length <= 0 && <h6>No movies found</h6>}
              {searchedMovies.map((movie) => (
                <Fragment key={movie._id}>
                  <Link to={`/movies/${movie._id}`} className="h6">
                    {movie.title}
                  </Link>

                  <hr className="bg-muted" />
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default MovieSearchBar;
