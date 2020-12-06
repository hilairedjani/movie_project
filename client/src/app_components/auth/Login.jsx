import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import alertify from "alertifyjs";

import LoginForm from "../generic/LoginForm";

const Login = () => {
  const { isAuthenticated, error } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Redirect to="/movies" />;
  }

  return (
    <div className="row">
      <div className="col-sm-6 col-lg-4 offset-sm-3 offset-lg-4">
        <h1 className="text-white card-title">Login</h1>

        {error.length > 0 && (
          <div className="card body bg-danger text-white">{error}</div>
        )}

        <div className="card card-body bg-dark">
          <LoginForm></LoginForm>
        </div>
      </div>
    </div>
  );
};

export default Login;
