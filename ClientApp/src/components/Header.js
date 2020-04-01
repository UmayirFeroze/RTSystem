import React, { Component } from "react";
import "../styles/Header.css";

class Header extends Component {
  render() {
    return (
      <div className="header">
        <img src={require("../Images/rubber-logo.png")} alt="logo" />
        <h1>Sri Lanka Rubber Traders' Association</h1>
        <p>presents Trade Portal</p>
      </div>
    );
  }
}

export default Header;
