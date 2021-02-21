import React, { Component } from "react";
import { Route, HashRouter, Switch } from "react-router-dom";

// Import our components
import Welcome from "./components/welcomeScreen/Welcome";
import NotFound from "./components/NotFound";
import Checkin from "./components/checkin/CheckinForm";
import history from "./history";
import adminLogin from "./components/admin/adminLogin";

// Import ipcRenderer to reroute when admin command is entered
const { ipcRenderer } = require("electron");

class Routes extends Component {
  render() {
    ipcRenderer.on("/adminRouting", (event, message) => {
      history.push("/adminLogin");
    });

    return (
      <HashRouter>
        <Switch>
          <Route exact path="/">
            <Route component={Welcome} />
          </Route>
          <Route path="/checkin" component={Checkin} />
          <Route path="/adminLogin" component={adminLogin} />
          <Route component={NotFound}></Route>
        </Switch>
      </HashRouter>
    );
  }
}

export default Routes;
