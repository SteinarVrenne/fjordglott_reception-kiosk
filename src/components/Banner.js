import React, { Component } from "react";
import { Button, Grid, Header, Rail, Segment } from "semantic-ui-react";

class Banner extends Component {
  render() {
    return (
      <Segment>
        <Grid>
          <Grid.Column textAlign="left">
            <Header as="h1" style={{ fontSize: "350%" }}>
              [BILDE/LOGO] Fjordgløtt Camping
            </Header>
            <Rail internal position="right">
              {/* @TODO add functionality, with webFrame.setZoomLevel and most likely IPC */}
              <Button.Group size="huge">
                <Button icon="zoom-out"></Button>
                {/* <Button positive disabled>
                  ZOOM
                </Button> */}
                <Button icon="zoom-in"></Button>
              </Button.Group>
            </Rail>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

export default Banner;
