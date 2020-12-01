import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import RegisterForm from "../generic/RegisterForm";

const Register = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Redirect to="/movies" />;
  }

  return (
    <div className="row">
      <div className="col-sm-6 col-md-4 offset-sm-3 offset-md-4">
        <div className="card card-body bg-dark">
          <h1 className="text-muted card-title">Register</h1>

          <hr />

          <RegisterForm></RegisterForm>
        </div>
      </div>
    </div>
  );
};

export default Register;
