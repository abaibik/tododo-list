import React from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import { List } from "./List";
import logo from "./images/icons8-test-100.png";
import { Col, Row } from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <Container className="m-5">
        <div className="heading-with-logo">
          <h1>Tododo-list</h1>

          <img alt="Logo Todo-list" className="logo" src={logo} />
        </div>

        <List />
      </Container>
    </div>
  );
}

export default App;
