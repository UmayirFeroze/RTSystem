import React, { Component } from "react";
import NavBar from "../components/Navbar";

class Transactions extends Component {
  state = {};
  render() {
    return (
      <div>
        <NavBar />
        <h1 style={{ color: "white" }}>Transactions Page</h1>
      </div>
    );
  }
}

export default Transactions;
