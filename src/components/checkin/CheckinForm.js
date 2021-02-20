import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Input,
  Label,
  Segment,
  TextArea,
} from "semantic-ui-react";

import history from "../../history";

// Import ipcmain from electron to push db data
const { ipcRenderer } = require("electron");

class CheckinForm extends Component {
  componentWillUnmount() {
    document.body.style.backgroundColor = "#ffcccc00";
  }

  pushToDatabase() {
    let todayDate = new Date();
    console.log(todayDate.toLocaleDateString());
    let test = todayDate.toJSON();

    let db = {
      dbPath: "/guests/" + todayDate.toLocaleDateString().replaceAll("/", "-"),
      dbData: {
        timeStamp: {
          time: todayDate.toLocaleTimeString(),
          date: todayDate.toLocaleDateString(),
          isoStandardTime: todayDate.toISOString(),
        },

        fn: "Ole",
        mn: "Gunnar",
        ln: "Solskjær",
        arrivalDate: "20-02-2021",
        departureDate: "22-02-2021",
        cellphone: "291003101",
      },
    };

    console.log(db);

    ipcRenderer.on("pushToDatabase", (event, arg) => {
      console.log(event, arg); // prints if error. This is big bad
    });

    // ipcRenderer.send("pushToDatabase", db);
  }

  render() {
    // TESTING @TODO REMOVE
    this.pushToDatabase();

    // Style body to make it easier for the eyes
    // document.body.style.backgroundColor = "#d6d6d61a";
    document.body.style.backgroundColor = "#72797d14";

    let currentLanguage = localStorage.getItem("currentLanguage");

    let languageObject = {
      no: {
        description:
          "Felt markert med * er påkrevd. Telefonnummer vil bare bli brukt i nødstilfeller.",

        name: ["Fornavn", "Mellomnavn", "Etternavn"],
        dateName: ["Ankomst Dato", "Avreise Dato"],
        carAndCellphone: ["Bilregistreringsnummer", "Telefonnummer"],
        email: ["E-mail"],
        howDidYouFindUs: [
          "Hvordan fant du oss?",
          "Google, booking.com, bøker og reiseguider osv...",
        ],
        button: ["Registrer", "Avbryt"],
      },
      en: {
        description:
          "Fields marked with * are required. The telephone number will only be used in emergencies.",
        name: ["First Name", "Middle Name", "Last Name"],
        dateName: ["Arrival Date", "Departure Date"],
        carAndCellphone: ["Car Registration Number", "Telephone Number"],
        email: ["E-mail"],
        howDidYouFindUs: [
          "How did you find us?",
          "Google, Booking.com, travellings guides etc...",
        ],
        button: ["Register", "Cancel"],
      },
    };

    // get todays date for the form
    let date = new Date();
    let today = date.toJSON().split("T");

    // get date a week ago - guests can go back in time for their arrival
    date.setDate(date.getDate() - 7);
    let aWeekAgo = date.toJSON().split("T");

    date = new Date();
    date.setDate(date.getDate() + 1);
    let tomorrow = date.toJSON().split("T");

    function cancel() {
      history.push("/");
    }

    return (
      <div style={{ left: "10%", width: "80%", position: "absolute" }}>
        <Grid>
          <Grid.Row>
            <Grid.Column
              textAlign="center"
              verticalAlign="middle"
              style={{ fontSize: "20px", padding: "20px" }}
            >
              {languageObject[currentLanguage].description}
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Form>
          <Form.Group widths="equal">
            <Form.Field>
              <label>{languageObject[currentLanguage].name[0]} *</label>
              <Input
                fluid
                placeholder={languageObject[currentLanguage].name[0]}
                size="huge"
              />
            </Form.Field>
            <Form.Field>
              <label>{languageObject[currentLanguage].name[1]}</label>
              <Input
                fluid
                placeholder={languageObject[currentLanguage].name[1]}
                size="huge"
              />
            </Form.Field>
            <Form.Field>
              <label>{languageObject[currentLanguage].name[2]} *</label>
              <Input
                fluid
                placeholder={languageObject[currentLanguage].name[2]}
                size="huge"
              />
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field>
              <label>{languageObject[currentLanguage].dateName[0]} *</label>
              <Input
                fluid
                type="date"
                size="huge"
                min={aWeekAgo[0]}
                defaultValue={today[0]}
              ></Input>
            </Form.Field>
            <Form.Field>
              <label>{languageObject[currentLanguage].dateName[1]} *</label>
              <Input
                fluid
                type="date"
                size="huge"
                min={today[0]}
                defaultValue={tomorrow[0]}
              ></Input>
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field>
              <label>
                {languageObject[currentLanguage].carAndCellphone[0]}
              </label>
              <Input
                type="text"
                size="huge"
                placeholder={languageObject[currentLanguage].carAndCellphone[0]}
              ></Input>
            </Form.Field>
            <Form.Field>
              <label>
                {languageObject[currentLanguage].carAndCellphone[1]}
              </label>
              <Input
                type="text"
                size="huge"
                placeholder={languageObject[currentLanguage].carAndCellphone[1]}
              ></Input>
            </Form.Field>
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Field>
              <label>{languageObject[currentLanguage].email[0]}</label>
              <Input
                type="text"
                size="huge"
                placeholder={languageObject[currentLanguage].email[0]}
              ></Input>
            </Form.Field>
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Field>
              <label>
                {languageObject[currentLanguage].howDidYouFindUs[0]}
              </label>
              <TextArea
                type="text"
                size="huge"
                placeholder={languageObject[currentLanguage].howDidYouFindUs[1]}
                style={{ maxHeight: "200px", minHeight: "70px" }}
              ></TextArea>
            </Form.Field>
          </Form.Group>
          <Button.Group>
            <Button onClick={cancel}>
              {" "}
              {languageObject[currentLanguage].button[1]}
            </Button>
            <Button type="submit" positive>
              {languageObject[currentLanguage].button[0]}
            </Button>
          </Button.Group>
        </Form>
      </div>
    );
  }
}

export default CheckinForm;

// @TODO add:
//  Unit (tent, camper...)
//  Nationality
//  Max stay check (maybe 3 weeks max?)
//  Price calculator at the bottom
