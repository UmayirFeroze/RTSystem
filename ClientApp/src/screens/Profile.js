import React, { Component } from "react";
import NavBar from "../components/Navbar";
import Header from "../components/Header";

import { connect } from "react-redux";
import { getAuthUser } from "../actions/authAction";

import "../styles/ProfilePage.css";
export class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: [],
    };
  }

  componentDidMount() {
    this.props.getAuthUser();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.authUser.data !== this.props.authUser.data) {
      this.setState({ currentUser: this.props.authUser.data });
    }
  }

  render() {
    let { currentUser } = this.state;
    return (
      <div>
        <Header />
        <NavBar />
        <h1>Profile Page</h1>
        <div className="profilePage">
          <div>
            <h1>User Information</h1>
            <hr />
            <p>First Name: {currentUser.firstName}</p>
            <p>Last Name: {currentUser.lastName}</p>
            <p>Mobile: {currentUser.phone}</p>
            <p>Email: {currentUser.email}</p>
          </div>
          <div>
            <h1>Business Information</h1>
            <hr />
            <p>Business Name: {currentUser.businessName}</p>
            <p>Business Description: {currentUser.businessDescription}</p>
            <p>Telephone: {currentUser.businessPhone}</p>
            <p>Address: {currentUser.businessAddress}</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authUser }) => ({
  authUser,
});

export default connect(mapStateToProps, { getAuthUser })(Profile);
