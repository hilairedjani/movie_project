import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import AddContribution from "../contributions/AddContribution";
import Movie from "../movies/Movie";
import Movies from "../movies/Movies";
import MyProfile from "../users/MyProfile";
import Profile from "../users/Profile";
import PrivateRoute from "./PrivateRoute";

function Routes() {
  return (
    <Switch>
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/movies" component={Movies} />
      <Route exact path="/movies/:_id" component={Movie} />
      <PrivateRoute exact path="/profile" component={MyProfile} />
      <PrivateRoute exact path="/users/:_id" component={Profile} />
      <PrivateRoute exact path="/addContribution" component={AddContribution} />
    </Switch>
  );
}

export default Routes;
