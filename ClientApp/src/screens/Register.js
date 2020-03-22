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
      businessAddress: "",
      businessType: ""
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { history } = this.props;
    let newUser = this.state;
    axios.post("api/user/registeruser", newUser).then(result => {
      history.push("/");
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
            value={this.state.firstName}
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={this.state.lastName}
            onChange={this.handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            pattern="[0-9]{10}"
            placeholder="Phone"
            value={this.state.phone}
            onChange={this.handleChange}
            required
          />

          <input
            type="text"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />

          <h2>Company Details</h2>
          <hr />
          <input
            type="text"
            name="businessName"
            placeholder="Business Name"
            value={this.state.businessName}
            onChange={this.handleChange}
            required
          />

          <input
            type="text"
            name="businessDescription"
            placeholder="Business Description"
            value={this.state.businessDescription}
            onChange={this.handleChange}
          />

          <input
            type="tel"
            name="businessPhone"
            pattern="[0-9]{10}"
            placeholder="Business Phone"
            value={this.state.businessPhone}
            onChange={this.handleChange}
            required
          />

          <input
            type="text"
            name="businessAddress"
            placeholder="Business Address"
            value={this.state.businessAddress}
            onChange={this.handleChange}
            required
          />

          <select
            name="businessType"
            onChange={this.handleChange}
            value={this.state.businessType}
          >
            <option disabled selected value="">
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
