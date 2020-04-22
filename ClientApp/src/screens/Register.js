// The register user screen
import React, { Component } from "react";
import { connect } from "react-redux";
import { resgisterUser } from "../actions/authAction";
import "../styles/Register.css";
import Header from "../components/Header";

export class Register extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      user: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        businessName: "",
        businessDescription: "",
        businessPhone: "",
        businessAddress: "",
        businessType: "",
      },
    };
  }

  componentDidMount() {
    console.log(this.state); // to be cleaned
  }

  handleChange = (event) => {
    let { user } = this.state;
    this.setState({
      user: { ...user, [event.target.name]: event.target.value },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { user } = this.state;
    this.props.resgisterUser(user);
    console.log(this.state.user); //tbc
  };

  render() {
    return (
      <div>
        <Header />
        <div className="register">
          <h1>Register Here</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="allInputs">
              <div className="ownerDetails">
                <h2>Owner Details</h2>
                <hr />
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={this.state.user.firstName}
                  onChange={this.handleChange}
                  required
                />

                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={this.state.user.lastName}
                  onChange={this.handleChange}
                  required
                />

                <input
                  type="tel"
                  name="phone"
                  pattern="[0-9]{10}"
                  maxLength="10"
                  placeholder="Phone"
                  value={this.state.user.phone}
                  onChange={this.handleChange}
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={this.state.user.email}
                  onChange={this.handleChange}
                  required
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.user.password}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="businessDetails">
                <h2>Business Details</h2>
                <hr />
                <input
                  type="text"
                  name="businessName"
                  placeholder="Business Name"
                  value={this.state.user.businessName}
                  onChange={this.handleChange}
                  required
                />

                <input
                  type="text"
                  name="businessDescription"
                  placeholder="Business Description"
                  value={this.state.user.businessDescription}
                  onChange={this.handleChange}
                />

                <input
                  type="tel"
                  name="businessPhone"
                  pattern="[0-9]{10}"
                  maxLength="10"
                  placeholder="Business Phone"
                  value={this.state.user.businessPhone}
                  onChange={this.handleChange}
                  required
                />

                <input
                  type="text"
                  name="businessAddress"
                  placeholder="Business Address"
                  value={this.state.user.businessAddress}
                  onChange={this.handleChange}
                  required
                />

                <select
                  name="businessType"
                  onChange={this.handleChange}
                  value={this.state.user.businessType}
                  required
                >
                  <option disabled value="" defaultValue="">
                    BusinessType
                  </option>
                  <option value="Dealer">Dealer</option>
                  <option value="Exporter">Exporter</option>
                  <option value="Rubber Product Manufacturer">
                    Rubber Product Manufacturer
                  </option>
                </select>
              </div>
            </div>
            <div className="footer">
              <button>Sign Up</button>
              <a href="/">Already Have an Account?</a>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authUser }) => ({ authUser });
export default connect(mapStateToProps, { resgisterUser })(Register);
