// The login Page
import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser, logoutUser } from "../actions/userAction";
import "./../styles/LogIn.css";

// import axios from "axios";

export class LogIn extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      user: {
        email: "",
        password: ""
      }
    };
  }

  componentDidMount() {
    console.log("component did mount");
    console.log(this.state); // TO BE CLEANED
    this.props.logoutUser();
  }

  componentDidUpdate(prevProps) {
    // console.log("compoenent did update");
    // console.log("PReviosu Props: ", prevProps);
    if (prevProps.user !== this.props.user) {
      this.setState({ user: this.props.user });
    }
  }

  handleChange = event => {
    let { user } = this.state;
    this.setState({
      user: { ...user, [event.target.name]: event.target.value }
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state.user); // to be cleaned
    const { user } = this.state;
    this.props.loginUser(user);
  };

  render() {
    // console.log("Has Ecrror:", this.props.hasError);
    // console.log("props: ", this.props);
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
          <div>
            {this.props.hasError ? (
              <p style={{ color: "red" }}>Invalid Email or Password</p>
            ) : null}
          </div>
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

const mapStateToProps = ({ state }) => ({
  state // return map the vairbale frontend with value in back end
});

export default connect(mapStateToProps, { loginUser, logoutUser })(LogIn);
