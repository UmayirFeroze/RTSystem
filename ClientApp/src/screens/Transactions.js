import React, { Component } from "react";
import NavBar from "../components/Navbar";
import Header from "../components/Header";

class Transactions extends Component {
  state = {};
  render() {
    return (
      <div>
        <Header />
        <NavBar />
        <h1 style={{ color: "white" }}>Transactions Page</h1>
        <p style={{ color: "white" }}>
          All Accepted Transactions will come here
        </p>
      </div>
    );
  }
}

export default Transactions;
