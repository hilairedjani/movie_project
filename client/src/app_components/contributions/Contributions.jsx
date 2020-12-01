import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { getUserContributions } from "../../app_actions/contributions";

const Contributions = ({ _user }) => {
  const dispatch = useDispatch();
  const { loading, contributions } = useSelector(
    (state) => state.contributions
  );
  useEffect(() => {
    // Fetch user contributions
    dispatch(getUserContributions(_user));
    return () => {};
  }, []);

  if (loading) return <h3>Loading...</h3>;

  if (contributions.length === 0)
    return (
      <Fragment>
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
        <h6>No contributions to display</h6>
      </Fragment>
    );

  return (
    <Fragment>
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
      {contributions.map((contribution) => (
        <Fragment key={contribution._id}>
          <div className="row" key={contribution._id}>
            <div className="col-12">{contribution.type}</div>
          </div>

          <hr />
        </Fragment>
      ))}
    </Fragment>
  );
};

export default Contributions;
