import React from "react";
import { Switch, Route } from "react-router-dom";
import Movies from "../movies/Movies";
import Profile from "../users/Profile";
import PrivateRoute from "./PrivateRoute";

function Routes() {
  return (
    <div className="container-fluid">
      <Switch>
        <Route exact path="/movies" component={Movies} />
        <PrivateRoute exact path="/users/profile" component={Profile} />
      </Switch>
    </div>
  );
}

export default Routes;
