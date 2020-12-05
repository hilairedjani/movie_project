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
      <div className="col-lg-8 col-md-10 offset-md-1 offset-lg-2">
        <MovieSearchBar></MovieSearchBar>
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
