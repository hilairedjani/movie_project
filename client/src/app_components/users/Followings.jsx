import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getFollowings } from "../../app_actions/usersConnections";

const Followings = ({ _user }) => {
  const dispatch = useDispatch();
  const { loading, followings } = useSelector(
    (state) => state.usersConnections
  );

  useEffect(() => {
    // Fetch user followings
    dispatch(getFollowings(_user));
    return () => {};
  }, [_user]);

  if (loading) return <h3>Loading...</h3>;

  if (followings.length === 0)
    return (
      <Fragment>
        <h6>Not following any users</h6>
      </Fragment>
    );

  return (
    <Fragment>
      {followings.map((following) => (
        <Link to={`/users/${following._following._id}`} key={following._id}>
          <div className="card card-body mb-1 py-2">
            <div className="row" key={following._id}>
              <div className="col-auto">
                <i className="fas fa-user-circle fa-3x"></i>
              </div>

              <div className="col">
                <h6>{following._following.username}</h6>
                {following._following.firstname} {following._following.lastname}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </Fragment>
  );
};

export default Followings;
