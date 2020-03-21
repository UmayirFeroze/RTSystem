import React, { Component } from "react";
import "../styles/Register.css";
import axios from "axios";

class Register extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      businessName: "",
      businessDescription: "",
      businessPhone: "",
      businessAddress: ""
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { history } = this.props;
    let newUser = this.state;

    axios.post("/api/Users/RegisterUser", newUser).then(result => {
      history.push("/home");
    });
  };

  render() {
    return (
      <div className="register">
        <h1>Register Here</h1>
        <form onSubmit={this.handleSubmit}>
          <h2>Owner Details</h2>
          <hr />
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={this.handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            pattern="[0-9]{10}"
            placeholder="Phone"
            onChange={this.handleChange}
            required
          />

          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={this.handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.handleChange}
            required
          />

          <h2>Company Details</h2>
          <hr />
          <input
            type="text"
            name="businessName"
            placeholder="Business Name"
            onChange={this.handleChange}
            required
          />

          <input
            type="text"
            name="businessDescription"
            placeholder="Business Description"
            onChange={this.handleChange}
          />

          <input
            type="tel"
            name="businessPhone"
            pattern="[0-9]{10}"
            placeholder="Business Phone"
            onChange={this.handleChange}
            required
          />

          <input
            type="text"
            name="businessAddress"
            placeholder="Business Address"
            onChange={this.handleChange}
            required
          />

          <select
            id="businessType"
            name="businessType"
            placeholder="BusinessType"
            required
          >
            <option disabled selected>
              BusinessType
            </option>
            <option value="Dealer">Dealer</option>
            <option value="Exporter">Exporter</option>
            <option value="Rubber Product Manufacturer">
              Rubber Product Manufacturer
            </option>
          </select>

          <button>Sign Up</button>
          <a href="/">Already Have an Account?</a>
        </form>
      </div>
    );
  }
}

export default Register;
