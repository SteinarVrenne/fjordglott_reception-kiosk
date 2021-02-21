import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";

class adminLogin extends Component {
  componentDidMount() {
    this.timer = setTimeout(() => {
      console.log("Admin login timed out");

      this.aRef.click();
    }, 2 * 60 * 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    return (
      <div>
        <Grid
          textAlign="center"
          style={{ height: "50vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              Administrator login
            </Header>
            <Form size="large">
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Brukernavn"
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Passord"
                  type="password"
                />

                <Button color="teal" fluid size="large">
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              Got here by accident?{" "}
              <a href="#" ref={(a) => (this.aRef = a)}>
                Click here to return
              </a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default adminLogin;
