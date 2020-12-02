import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { getMovies } from "../../app_actions/movies";
import MovieSearchBar from "./MovieSearchBar";

const Movies = () => {
  const { movies } = useSelector((state) => state.movies);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovies());
  }, []);

  return (
    <div className="row">
      <div className="col-md-8 offset-md-2">
        <MovieSearchBar></MovieSearchBar>
        <div className="card-columns pt-2">
          {movies.map((movie) => {
            return (
              <div className="card" key={movie._id}>
                <img src={movie.image} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <Link
                    to={`/movies/${movie._id}`}
                    className="btn btn-primary float-right"
                  >
                    Go to Movie
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Movies;
