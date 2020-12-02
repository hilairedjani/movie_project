import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { getProfile } from "../../app_actions/users";
import Contributions from "../contributions/Contributions";
import PeopleConnections from "../peopleConnections/PeopleConnections";
import EditProfileModal from "./EditProfileModal";

function MyProfile() {
  const { currentProfile, loading } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile(user._id));
    return () => {};
  }, []);

  if (!loading && !currentProfile) {
    return <h2>Profile not found</h2>;
  }

  if (loading && !currentProfile) {
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
                <h3>{currentProfile.username}</h3>
                <h6>
                  {currentProfile.firstname} {currentProfile.lastname}
                </h6>
                <h6>{currentProfile.email}</h6>

                <h5>
                  {currentProfile.role === "contributor" ? (
                    <span className="badge badge-pill badge-success p-2">
                      <i className="fas fa-clipboard"></i>&nbsp;&nbsp;
                      {currentProfile.role}
                    </span>
                  ) : (
                    <span className="badge badge-pill badge-secondary p-2">
                      <i className="fas fa-clipboard"></i>&nbsp;&nbsp;
                      {currentProfile.role}
                    </span>
                  )}
                </h5>

                {currentProfile._id == user._id && (
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
                  {user.role == "contributor" && (
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
                  )}

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
                {user.role == "contributor" && (
                  <div
                    className="tab-pane fade show active"
                    id="contributions-tab-pane"
                    role="tabpanel"
                  >
                    <Contributions _user={currentProfile._id}></Contributions>
                  </div>
                )}

                <div
                  className={`tab-pane fade ${
                    user.role == "user" ? "show active" : ""
                  }`}
                  id="followers-tab-pane"
                  role="tabpanel"
                >
                  Followers
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
                  <PeopleConnections _user={currentProfile._id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EditProfileModal></EditProfileModal>
    </Fragment>
  );
}

export default MyProfile;
