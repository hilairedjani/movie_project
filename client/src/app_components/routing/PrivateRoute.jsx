import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ path, component, ...rest }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  if (isAuthenticated == null) return <h1>Loading...</h1>;

  return !isAuthenticated && !loading ? (
    <Redirect to={"/"} />
  ) : (
    <Route exact path={path} component={component} {...rest} />
  );
};

export default PrivateRoute;
