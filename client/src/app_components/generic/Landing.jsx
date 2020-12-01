import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import { getPopularMovies } from "../../app_actions/movies";

const Landing = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const { popularMovies } = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPopularMovies());
  }, []);

  if (isAuthenticated) {
    return <Redirect to="/movies" />;
  }

  return (
    <div className="row">
      <div className="col-md-8 offset-md-2">
        <div className="row">
          <div className="col-md-10 offset-md-1">
            <form className="form-inline my-2 my-lg-0 p-0 w-100">
              <div className="row w-100">
                <div className="col">
                  <input
                    className="form-control mr-sm-2 bg-dark w-100"
                    type="search"
                    placeholder="Find a movie..."
                    aria-label="Search"
                  />
                </div>
                <div className="col-2">
                  <button
                    className="btn btn-warning my-2 my-sm-0 font-weight-bold btn-block"
                    type="submit"
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="row">
          <div className="col-md-10 offset-md-1 py-5">
            <div
              id="top-movies"
              className="carousel slide"
              data-ride="carousel"
            >
              <ol
                className="carousel-indicators"
                id="top-movies-carousel-indicators"
              ></ol>

              <div className="carousel-inner" id="top-movies-carousel-inner">
                {popularMovies.map((movie, index) => {
                  return (
                    <div
                      className={`carousel-item ${index == 0 ? "active" : ""}`}
                      key={movie._id}
                    >
                      <img
                        src={`${movie.image}`}
                        className="d-block w-100"
                        alt="..."
                      />{" "}
                      <div className="carousel-caption d-none d-md-block bg-dark">
                        {movie.title}
                      </div>
                    </div>
                  );
                })}
              </div>
              <a
                className="carousel-control-prev"
                href="#top-movies"
                role="button"
                data-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#top-movies"
                role="button"
                data-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
