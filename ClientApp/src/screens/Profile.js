import React, { Component } from "react";
import NavBar from "../components/Navbar";

class Profile extends Component {
  state = {};
  render() {
    return (
      <div>
        <NavBar />
        <h1 style={{ color: "white" }}>Profile Page</h1>
      </div>
    );
  }
}

export default Profile;
