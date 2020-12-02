import React, { useEffect } from "react";
import { Provider as StoreProvider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import socketIOClient from "socket.io-client";

import "./App.css";
import "alertifyjs/build/css/alertify.css";
import Landing from "./app_components/generic/Landing";
import Navbar from "./app_components/generic/Navbar";
import Routes from "./app_components/routing/Routes";

import { setAuthHeader } from "./app_helpers";
import { setCurrentUser } from "./app_actions/auth";
import { getCurrentProfile } from "./app_actions/users";

import store from "./app_store";

// store.dispatch(setCurrentUser());

// Set auth header (i.e. x-auth-token)
const token = localStorage.getItem("x-auth-token");
if (token) setAuthHeader(token);

const App = () => {
  // // Authenticate a user
  // const authenticateUser = async () => {
  //     // Set current user
  //     await store.dispatch(setCurrentUser());
  // };

  // const appInit = async () => {
  //   await authenticateUser();
  // };

  useEffect(() => {
    const socket = socketIOClient("http://localhost:5000");
    socket.on("connect", () => console.log("== Client Socket connected"));

    // Fetch current user and profile
    store.dispatch(setCurrentUser());
    store.dispatch(getCurrentProfile());
  }, []);

  return (
    <StoreProvider store={store}>
      <Router>
        <Navbar></Navbar>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route component={Routes} />
        </Switch>
      </Router>
    </StoreProvider>
  );
};

export default App;
