import React, { Component } from "react";
import LogIn from "./LogIn";

class Landing extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1 style={{ color: "white" }}>Landing Page</h1>
        <LogIn />
      </div>
    );
  }
}

export default Landing;
