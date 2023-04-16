import React from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import { List } from "./List";
import logo from "./images/icons8-test-100.png";

function App() {
  return (
    <div className="App">
      <Container className="m-5">
        <div className="heading-with-logo">
          <img alt="Logo Todo-list" className="logo" src={logo} />
          <div className="align-self-center">
            <h1>Tododo-list</h1>
          </div>
        </div>

        <List dataTestId="listTestId" />
      </Container>
    </div>
  );
}

export default App;
