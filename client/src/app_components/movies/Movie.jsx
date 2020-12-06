import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link, useHistory } from "react-router-dom";
import { getMovie, getMovies } from "../../app_actions/movies";
import AddReviewModal from "../reviews/AddReviewModal";
import ReviewedStars from "../reviews/ReviewedStars";
import ReviewItem from "../reviews/ReviewItem";
import ReviewModal from "../reviews/ReviewModal";

const Movie = () => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { _id } = useParams();
  const { movie, loading } = useSelector((state) => state.movies);
  const { currentProfile, loading: userLoading } = useSelector(
    (state) => state.users
  );

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getMovie(_id));
    return () => {};
  }, [_id]);

  if (loading || userLoading || !movie) {
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
            <div className="col-lg-10 offset-lg-1 py-5">
              <div className="row" style={{ background: "transparent" }}>
                <div className="col-md-4 col-lg-3">
                  <div className="card card-body p-0">
                    <img
                      src={movie.image}
                      alt={movie.title}
                      className="card-img"
                    />
                  </div>
                </div>

                <div className="col-md-8 col-lg-6">
                  <h3 className="text-muted">{movie.title}</h3>
                  <hr />

                  <div className="row">
                    <div className="col-3">
                      <h6>Score</h6>
                    </div>
                    <div className="col">
                      <ReviewedStars
                        value={
                          movie.totalReview == 0
                            ? 0
                            : Math.floor(movie.reviewAverage)
                        }
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-3">
                      <h6>Release Year</h6>
                    </div>
                    <div className="col">{movie.releaseYear}</div>
                  </div>

                  <div className="row">
                    <div className="col-3">
                      <h6>Rated</h6>
                    </div>
                    <div className="col">{movie.rating}</div>
                  </div>

                  <div className="row">
                    <div className="col-3">
                      <h6>Runtime</h6>
                    </div>
                    <div className="col">{movie.runtime}</div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <h6>Genres</h6>
                      {movie.genre.map((genre) => (
                        <span
                          key={genre}
                          className="badge badge-pill badge-light p-2 mr-1 mb-1"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            dispatch(
                              getMovies({ queryParams: `genre=${genre}` })
                            );
                            history.push("/movies");
                          }}
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col pt-3">
                      <h5 className="text-muted">Plot</h5>
                      <hr />
                      <p>{movie.plot}</p>
                    </div>
                  </div>

                  {currentProfile && currentProfile.role == "contributor" && (
                    <div className="row">
                      <div className="col text-right">
                        <Link to={`/movies/${movie._id}/edit`}>
                          <button
                            type="button"
                            className="btn btn-outline-primary text-center"
                            style={{
                              width: 40,
                              height: 40,
                              borderRadius: "50%",
                            }}
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row py-3">
        <div className="col-lg-6 col-md-12">
          <h5 className="text-white">Cast</h5>
          <hr className="bg-white" />

          <div className="row">
            {movie.directors.map((director) => (
              <div
                key={`${director._id}-director`}
                className="col-auto text-center text-white py-2"
              >
                <Link to={`/people/${director._id}`}>
                  <i className="fas fa-user-circle fa-5x"></i>
                  <br />
                  <small className="font-weight-bold">
                    {director.firstname} {director.lastname}
                  </small>
                  <br />
                  <small>{director.rank}</small>
                </Link>
              </div>
            ))}

            {movie.actors.map((actor) => (
              <div
                key={`${actor._id}-actor`}
                className="col-auto text-center text-white py-2"
              >
                <Link to={`/people/${actor._id}`}>
                  <i className="fas fa-user-circle fa-5x"></i>
                  <br />
                  <small className="font-weight-bold">
                    {actor.firstname} {actor.lastname}
                  </small>
                  <br />
                  <small>{actor.rank}</small>
                </Link>
              </div>
            ))}

            {movie.writers.map((writer) => (
              <div
                key={`${writer._id}-writer`}
                className="col-auto text-center text-white py-2"
              >
                <Link to={`/people/${writer._id}`}>
                  <i className="fas fa-user-circle fa-5x"></i>
                  <br />
                  <small className="font-weight-bold">
                    {writer.firstname} {writer.lastname}
                  </small>
                  <br />
                  <small>{writer.rank}</small>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <h5 className="text-white">Related Movies</h5>
          <hr className="bg-white" />
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

        <div className="col-lg-3 col-md-6">
          <h5 className="text-white">Reviews</h5>
          <hr className="bg-white" />

          {currentProfile && (
            <div className="row">
              <div className="col">
                <button
                  className="btn btn-primary btn-sm float-right"
                  type="button"
                  data-toggle="modal"
                  data-target="#add-review-modal"
                >
                  Add review
                </button>
              </div>
            </div>
          )}

          <hr />

          <AddReviewModal></AddReviewModal>

          <div className="row">
            <div className="col">
              {movie.reviews.map((review) => (
                <ReviewItem key={review._id} review={review} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <ReviewModal></ReviewModal>
    </Fragment>
  );
};

export default Movie;
