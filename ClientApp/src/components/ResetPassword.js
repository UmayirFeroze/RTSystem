import React, { Component } from "react";

import { connect } from "react-redux";
import { UpdateUser } from "../actions/authAction";

import "../styles/ResetPassword.css";

export class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.HandleChange = this.HandleChange.bind(this);
    this.ResetPassword = this.ResetPassword.bind(this);

    this.state = {
      updatedUser: {
        currentPassword: "",
        newPassword: "",
        retypePassword: "",
      },
      error: "",
    };
  }

  HandleChange = (event) => {
    let { updatedUser } = this.state;
    this.setState({
      updatedUser: { ...updatedUser, [event.target.name]: event.target.value },
    });
  };

  ResetPassword = (event) => {
    event.preventDefault();
    const { updatedUser } = this.state;
    if (updatedUser.newPassword !== updatedUser.retypePassword) {
      this.setState({ error: "Passwords Must Match!" });
    } else if (updatedUser.newPassword === updatedUser.currentPassword) {
      this.setState({ error: "New Password must not be the same!" });
    } else {
      this.props.UpdateUser(updatedUser);
    }
  };

  render() {
    console.log("Error: ", this.state.updatedUser);
    const errorMessage =
      this.state.error !== null ? <p>{this.state.error}</p> : null;

    return (
      <div className="resetPassword">
        <h1>Reset Password</h1>
        <form onSubmit={this.ResetPassword} encType="multipart/form-data">
          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            onChange={this.HandleChange}
            required
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            onChange={this.HandleChange}
            required
          />

          <input
            type="password"
            name="retypePassword"
            placeholder="Re-enter New Password"
            onChange={this.HandleChange}
            required
          />
          <div>{errorMessage}</div>
          <button>Reset</button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = ({ users }) => ({ users });
export default connect(mapStateToProps, { UpdateUser })(ResetPassword);
