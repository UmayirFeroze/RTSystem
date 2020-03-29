// The login Page
import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser, logoutUser } from "../actions/userAction";
import "./../styles/LogIn.css";

export class LogIn extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      user: {
        email: "",
        password: ""
      },
      isLoading: false,
      hasError: false
    };
  }

  componentDidMount() {
    console.log(this.state); // TO BE CLEANED
    this.props.logoutUser();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.setState({ user: this.props.user });
    }
  }

  // componentDidCatch(error, info) {
  //   this.setState({ hasError: true });
  //   console.log("Error:", error);
  //   console.log("Info: ", info);
  //   console.log(this.state.hasError);
  // }

  handleChange = event => {
    let { user } = this.state;
    this.setState({
      user: { ...user, [event.target.name]: event.target.value },
      isLoading: true
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state.user); // to be cleaned
    const { user } = this.state;
    this.props.loginUser(user);
  };

  render() {
    let errorMessage = this.state.hasError ? (
      <p>Invalid Username or Password</p>
    ) : null;
    let error = "error";
    return (
      <div className="loginComponent">
        <h1>Sign In</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            value={this.state.user.email}
            placeholder="Email"
            onChange={this.handleChange}
            required
          />
          <div>{errorMessage}</div>
          <input
            type="password"
            name="password"
            value={this.state.user.password}
            placeholder="Password"
            onChange={this.handleChange}
            required
          />
          <div>{errorMessage}</div>
          <button>Sign In</button>
          <a href="/register">No Account?</a>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ state }) => ({
  state
});
export default connect(mapStateToProps, { loginUser, logoutUser })(LogIn);
