import React, { Component } from "react";
import NavBar from "../components/Navbar";
import BuyerCreateBid from "../components/BuyerCreateBid";
import YourProfile from "../components/YourProfile";
import BuyerBids from "../components/BuyerBids";
import Header from "../components/Header";
import { connect } from "react-redux";
import "../styles/Home.css";

export class Home extends Component {
  render() {
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

// Must clean code below

const mapStateToProps = ({ authUser }) => ({
  authUser,
});

export default connect(mapStateToProps)(Home);
