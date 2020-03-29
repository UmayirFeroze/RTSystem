import React, { Component } from "react";
import NavBar from "../components/Navbar";
import Header from "../components/Header";

class Profile extends Component {
  state = {};
  render() {
    return (
      <div>
        <Header />
        <NavBar />
        <h1 style={{ color: "white" }}>Profile Page</h1>
      </div>
    );
  }
}

export default Profile;
