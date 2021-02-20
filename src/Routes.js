import React, { Component } from "react";
import { Route, HashRouter, Switch } from "react-router-dom";

// Import our components
import Welcome from "./components/welcomeScreen/Welcome";
import NotFound from "./components/NotFound";
import Checkin from "./components/checkin/CheckinForm";

class Routes extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/">
            <Route component={Welcome} />
          </Route>
          <Route path="/checkin" component={Checkin} />
          <Route component={NotFound}></Route>
        </Switch>
      </HashRouter>
    );
  }
}

export default Routes;
