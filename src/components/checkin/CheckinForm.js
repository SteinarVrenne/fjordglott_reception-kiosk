import React, { Component } from "react";
import {
  Button,
  Dropdown,
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
  constructor() {
    super();

    // State
    this.state = {};

    // this.pushToDatabase = this.pushToDatabase.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = "#ffcccc00";
  }

  componentDidMount() {
    !this.state.arrivalDate
      ? (this.state.arrivalDate = this.arrivalDateInput.props.defaultValue)
      : this.state.arrivalDate;

    !this.state.departureDate
      ? (this.state.departureDate = this.departureDateInput.props.defaultValue)
      : this.state.departureDate;
  }

  pushToDatabase(dbGuest) {
    let todayDate = new Date();
    console.log(todayDate.toLocaleDateString());
    let test = todayDate.toJSON();

    let db = {
      dbPath:
        "/guests/" + todayDate.toLocaleDateString().replaceAll("/", "-") + "/TEST",
      dbData: {
        metadata: {
          timeStamp: {
            time: todayDate.toLocaleTimeString(),
            date: todayDate.toLocaleDateString(),
            isoStandardTime: todayDate.toISOString(),
          },
        },

        guestData: dbGuest,
      },
    };

    console.log(db);

    ipcRenderer.on("pushToDatabase", (event, arg) => {
      console.log(event, arg); // prints if error. This is big bad
    });

    ipcRenderer.send("pushToDatabase", db);
  }

  handleSubmit() {
    // Check if all required inputs are filled
    // @TODO

    let dbGuest = {
      firstName: this.state.fn,
      middleName: this.state.mn,
      lastName: this.state.ln,
      carRegNum: this.state.carRegNum,
      email: this.state.email,
      cellphoneNum: this.state.cellphoneNum,
      nationality: this.state.nationality,
      comment: this.state.comment,
      arrivalDate: this.state.arrivalDate,
      departureDate: this.state.departureDate,
      unitType: this.state.unitType,
    };

    // console.log(this.state, dbGuest);

    this.pushToDatabase(dbGuest);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  render() {
    // TESTING @TODO REMOVE
    // this.pushToDatabase();

    console.log(this.state);

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

    let countryOptions = [
      { key: "no", value: "no", flag: "no", text: "Norway" },
      { key: "de", value: "de", flag: "de", text: "Germany" },
      { key: "nl", value: "nl", flag: "nl", text: "Netherlands" },
      { key: "lu", value: "lu", flag: "lu", text: "Luxembourg" },
    ];

    // get todays date for the form
    let date = new Date();
    let today = date.toJSON().split("T");

    // get date a week ago - guests can go back in time for their arrival
    // Format it to fit into input standard values
    date.setDate(date.getDate() - 7);
    let aWeekAgo = date.toJSON().split("T");

    date = new Date();
    date.setDate(date.getDate() + 1);
    let tomorrow = date.toJSON().split("T");

    function cancel() {
      history.push("/");
    }

    const { nationality } = this.state;

    // Check if departure is before arrival
    // @TODO add to checkout checkycheck
    let departureBeforeArrival = false;
    this.state.departureDate < this.state.arrivalDate
      ? (departureBeforeArrival = true)
      : departureBeforeArrival;
    // console.log(this.state.departureDate < this.state.arrivalDate);

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

        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Field>
              <label>{languageObject[currentLanguage].name[0]} *</label>
              <Input
                fluid
                placeholder={languageObject[currentLanguage].name[0]}
                size="huge"
                onChange={this.handleInputChange}
                name="fn"
                required
              />
            </Form.Field>
            <Form.Field>
              <label>{languageObject[currentLanguage].name[1]}</label>
              <Input
                fluid
                placeholder={languageObject[currentLanguage].name[1]}
                size="huge"
                onChange={this.handleInputChange}
                name="mn"
              />
            </Form.Field>
            <Form.Field>
              <label>{languageObject[currentLanguage].name[2]} *</label>
              <Input
                fluid
                placeholder={languageObject[currentLanguage].name[2]}
                size="huge"
                onChange={this.handleInputChange}
                name="ln"
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
                onChange={this.handleInputChange}
                name="arrivalDate"
                ref={(arrivalDateInput) => {
                  this.arrivalDateInput = arrivalDateInput;
                }}
              ></Input>
            </Form.Field>
            <Form.Field>
              <label>{languageObject[currentLanguage].dateName[1]} *</label>
              <Input
                fluid
                type="date"
                size="huge"
                min={this.state.arrivalDate ? this.state.arrivalDate : today[0]}
                defaultValue={tomorrow[0]}
                onChange={this.handleInputChange}
                name="departureDate"
                ref={(departureDateInput) => {
                  this.departureDateInput = departureDateInput;
                }}
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
                onChange={this.handleInputChange}
                name="carRegNum"
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
                onChange={this.handleInputChange}
                name="cellphoneNum"
              ></Input>
            </Form.Field>
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Field>
              <label>{languageObject[currentLanguage].nationality}NAT * </label>
              <Dropdown
                // type="text"
                size="large"
                // placeholder={languageObject[currentLanguage].email[0]}
                onChange={(event, { value }) => {
                  this.setState({ nationality: value });
                }}
                name="unit"
                placeholder="Select Country"
                fluid
                search
                selection
                options={countryOptions}
                additionPosition="top"
                style={{ height: "53.17px" }}
                minCharacters={1}
                required
                value={nationality}
                // allowAdditions
                // onAddItem={(e) => {
                //   console.log(e);

                //   countryOptions.push({key:"custom"})
                // }}
              ></Dropdown>
            </Form.Field>

            <Form.Field>
              <label>{languageObject[currentLanguage].nationality}NAT * </label>
              <Dropdown
                // type="text"
                size="large"
                // placeholder={languageObject[currentLanguage].email[0]}
                onChange={(event, { value }) => {
                  this.setState({ nationality: value });
                }}
                name="nationality"
                placeholder="Select Country"
                fluid
                search
                selection
                options={countryOptions}
                additionPosition="top"
                style={{ height: "53.17px" }}
                minCharacters={1}
                required
                value={nationality}
                // allowAdditions
                // onAddItem={(e) => {
                //   console.log(e);

                //   countryOptions.push({key:"custom"})
                // }}
              ></Dropdown>
            </Form.Field>

            <Form.Field>
              <label>{languageObject[currentLanguage].email[0]}</label>
              <Input
                type="text"
                size="huge"
                placeholder={languageObject[currentLanguage].email[0]}
                onChange={this.handleInputChange}
                name="email"
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
                onChange={this.handleInputChange}
                name="comment"
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
