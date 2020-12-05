import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getPerson } from "../../app_actions/people";
import MovieItem from "../movies/MovieItem";

const PersonProfile = () => {
  const { person, loading } = useSelector((state) => state.people);
  const dispatch = useDispatch();
  const { _id } = useParams();

  useEffect(() => {
    dispatch(getPerson(_id));
    return () => {};
  }, [_id]);

  if (loading) return <h1>Loading...</h1>;

  if (!person) return <h1>Could not find person</h1>;

  return (
    <Fragment>
      <div className="row">
        <div className="col-lg-10 offset-lg-1">
          <div className="row">
            <div className="col-sm-3">
              <div className="card card-body text-center pb-2 px-2">
                <i className="fas fa-user-circle fa-5x"></i>
                <h5>
                  {person.firstname} {person.lastname}
                </h5>
                <h6>
                  <span className="badge badge-pill badge-secondary p-2">
                    <i className="fas fa-id-badge"></i>&nbsp;&nbsp;
                    {person.rank}
                  </span>
                </h6>
              </div>
            </div>

            <div className="col">
              <nav>
                <div className="nav nav-tabs" role="tablist">
                  <a
                    className="nav-item nav-link active"
                    role="tab"
                    href="#movies-tab-pane"
                    id="movies-nav-tab"
                    data-toggle="tab"
                    aria-controls="movies-tab-pane"
                    aria-selected="true"
                  >
                    Movies
                  </a>

                  <a
                    className={`nav-link nav-item`}
                    role="tab"
                    href="#collaborators-tab-pane"
                    id="collaborators-nav-tab"
                    data-toggle="tab"
                    aria-controls="collaborators-tab-pane"
                    aria-selected="false"
                  >
                    Frequent Collaborators
                  </a>
                </div>
              </nav>

              <div className="tab-content my-1">
                <div
                  className="tab-pane fade show active"
                  id="movies-tab-pane"
                  role="tabpanel"
                >
                  <div className="row">
                    {person.movies.map((movie) => (
                      <div key={movie._id} className="col-md-4 col-lg-3">
                        <MovieItem movie={movie} />
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className={`tab-pane fade`}
                  id="collaborators-tab-pane"
                  role="tabpanel"
                >
                  <div className="row">
                    {person.frequentCollaborators.map((collaborator) => (
                      <div
                        key={collaborator._id}
                        className="col-auto text-center text-white py-2"
                      >
                        <Link to={`/people/${collaborator._id}`}>
                          <i className="fas fa-user-circle fa-5x"></i>
                          <h6>
                            {collaborator.firstname} {collaborator.lastname}
                          </h6>
                          <span>{collaborator.rank}</span>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PersonProfile;
