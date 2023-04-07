import React from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import { List } from "./List";

function App() {
  return (
    <div className="App">
      <Container className="m-5">
        <h1>Tododo-list</h1>
        <List />
      </Container>
    </div>
  );
}

export default App;
