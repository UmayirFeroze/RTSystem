import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";

import "./../styles/Navbar.css";

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        {/* <NavLink to="/transactions">Transactions</NavLink> */}
        <NavLink to="/requests">My Requests</NavLink>
        <NavLink to="/quotations">My Quotations</NavLink>
        <NavLink to="/our-partners">Our Partners</NavLink>
        {/* <NavLink to="/help">User Manual</NavLink> */}
        <NavLink
          to="/"
          style={{
            float: "right",
            ontWeight: "bold",
            backgroundColor: "inherit",
          }}
        >
          LogOut
        </NavLink>
      </nav>
    );
  }
}

export default withRouter(NavBar);
