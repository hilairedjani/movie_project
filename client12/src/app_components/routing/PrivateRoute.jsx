import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { RootState } from "../../app_reducers";

const PrivateRoute = ({ path, component, ...rest }) => {
  const { isAuthenticated, loading } = useSelector(
    (state: RootState) => state.auth
  );

  return isAuthenticated ? (
    <Route exact path={path} component={component} {...rest} />
  ) : (
    <Redirect to={"/"} />
  );
};

export default PrivateRoute;
