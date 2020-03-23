import React, { Component } from "react";
import "./../styles/LogIn.css";

class LogIn extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      user: {
        email: "",
        password: ""
      },
      isLoading: true
    };
  }

  handleChange = event => {
    let { user } = this.state;
    this.setState({
      user: { ...user, [event.target.name]: event.target.value }
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state.user);
    const { user } = this.state;
    localStorage.setItem("userLogIn", user);
    // axios back end
  };

  render() {
    return (
      <div className="loginComponent">
        <h1>Sign In</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="email"
            value={this.state.user.email}
            placeholder="Email"
            onChange={this.handleChange}
            required
          />
          <input
            type="password"
            name="password"
            value={this.state.user.password}
            placeholder="Password"
            onChange={this.handleChange}
            required
          />
          <button>Sign In</button>
          <a href="/register">No Account?</a>
        </form>
      </div>
    );
  }
}

export default LogIn;
