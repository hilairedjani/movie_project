import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getUserContributions } from "../../app_actions/contributions";

const Contributions = ({ _user }) => {
  const dispatch = useDispatch();
  const { loading, contributions } = useSelector(
    (state) => state.contributions
  );
  const { user } = useSelector((state) => state.auth);

  const addContributionButton =
    user && user._id == _user ? (
      <>
        <div className="row">
          <div className="col">
            <Link
              to="/addContribution"
              className="btn btn-primary btn-sm float-right"
            >
              Add Contribution
            </Link>
          </div>
        </div>

        <hr />
      </>
    ) : (
      ""
    );

  useEffect(() => {
    // Fetch user contributions
    dispatch(getUserContributions(_user));
    return () => {};
  }, [_user]);

  if (loading) return <h3>Loading...</h3>;

  if (!loading && contributions.length === 0)
    return (
      <Fragment>
        {addContributionButton}
        <h6>No contributions to display</h6>
      </Fragment>
    );

  return (
    <Fragment>
      {addContributionButton}
      {contributions.map((contribution) => (
        <Link
          to={
            contribution.type == "Movie"
              ? `/movies/${contribution._item._id}`
              : `/people/${contribution._item._id}`
          }
          key={contribution._id}
        >
          <div className="card card-body mb-1 p-2">
            <div className="row" key={contribution._id}>
              <div className="col-auto">
                {contribution.type == "Movie" ? (
                  <img
                    src={`${contribution._item.image}`}
                    alt={`${contribution._item.image}`}
                    className="img-fluid"
                    style={{
                      height: "50px",
                      width: "50px",
                      borderRadius: "50%",
                    }}
                  />
                ) : (
                  <i className="fas fa-user-circle fa-3x"></i>
                )}
              </div>
              <div className="col">
                <h6>
                  {contribution.type == "Movie"
                    ? contribution._item.title
                    : `${contribution._item.firstname} ${contribution._item.lastname}`}
                </h6>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </Fragment>
  );
};

export default Contributions;
