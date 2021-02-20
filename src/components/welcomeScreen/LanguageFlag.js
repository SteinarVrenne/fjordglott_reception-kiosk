import React, { Component } from "react";
import { Card, Segment, Image } from "semantic-ui-react";
import history from "../../history";

// import images
import norwegianFlag from "../../images/norwegian_flag.png";
import englishFlag from "../../images/english_flag.png";
import germanFlag from "../../images/german_flag.png";
import dutchFlag from "../../images/dutch_flag.png";
import frenchFlag from "../../images/french_flag.png";

class LanguageFlag extends Component {
  render() {
    let flagStyle = {
      width: "262px",
      height: "160px",
    };

    function handleClick(e) {
      localStorage.setItem("currentLanguage", e.currentTarget.id);
      history.push("/checkin");
    }

    return (
      <div style={{ paddingTop: "20px" }}>
        <Segment stacked placeholder>
          <Card.Group>
            <Card onClick={handleClick} id="no">
              <Card.Content>
                <Image src={norwegianFlag} style={flagStyle}></Image>
                <Card.Description>Norwegian</Card.Description>
              </Card.Content>
            </Card>
            <Card onClick={handleClick} id="en">
              <Card.Content>
                <Image src={englishFlag} style={flagStyle}></Image>
                <Card.Description>English</Card.Description>
              </Card.Content>
            </Card>
            {/* <Card onClick={handleClick} id="de">
              <Card.Content>
                <Image src={germanFlag} style={flagStyle}></Image>
                <Card.Description>German</Card.Description>
              </Card.Content>
            </Card>
            <Card onClick={handleClick} id="du">
              <Card.Content>
                <Image src={dutchFlag} style={flagStyle}></Image>
                <Card.Description>Dutch</Card.Description>
              </Card.Content>
            </Card>
            <Card onClick={handleClick} id="fr">
              <Card.Content>
                <Image src={frenchFlag} style={flagStyle}></Image>
                <Card.Description>French</Card.Description>
              </Card.Content>
            </Card> */}
          </Card.Group>
        </Segment>
      </div>
    );
  }
}

export default LanguageFlag;
