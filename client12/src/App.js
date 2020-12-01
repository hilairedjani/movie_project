import React, { useEffect } from "react";
import { Provider as StoreProvider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Landing from "./app_components/generic/Landing";
import Routes from "./app_components/routing/Routes";

import store from "./app_store";

const App = () => {
  useEffect(() => {}, []);
  return (
    <StoreProvider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route component={Routes} />
        </Switch>
      </Router>
    </StoreProvider>
  );
};

export default App;
