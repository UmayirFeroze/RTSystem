import React, { Component } from "react";
import NavBar from "../components/Navbar";
import BuyerCreateBid from "../components/BuyerCreateBid";
import YourProfile from "../components/YourProfile";
import BuyerBids from "../components/BuyerBids";
import Header from "../components/Header";

class Home extends Component {
  state = {};
  render() {
    return (
      <div>
        <Header />
        <NavBar />
        <h1 style={{ color: "white" }}>Home Page</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%"
          }}
        >
          <div
            style={{
              border: 1,
              width: "20%",
              borderStyle: "solid",
              borderColor: "black"
            }}
          >
            <YourProfile />
          </div>
          <div
            style={{
              border: 1,
              width: "60%",
              borderStyle: "solid",
              borderColor: "black"
            }}
          >
            <BuyerBids />
          </div>
          <div
            style={{
              width: "20%",
              paddingRight: 20,
              paddingBottom: 20,
              // height: "100%",
              // marginLeft: 20,
              paddingLeft: 20,
              backgroundColor: "#1f1e1e"
            }}
          >
            <BuyerCreateBid />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
