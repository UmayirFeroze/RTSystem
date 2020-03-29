import React, { Component } from "react";
import NavBar from "../components/Navbar";
import Header from "../components/Header";

class UserManual extends Component {
  state = {};
  render() {
    return (
      <div>
        <Header />
        <NavBar />
        <h1 style={{ color: "white" }}>UserManual</h1>
      </div>
    );
  }
}

export default UserManual;
