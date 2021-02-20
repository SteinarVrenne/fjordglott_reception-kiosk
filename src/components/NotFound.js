import React, { Component } from "react";
import history from "../history";

class NotFound extends Component {
  render() {
    setTimeout(() => {
      history.push("/");
    }, 5000);

    return (
      <div>
        404 Page Not Found
        <br></br><br></br><br></br>
        Sending you back to the menu in 5 seconds.
      </div>
    );
  }
}

export default NotFound;
