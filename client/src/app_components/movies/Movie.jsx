import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getMovie } from "../../app_actions/movies";

const Movie = () => {
  const { _id } = useParams();
  const { movie, loading } = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovie(_id));
    return () => {};
  }, [_id]);

  if (loading || !movie) {
    return <h1>Loading...</h1>;
  }

  return (
    <Fragment>
      <div
        className="row text-white"
        style={{
          background:
            "linear-gradient(to bottom right, rgba(89.02%, 89.02%, 89.02%, 1.00), rgba(100.00%, 100.00%, 100.00%, 1.00))",
          backgroundPosition: "right 0 top",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${movie.image})`,
        }}
      >
        <div className="col-12">
          <div
            className="row"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(11.76%, 18.43%, 23.53%, 1.00) 150px, rgba(18.82%, 25.49%, 30.59%, 0.84) 100%)",
            }}
          >
            <div className="col-md-10 offset-md-1 py-5">
              <div className="row" style={{ background: "transparent" }}>
                <div className="col-3">
                  <div className="card card-body p-0">
                    <img
                      src={movie.image}
                      alt={movie.title}
                      className="card-img"
                    />
                  </div>
                </div>

                <div className="col-6">
                  <h4 className="text-muted">{movie.title}</h4>
                  <hr />

                  <div className="row">
                    <div className="col-4 font-weight-bold">Realease Year</div>
                    <div className="col">{movie.releaseYear}</div>
                  </div>

                  <div className="row">
                    <div className="col-4 font-weight-bold">Rated</div>
                    <div className="col">{movie.rating}</div>
                  </div>

                  <div className="row">
                    <div className="col-4 font-weight-bold">Runtime</div>
                    <div className="col">{movie.runtime}</div>
                  </div>

                  <div className="row">
                    <div className="col pt-3">
                      <h5 className="text-muted">Plot</h5>
                      <hr />
                      <p>{movie.plot}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row py-3">
        <div className="col-5">
          <h3>Cast</h3>
          <hr />

          <div className="row">
            <div className="col-12">
              {movie.actors.map((actor) => (
                <div key={actor.firstname} className="text-white">
                  <i className="fas fa-user-circle fa-5x"></i>
                  {actor.firstname}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-3">
          <h5>Reviews</h5>
          <hr />
        </div>

        <div className="col-4">
          <h5 className="text-white">Related Movies</h5>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            {movie.relatedMovies.map((rmovie) => (
              <Link key={rmovie._id} to={`/movies/${rmovie._id}`}>
                <div className="card card-body p-0 m-1">
                  <img
                    src={rmovie.image}
                    alt={rmovie.title}
                    className="card-img h-100"
                  />
                </div>
              </Link>
            ))}
          </div>
          <hr />
        </div>
      </div>
    </Fragment>
  );
};

export default Movie;
