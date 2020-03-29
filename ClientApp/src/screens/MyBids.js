import React, { Component } from "react";
import NavBar from "./../components/Navbar";
import Header from "../components/Header";

class MyBids extends Component {
  state = {};
  render() {
    return (
      <div>
        <Header />
        <NavBar />
        <h1 style={{ color: "white" }}>My Bids</h1>
        <p style={{ color: "white" }}>
          All bids posted by seller, and all bids posted by buyer for each
          seller bid
        </p>
      </div>
    );
  }
}

export default MyBids;
