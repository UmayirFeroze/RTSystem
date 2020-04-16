import React, { Component } from "react";

import { connect } from "react-redux";
import { UpdateUser } from "../actions/authAction";
import "../styles/EditUser.css";

export class EditUser extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      updateUser: {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        businessName: "",
        businessDescription: "",
        businessPhone: "",
        businessAddress: "",
      },
    };
  }

  handleChange = (event) => {
    const { updatedUser } = this.state;
    this.setState({
      updatedUser: { ...updatedUser, [event.target.name]: event.target.value },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.UpdateUser(this.state.updateUser);
  };

  // Have to set all values to state
  render() {
    const { user } = this.props;
    return (
      <div className="editUser">
        <h1>Update Profile</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="allInputs">
            <div className="ownerDetails">
              <h2>Owner Details</h2>
              <hr />
              <input
                type="text"
                name="firstName"
                placeholder={user.firstName}
                onChange={this.handleChange}
                required
              />

              <input
                type="text"
                name="lastName"
                placeholder={user.lastName}
                onChange={this.handleChange}
                required
              />

              <input
                type="tel"
                name="phone"
                pattern="[0-9]{10}"
                maxLength="10"
                placeholder={user.phone}
                onChange={this.handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder={user.email}
                onChange={this.handleChange}
                required
              />

              <button>Update</button>
            </div>
            <div className="businessDetails">
              <h2>Business Details</h2>
              <hr />
              <input
                type="text"
                name="businessName"
                placeholder={user.businessName}
                onChange={this.handleChange}
                required
              />

              <input
                type="text"
                name="businessDescription"
                placeholder={user.businessDescription}
                onChange={this.handleChange}
              />

              <input
                type="tel"
                name="businessPhone"
                pattern="[0-9]{10}"
                maxLength="10"
                placeholder={user.businessPhone}
                onChange={this.handleChange}
                required
              />

              <input
                type="text"
                name="businessAddress"
                placeholder={user.businessAddress}
                onChange={this.handleChange}
                required
              />

              <select name="businessType" onChange={this.handleChange} required>
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
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ authUser }) => ({ authUser });

export default connect(mapStateToProps, { UpdateUser })(EditUser);
