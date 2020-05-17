import React, { Component } from "react";
import NavBar from "../components/Navbar";
import Header from "../components/Header";
import Popup from "reactjs-popup";

import ResetPassword from "../components/ResetPassword";
import EditUser from "../components/EditUser";

import { connect } from "react-redux";
import { getAuthUser } from "../actions/authAction";

import "../styles/ProfilePage.css";
import "../styles/YourProfile.css";
import DisableAccount from "../components/DisableAccount";
import AddProfilePicture from "../components/AddProfilePicture";

export class Profile extends Component {
  constructor(props) {
    super(props);

    this.openPopup = this.openPopup.bind(this);
    this.closePopup = this.closePopup.bind(this);

    this.state = {
      currentUser: {},
      changePassword: false,
      editProfile: false,
      disableAccount: false,
      addProfilePicture: false,
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

  openPopup = (event) => {
    if (event.target.name === "changePassword")
      this.setState({ changePassword: true });
    if (event.target.name === "editProfile")
      this.setState({ editProfile: true });
    if (event.target.name === "disableAccount")
      this.setState({ disableAccount: true });
    if (event.target.name === "addProfilePicture")
      this.setState({ addProfilePicture: true });
  };

  closePopup = () => {
    this.setState({
      changePassword: false,
      editProfile: false,
      disableAccount: false,
      addProfilePicture: false,
    });
  };

  renderNavBar = (user) => {
    return (
      <div>
        <div className="yourProfile">
          {user.userImage ? (
            <img
              src={require(`../Images/avatar-profile.png`)}
              alt="userImage"
            />
          ) : (
            <img src={require("../Images/logo.jpg")} alt="profilePic" />
          )}

          <button name="addProfilePicture" onClick={this.openPopup}>
            Add Profile Picture
          </button>
          <button name="changePassword" onClick={this.openPopup}>
            Change Password
          </button>
          <button name="editProfile" onClick={this.openPopup}>
            Edit Profile
          </button>
          <button name="disableAccount" onClick={this.openPopup}>
            Disable Account
          </button>
        </div>
        <div>
          <Popup
            open={this.state.addProfilePicture}
            onClose={this.closePopup}
            contentStyle={{ border: "none", backgroundColor: "inherit" }}
          >
            <AddProfilePicture close={this.closePopup} />
          </Popup>

          <Popup open={this.state.changePassword} onClose={this.closePopup}>
            <ResetPassword
              user={this.state.currentUser}
              close={this.closePopup}
            />
          </Popup>

          <Popup open={this.state.editProfile} onClose={this.closePopup}>
            <EditUser user={this.state.currentUser} close={this.closePopup} />
          </Popup>

          <Popup
            open={this.state.disableAccount}
            onClose={this.closePopup}
            contentStyle={{ backgroundColor: "inherit", border: "none" }}
          >
            <DisableAccount
              user={this.state.currentUser}
              close={this.closePopup}
            />
          </Popup>
        </div>
      </div>
    );
  };

  renderProfileData = (currentUser) => {
    console.log(currentUser);
    return (
      <div style={{ display: "flex" }}>
        <div style={{ width: "60%", padding: 20 }}>
          <h1>{currentUser.businessName}</h1>
          <h2>{currentUser.businessDescription}</h2>

          <h3>Owner: </h3>
          <p style={{ marginLeft: "10%" }}>
            {currentUser.firstName + " " + currentUser.lastName}
          </p>
          <h3>Mobile: </h3>
          <p style={{ marginLeft: "10%" }}>{currentUser.phone}</p>
          <h3>Email: </h3>
          <p style={{ marginLeft: "10%" }}>{currentUser.email}</p>

          <h3>Telephone: </h3>
          <p style={{ marginLeft: "10%" }}>{currentUser.businessPhone}</p>

          <h3>Email: </h3>
          <p style={{ marginLeft: "10%" }}>{currentUser.email}</p>

          <h3>Business Address: </h3>
          <p style={{ marginLeft: "10%" }}>{currentUser.businessAddress}</p>

          <h3>Business Type: </h3>
          <p style={{ marginLeft: "10%" }}>{currentUser.businessType}</p>
        </div>
        <div className="vertical"></div>
        <div style={{ width: "40%", textAlign: "center" }}>
          <h3>Stats: </h3>
        </div>
      </div>
    );
  };

  render() {
    const { currentUser } = this.state;
    return (
      <div className="themePage">
        <Header />
        <NavBar />
        <h1>Your Profile</h1>
        <div className="container">
          <div className="sideNav" style={{ paddingTop: 0 }}>
            {this.renderNavBar(currentUser)}
          </div>
          <div className="data">{this.renderProfileData(currentUser)}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authUser }) => ({
  authUser,
});

export default connect(mapStateToProps, { getAuthUser })(Profile);
