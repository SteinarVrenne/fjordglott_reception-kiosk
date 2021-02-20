import React, { Component } from "react";
import {
  Button,
  Grid,
  Segment,
  Header,
  Advertisement,
  Card,
  Container,
} from "semantic-ui-react";

// import components
import LanguageFlag from "./LanguageFlag";

class Welcome extends Component {
  render() {
    return (
      <div>
        <Grid centered>
          <Grid.Row>
            <Grid.Column textAlign="center" verticalAlign="middle">
              <Segment
                style={{
                  height: "210px",
                  width: "50%",
                //   position: "relative",
                  left: "25%",
                }}
                // circular
                placeholder
              >
                [BILDE/LOGO] Fjordgløtt Camping
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ fontSize: "20px" }}>
            Welcome to Fjordgløtt Camping automated check-in system <br></br>
          </Grid.Row>
          <Grid.Row>
            Please choose a language by clicking the flags below
          </Grid.Row>
          <Grid.Row>
            <LanguageFlag></LanguageFlag>
          </Grid.Row>

          {/* <Grid.Row textAlign="center">
        <LanguageFlag></LanguageFlag>
      </Grid.Row>
      <Grid.Row textAlign="center">
        <div>pawdoapdoawdpawodpawdpawoda wapdoawpd oawd pawod pawd </div>
      </Grid.Row> */}
        </Grid>
      </div>
    );
  }
}

export default Welcome;
