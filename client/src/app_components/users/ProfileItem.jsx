import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { followUser, unfollowUser } from "../../app_actions/usersConnections";
import { isFollowingUser } from "../../app_helpers";

const ProfileItem = ({ profile }) => {
  const { currentProfile } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleFollowClick = () => dispatch(followUser(profile._id));

  const handleUnfollowClick = () => dispatch(unfollowUser(profile._id));

  return (
    <Link to={profile._id == user._id ? "/profile" : `/users/${profile._id}`}>
      <div className="card card-body text-center">
        <i className="fas fa-user-circle fa-5x"></i>
        <br />

        <h6 className="mb-0">{profile.username}</h6>
        <p className="mb-0">
          {profile.firstname} {profile.lastname}
        </p>

        <p className="text-muted">{profile.role}</p>
        {isFollowingUser(profile._id, currentProfile.following) ? (
          <button
            type="button"
            onClick={handleUnfollowClick}
            className="btn btn-outline-secondary btn-block"
          >
            Following
          </button>
        ) : (
          <button
            type="button"
            onClick={handleFollowClick}
            className="btn btn-primary btn-block"
          >
            Follow
          </button>
        )}
      </div>
    </Link>
  );
};

export default ProfileItem;
