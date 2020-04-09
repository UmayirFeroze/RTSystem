import React, { Component } from "react";
import LogIn from "../components/LogIn";
import Header from "../components/Header";

class Landing extends Component {
  state = {};
  render() {
    return (
      <div>
        <Header />
        <LogIn />
      </div>
    );
  }
}

export default Landing;
