import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser, logoutUser } from "../actions/authAction";
import "./../styles/LogIn.css";

export class LogIn extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      user: {
        email: "",
        password: "",
      },
    };
  }

  componentDidMount() {
    this.props.logoutUser();
  }

  handleChange = (event) => {
    let { user } = this.state;
    this.setState({
      user: { ...user, [event.target.name]: event.target.value },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.loginUser(this.state.user);
  };

  render() {
    return (
      <div className="loginComponent">
        <h1>Sign In</h1>
        <form onSubmit={this.handleSubmit}>
          <label for="email">
            <input
              id="email"
              type="email"
              name="email"
              value={this.state.user.email}
              placeholder="Email"
              onChange={this.handleChange}
              required
            />
          </label>
          <label for="password">
            <input
              id="password"
              type="password"
              name="password"
              value={this.state.user.password}
              placeholder="Password"
              onChange={this.handleChange}
              required
            />
          </label>
          {this.props.authUser.error ? (
            <p>Incorrect Email or Password</p>
          ) : null}
          <button>Sign In</button>
          <a href="/register">No Account?</a>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ authUser }) => ({ authUser });

const mapDispatchToProps = (dispatch) => ({
  logoutUser: (user) => dispatch(logoutUser()),
  loginUser: (user) => dispatch(loginUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
