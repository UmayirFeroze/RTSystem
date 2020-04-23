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
        <NavLink to="/requests">My Requests</NavLink>
        <NavLink to="/quotations">My Quotations</NavLink>
        <NavLink to="/our-partners">Our Partners</NavLink>
        <NavLink to="/help">User Manual</NavLink>
        <div className="search-container">
          <form className="search-container">
            <input type="text" placeholder="Looking for Someone..." />
            <button href="/search">Search</button>
          </form>
          <NavLink className="logout" to="/">
            LogOut
          </NavLink>
        </div>
      </nav>
    );
  }
}

export default withRouter(NavBar);
