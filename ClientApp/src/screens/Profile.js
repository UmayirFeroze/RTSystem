import React, { Component } from "react";
import NavBar from "../components/Navbar";
import Header from "../components/Header";
import Popup from "reactjs-popup";

import ResetPassword from "../components/ResetPassword";
import EditUser from "../components/EditUser";

import { connect } from "react-redux";
import { getAuthUser } from "../actions/authAction";

import "../styles/ProfilePage.css";

export class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {},
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

  renderProfile = (currentUser) => {
    return (
      <div className="container">
        <div className="user">
          <img src={require("../Images/avatar-profile.png")} alt="UserAvatar" />
          <p>{currentUser.firstName + " " + currentUser.lastName}</p>
          <p>{currentUser.phone}</p>
          <p>{currentUser.email}</p>
          <Popup
            modal
            trigger={<button>Change Password</button>}
            closeDocumentOnClick
            contentStyle={{
              border: "none",
              padding: 0,
              borderColor: "white",
              borderStyle: "solid",
            }}
          >
            <div>
              <ResetPassword user={this.state.currentUser} />
            </div>
          </Popup>

          <Popup
            modal
            trigger={<button>Edit Profile</button>}
            closeOnDocumentClick
            contentStyle={{
              border: "none",
              padding: 0,
              borderColor: "white",
              borderStyle: "solid",
            }}
          >
            <EditUser user={this.state.currentUser} />
          </Popup>

          <Popup
            modal
            trigger={<button>Disable Account</button>}
            closeOnDocumentClick
          >
            <div>Deactivate Accoutn</div>
          </Popup>
        </div>
        <div className="business">
          <div className="businessContainer">
            <img
              src={require("../Images/avatar-profile.png")}
              alt="UserAvatar"
            />
            <div>
              <h1>{currentUser.businessName}</h1>
              <h1>{currentUser.businessDescription}</h1>
            </div>
          </div>
          <h3>Phone: </h3>
          <p>{currentUser.businessPhone}</p>
          <h3>Email: </h3>
          <p>{currentUser.email}</p>
          <h3>Business Address: </h3>
          <p>{currentUser.businessAddress}</p>
          <h3>Business Type: </h3>
          <p>{currentUser.businessType}</p>
        </div>
      </div>
    );
  };

  render() {
    const { currentUser } = this.state;
    return (
      <div>
        <Header />
        <NavBar />
        <h1>Your Profile</h1>
        <div className="profilePage">{this.renderProfile(currentUser)}</div>
      </div>
    );
  }
}

const mapStateToProps = ({ authUser }) => ({
  authUser,
});

export default connect(mapStateToProps, { getAuthUser })(Profile);
