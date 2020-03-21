import React, { Component } from "react";
import NavBar from "../components/Navbar";
import CreateBid from "../components/CreateBid";
import YourProfile from "../components/YouProfile";

class Home extends Component {
  state = {};
  render() {
    return (
      <div>
        <NavBar />
        <h1 style={{ color: "white" }}>Home Page</h1>
        <div style={{ display: "flex", flexDirection: "row" }}>
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
          ></div>
          <div style={{ width: "20%" }}>
            {" "}
            <CreateBid />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
