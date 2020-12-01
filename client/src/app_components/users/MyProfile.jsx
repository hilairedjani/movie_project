import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { getProfile } from "../../app_actions/users";
import Contributions from "../contributions/Contributions";
import EditProfileModal from "./EditProfileModal";

function MyProfile() {
  const { profile, loading } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile(user._id));
    return () => {};
  }, []);

  if (!loading && !profile) {
    return <h2>Profile not found</h2>;
  }

  if (loading && !profile) {
    return <h2>Loading...</h2>;
  }

  return (
    <Fragment>
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <div className="row">
            <div className="col-sm-3">
              <div className="card card-body text-center pb-2 px-2">
                <i className="fas fa-user-circle fa-5x"></i>
                <h3>{profile.username}</h3>
                <h6>
                  {profile.firstname} {profile.lastname}
                </h6>
                <h6>{profile.email}</h6>

                <h5>
                  {profile.role === "contributor" ? (
                    <span className="badge badge-pill badge-success p-2">
                      <i className="fas fa-clipboard"></i>&nbsp;&nbsp;
                      {profile.role}
                    </span>
                  ) : (
                    <span className="badge badge-pill badge-secondary p-2">
                      <i className="fas fa-clipboard"></i>&nbsp;&nbsp;
                      {profile.role}
                    </span>
                  )}
                </h5>

                {profile._id == user._id && (
                  <div className="text-right">
                    <button
                      type="button"
                      data-toggle="modal"
                      data-target="#edit-profile-modal"
                      className="btn btn-outline-primary text-center"
                      style={{ width: 40, height: 40, borderRadius: "50%" }}
                    >
                      <i className="fas fa-pencil-alt"></i>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="col">
              <nav>
                <div className="nav nav-tabs" role="tablist">
                  <a
                    className="nav-item nav-link active"
                    role="tab"
                    href="#contributions-tab-pane"
                    id="contributions-nav-tab"
                    data-toggle="tab"
                    aria-controls="contributions-tab-pane"
                    aria-selected="true"
                  >
                    Contributions
                  </a>

                  <a
                    className="nav-link nav-item"
                    role="tab"
                    href="#followers-tab-pane"
                    id="followers-nav-tab"
                    data-toggle="tab"
                    aria-controls="followers-tab-pane"
                    aria-selected="false"
                  >
                    Followers
                  </a>

                  <a
                    className="nav-link"
                    role="tab"
                    href="#following-tab-pane"
                    id="following-nav-tab"
                    data-toggle="tab"
                    aria-controls="following-tab-pane"
                    aria-selected="false"
                  >
                    Following
                  </a>

                  <a
                    className="nav-link"
                    role="tab"
                    href="#people-tab-pane"
                    id="people-nav-tab"
                    data-toggle="tab"
                    aria-controls="people-tab-pane"
                    aria-selected="false"
                  >
                    People
                  </a>
                </div>
              </nav>

              <div className="tab-content card card-body my-1">
                <div
                  className="tab-pane fade show active"
                  id="contributions-tab-pane"
                  role="tabpanel"
                >
                  <Contributions _user={user._id}></Contributions>
                </div>

                <div
                  className="tab-pane fade"
                  id="followers-tab-pane"
                  role="tabpanel"
                >
                  Foll...
                </div>

                <div
                  className="tab-pane fade"
                  id="following-tab-pane"
                  role="tabpanel"
                >
                  Following
                </div>

                <div
                  className="tab-pane fade"
                  id="people-tab-pane"
                  role="tabpanel"
                >
                  People
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      {profile._id == user._id && <EditProfileModal></EditProfileModal>}
    </Fragment>
  );
}

export default MyProfile;
