// Disablee Account must have no open orders and all quotations must be delivered

import React, { Component } from "react";
import { connect } from "react-redux";
import { disableAccount } from "../actions/authAction";
import "../styles/ConfirmationPopup.css";

class DisableAccount extends Component {
  constructor(props) {
    super(props);

    this.handleDeactivate = this.handleDeactivate.bind(this);

    this.state = {
      status: true,
      error: "",
    };
  }

  componentDidMount() {
    if (this.props.buyerBids !== 0 || this.props.sellerBids !== 0) {
      this.setState({ status: false });
    }
  }

  handleDeactivate = (event) => {
    event.preventDefault();
    this.props.disableAccount();
    if (this.props.users.error) {
      this.setState({ error: this.props.users.error });
    }
  };

  render() {
    return (
      <div className="confirmPopup">
        <h1>Are you sure you want to disable your account?</h1>

        <div style={{ color: "red" }}>
          {this.state.status ? null : (
            <p>You have Open Requests or Pending Deliveries </p>
          )}
        </div>

        <div className="buttons">
          <button
            name="yes"
            onClick={this.handleDeactivate}
            disabled={!this.state.status}
          >
            Yes
          </button>
          <button name="no" onClick={this.props.close}>
            No
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => ({ users });
export default connect(mapStateToProps, { disableAccount })(DisableAccount);
