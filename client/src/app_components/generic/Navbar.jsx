import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../app_actions/auth";

const Navbar = () => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const nauthLinks = (
    <div className="col-auto mt-auto text-muted">
      <Link to="/register" className="font-weight-bold">
        Register
      </Link>
      <span className="text-muted"> | </span>
      <Link to="/login" className="font-weight-bold">
        Login
      </Link>
    </div>
  );

  const authLinks = (
    <div className="col-auto mt-auto">
      <Link to={`/movies`} className="font-weight-bold h6 text-muted">
        <i className="fas fa-video"></i> Movies
      </Link>
      <span className="text-muted"> | </span>

      <Link to={`/people`} className="font-weight-bold h6 text-muted">
        <i className="fas fa-universal-access"></i> People
      </Link>
      <span className="text-muted"> | </span>

      <Link to={`/profiles`} className="font-weight-bold h6 text-muted">
        <i className="fas fa-users"></i> Profiles
      </Link>
      <span className="text-muted"> | </span>

      <Link to={`/profile`} className="font-weight-bold h6 text-muted">
        <i className="fas fa-user-circle"></i> My Profile
      </Link>
      <span className="text-muted"> | </span>
      <Link
        onClick={() => dispatch(logout())}
        to="/"
        className="font-weight-bold h6 text-muted"
      >
        <i className="fas fa-sign-out-alt"></i> Logout
      </Link>
    </div>
  );
  return (
    <div className="row">
      <div className="col-12 pt-2">
        <div className="row">
          <div className="col">
            <Link to="/" className="font-weight-bold h1 text-white">
              <i className="fas fa-film"></i>&nbsp;Movies 55
            </Link>
          </div>

          {!loading ? (isAuthenticated ? authLinks : nauthLinks) : ""}
        </div>
        <hr className="bg-white" />
      </div>
    </div>
  );
};

export default Navbar;
