import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getFollowers } from "../../app_actions/usersConnections";

const Followers = ({ _user }) => {
  const dispatch = useDispatch();
  const { loading, followers } = useSelector((state) => state.usersConnections);

  useEffect(() => {
    // Fetch user contributions
    dispatch(getFollowers(_user));
    return () => {};
  }, [_user]);

  if (loading) return <h3>Loading...</h3>;

  if (followers.length === 0)
    return (
      <Fragment>
        <h6>No followers</h6>
      </Fragment>
    );

  return (
    <Fragment>
      {followers.map((follower) => (
        <Link to={`/users/${follower._follower._id}`} key={follower._id}>
          <div className="card card-body mb-1 py-2">
            <div className="row" key={follower._id}>
              <div className="col-auto">
                <i className="fas fa-user-circle fa-3x"></i>
              </div>

              <div className="col">
                <h6>{follower._follower.username}</h6>
                {follower._follower.firstname} {follower._follower.lastname}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </Fragment>
  );
};

export default Followers;
