import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  followPerson,
  unfollowPerson,
} from "../../app_actions/peopleConnections";
import { isFollowingPerson } from "../../app_helpers";

const PersonItem = ({ person }) => {
  const { currentProfile } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleFollowClick = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    dispatch(followPerson(person._id));
  };

  const handleUnfollowClick = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    dispatch(unfollowPerson(person._id));
  };

  return (
    <div className="card card-body text-center">
      <Link to={`/people/${person._id}`}>
        <i className="fas fa-user-circle fa-5x"></i>
        <br />
        <h6 className="mb-0">
          {person.firstname} {person.lastname}
        </h6>

        <p className="text-muted">{person.rank}</p>
      </Link>
      {isFollowingPerson(person._id, currentProfile.people) ? (
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
  );
};

export default PersonItem;
