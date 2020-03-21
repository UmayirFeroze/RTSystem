import React, { Component } from "react";
import NavBar from "./../components/Navbar";

class MyBids extends Component {
  state = {};
  render() {
    return (
      <div>
        <NavBar />
        <h1 style={{ color: "white" }}>My Bids</h1>
      </div>
    );
  }
}

export default MyBids;
