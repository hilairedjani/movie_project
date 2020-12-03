import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfiles } from "../../app_actions/users";
import ProfileItem from "./ProfileItem";

const Profiles = () => {
  const dispatch = useDispatch();

  const { profiles, loading } = useSelector((state) => state.users);
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    // Fetch profiles
    dispatch(getProfiles());
    return () => {};
  }, []);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <h4 className="text-white">Users</h4>

        <hr className="text-muted" />

        <div className="card-columns">
          {profiles.map((profile) => (
            <Fragment key={profile._id}>
              {profile._id != currentUser._id && (
                <ProfileItem profile={profile}></ProfileItem>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profiles;
