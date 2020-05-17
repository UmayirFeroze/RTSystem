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
        businessType: "",
      },
    };
  }

  handleChange = (event) => {
    let { updateUser } = this.state;
    this.setState({
      updateUser: { ...updateUser, [event.target.name]: event.target.value },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.UpdateUser(this.state.updateUser);
  };

  render() {
    const { user } = this.props;

    return (
      <div className="editUser">
        <h1>Update Profile</h1>
        <form>
          <div className="allInputs">
            <div className="ownerDetails">
              <h2>Owner Details</h2>
              <hr />
              <input
                type="text"
                name="firstName"
                value={this.state.updateUser.firstName}
                placeholder={user.firstName}
                onChange={this.handleChange}
              />

              <input
                type="text"
                name="lastName"
                value={this.state.updateUser.lastName}
                placeholder={user.lastName}
                onChange={this.handleChange}
              />

              <input
                type="tel"
                name="phone"
                pattern="[0-9]{10}"
                maxLength="10"
                value={this.state.updateUser.phone}
                placeholder={user.phone}
                onChange={this.handleChange}
              />

              <input
                type="email"
                name="email"
                value={this.state.updateUser.email}
                placeholder={user.email}
                onChange={this.handleChange}
              />
            </div>
            <div className="businessDetails">
              <h2>Business Details</h2>
              <hr />
              <input
                type="text"
                name="businessName"
                value={this.state.updateUser.businessName}
                placeholder={user.businessName}
                onChange={this.handleChange}
              />

              <input
                type="text"
                name="businessDescription"
                value={this.state.updateUser.businessDescription}
                placeholder={user.businessDescription}
                onChange={this.handleChange}
              />

              <input
                type="tel"
                name="businessPhone"
                pattern="[0-9]{10}"
                maxLength="10"
                value={this.state.updateUser.businessPhone}
                placeholder={user.businessPhone}
                onChange={this.handleChange}
              />

              <input
                type="text"
                name="businessAddress"
                value={this.state.updateUser.businessAddress}
                placeholder={user.businessAddress}
                onChange={this.handleChange}
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
          <button onClick={this.handleSubmit}>Update</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ authUser }) => ({ authUser });
export default connect(mapStateToProps, { UpdateUser })(EditUser);
