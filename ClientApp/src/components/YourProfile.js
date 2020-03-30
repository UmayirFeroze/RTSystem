import React, { Component } from "react";
import "../styles/YourProfile.css";

class YourProfile extends Component {
  state = {};

  componentDidMount() {
    // Get the currently logged user's accoutn details
  }

  render() {
    return (
      <div className="yourProfile">
        <p>My Profile</p>
        <p>profile image</p>
        <p>Business Name </p>
        <p>Business Description</p>
        <p>Name: Owner Name</p>
        <p>Phone: 0112729729</p>
        <p>Address: no street, no country</p>
        <a href="/Profile">View Profile</a>
      </div>
    );
  }
}

export default YourProfile;
