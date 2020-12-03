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
  }, []);

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
        <Fragment key={follower._id}>
          <div className="row" key={follower._id}></div>

          <hr />
        </Fragment>
      ))}
    </Fragment>
  );
};

export default Followers;
