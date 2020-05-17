import React, { Component } from "react";

import { connect } from "react-redux";
import { resetPassword } from "../actions/authAction";

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
        confirmNewPassword: "",
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
    if (updatedUser.newPassword !== updatedUser.confirmNewPassword) {
      this.setState({ error: "Passwords Must Match!" });
    } else if (updatedUser.newPassword === updatedUser.currentPassword) {
      this.setState({ error: "New Password must not be the same!" });
    } else {
      this.props.resetPassword(updatedUser);
    }
  };

  render() {
    console.log("Error: ", this.state.updatedUser);
    const errorMessage = this.props.authUser.error ? (
      <p>Current Password is Incorrect</p>
    ) : !this.state.error ? (
      <p>{this.state.error}</p>
    ) : null;

    return (
      <div className="resetPassword">
        <div className="header">
          <h2>Reset Password</h2>
          <button onClick={this.props.close}>&times;</button>
        </div>
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
            name="confirmNewPassword"
            placeholder="Re-enter New Password"
            onChange={this.HandleChange}
            required
          />
          <div style={{ color: "red" }}>{errorMessage}</div>
          <button name="reset">Reset</button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = ({ authUser }) => ({ authUser });
export default connect(mapStateToProps, { resetPassword })(ResetPassword);
