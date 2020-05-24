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
    const buyerBids = this.props.buyerBids.data;
    const sellerBids = this.props.sellerBids.data;
    const today = new Date().toLocaleDateString();
    function checkDisable() {
      if (Array.isArray(buyerBids) && Array.isArray(sellerBids)) {
        if (buyerBids.length !== 0) {
          buyerBids.forEach((buyerBid) => {
            if (buyerBid.status === "open") {
              return false;
            }
          });
        }
        if (sellerBids.length !== 0) {
          sellerBids.forEach((sellerBid) => {
            if (
              sellerBid.status === "accepted" &&
              sellerBid.deliveryDate <= today
            ) {
              return false;
            }
          });
        }
      } else {
        return true;
      }
    }
    if (!checkDisable) {
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
