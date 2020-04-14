import React, { Component } from "react";
import "../styles/ResetPassword.css";

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.HandleChange = this.HandleChange.bind(this);

    this.state = {
      currentUser: {},
      updatedUser: {
        currentPassword: "",
        newPassword: "",
        retypePassword: "",
      },
      error: "",
    };
  }

  componentDidMount() {
    const user = this.props.user;
    this.setState({ currentUser: user });
  }

  HandleChange = (event) => {
    let { updatedUser } = this.state;
    this.setState({
      updatedUser: { ...updatedUser, [event.target.name]: event.target.value },
    });
  };

  ResetPassword = (event) => {
    event.preventDefault();
    const { currentPassword, newPassword, retypePassword } = this.state;
    if (newPassword !== retypePassword) {
      this.setState({ error: "Passwords Must Match!" });
    } else if (newPassword === currentPassword) {
      this.setState({ error: "New Password must not be the same!" }); // Error at this point
    } else {
      // Call the api function
    }
  };

  render() {
    console.log("Error: ", this.state.error);
    const errorMessage =
      this.state.error !== null ? <p>{this.state.error}</p> : null;

    return (
      <div className="resetPassword">
        <h1>Reset Password</h1>
        <form onSubmit={this.ResetPassword}>
          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            onChange={this.HandleChange}
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            onChange={this.HandleChange}
          />

          <input
            type="password"
            name="Re-enter New Password"
            placeholder="Re-enter New Password"
            onChange={this.HandleChange}
          />
          <p>{errorMessage}</p>
          <button>Reset</button>
        </form>
      </div>
    );
  }
}

export default ResetPassword;
