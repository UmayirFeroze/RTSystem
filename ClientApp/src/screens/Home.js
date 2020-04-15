import React, { Component } from "react";
import NavBar from "../components/Navbar";
import BuyerCreateBid from "../components/BuyerCreateBid";
import YourProfile from "../components/YourProfile";
import BuyerBids from "../components/BuyerBids";
import Header from "../components/Header";

import "../styles/Home.css";

export class Home extends Component {
  render() {
    // console.log("Current User: ", this.state.currentUser);
    return (
      <div>
        <Header />
        <NavBar />
        <h1>Welcome To Trade Portal</h1>
        <div className="container">
          <div className="profile">
            <YourProfile />
          </div>
          <div className="bids">
            <BuyerBids />
          </div>
          <div className="createBids">
            <BuyerCreateBid />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
