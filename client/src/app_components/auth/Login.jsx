import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import alertify from "alertifyjs";

import LoginForm from "../generic/LoginForm";

const Login = () => {
  const { isAuthenticated, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error.length > 0) {
      alertify.error(error);
    }
  }, [error]);

  if (isAuthenticated) {
    return <Redirect to="/movies" />;
  }

  return (
    <div className="row">
      <div className="col-sm-6 col-md-4 offset-sm-3 offset-md-4">
        <div className="card card-body bg-dark">
          <h1 className="text-muted card-title">Login</h1>

          <hr />
          <LoginForm></LoginForm>
        </div>
      </div>
    </div>
  );
};

export default Login;
