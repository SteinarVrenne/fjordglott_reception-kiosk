import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { HashRouter, Link, Route, Switch } from "react-router-dom";

// Import SemanticUI for class components
import "semantic-ui-css/semantic.min.scss";

// Import Semantic UI components
import {
  Button,
  Grid,
  Segment,
  Header,
  Advertisement,
  Card,
  Container,
} from "semantic-ui-react";

// Import our routes for react-dom-router
import Routes from "./Routes";
import history from "./history";

// Import components that will always be displayed
import Banner from "./components/Banner"

// Since we are using HtmlWebpackPlugin WITHOUT a template, we should create our own root node in the body element before rendering into it
let root = document.createElement("div");

root.id = "root";
document.body.appendChild(root);

// Now we can render our application into it
ReactDOM.render(
  <HashRouter
    style={{
      height: "100%",
      position: "fixed",
      width: "100%",
      // overflow: "auto"
    }}
  >
    <Banner></Banner>
    <Routes></Routes>

    <Advertisement
      unit="banner"
      centered
      test="Copyright something something?   |   Call [+0047]97608825 for assistance"
      placeholder
      style={{
        position: "fixed",
        left: "0",
        bottom: "0",
        width: "100%",
        height: "5%",
        background: "rgba(0,0,0,0.45)",
        textAlign: "center",
      }}
    ></Advertisement>
    {history.push("/")}
  </HashRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
