import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";

import "./../styles/Navbar.css";

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <NavLink to="/home/">Home</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/transactions">Transactions</NavLink>
        <NavLink to="/requests">Requests</NavLink>
        <NavLink to="/quotations">My Quotations</NavLink>
        <NavLink to="/our-partners">Our Partners</NavLink>
        <NavLink to="/help">User Manual</NavLink>
        <div className="search">
          <input type="text" placeholder="Search.." />
          <a href="/search">Search</a>
          <NavLink to="/">LogOut</NavLink>
        </div>
      </nav>
    );
  }
}

export default withRouter(NavBar);
