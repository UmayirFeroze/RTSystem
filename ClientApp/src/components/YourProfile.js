import React, { Component } from "react";

class YourProfile extends Component {
  state = {};

  componentDidMount() {
    // Get the currently logged user's accoutn details
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#1f1e1e",
          color: "white",
          height: "100%",
          alignItems: "center"
        }}
      >
        <h2>My Profile</h2>
        <p>profile image</p>
        <p>Business Name </p>
        <p>Business Description</p>
        <p>Name: Owner Name</p>
        <p>Phone: 0112729729</p>
        <p>Address: no street, no country</p>
        <a
          style={{
            backgroundColor: "#1682db",
            color: "white",
            width: "50%",
            fontSize: "17px",
            textDecoration: "none",
            padding: "10px",
            textAlign: "center"
          }}
          href="/Profile"
        >
          View Profile
        </a>
      </div>
    );
  }
}

export default YourProfile;
