import React, { Component } from "react";
import Popup from "reactjs-popup";
import ViewSellerPopup from "./ViewSellerPopup";

import { connect } from "react-redux";
import { UpdateSellerBid, DeleteSellerBid } from "../actions/SellerBidActions";
import "../styles/IndividualSellerPostedBids.css";

class SellerPostedBids extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.closeViewSeller = this.closeViewSeller.bind(this);
    this.updateStatus = this.updateStatus.bind(this);

    this.state = {
      sellerBid: [],
      viewSeller: false,
      status: "",
    };
  }
  componentDidMount() {
    const { sellerBid } = this.props;
    this.setState({ sellerBid: sellerBid });
  }

  handleChange = (event) => {
    const { sellerBid } = this.state;
    if (event.target.name === "viewSeller") {
      this.setState({ viewSeller: true });
    }
    if (event.target.name === "accept") {
      this.setState(
        { status: "accepted", sellerBid: { ...sellerBid, status: "accepted" } },
        this.updateStatus
      );
    }
    if (event.target.name === "reject") {
      this.setState(
        { status: "rejected", sellerBid: { ...sellerBid, status: "rejected" } },
        this.updateStatus
      );
    }
    if (event.target.name === "negotiate") {
      this.setState(
        {
          status: "negotiated",
          sellerBid: { ...sellerBid, status: "negotiated" },
        },
        this.updateStatus
      );
    }
  };

  updateStatus = () => {
    const { sellerBid, status } = this.state;
    let updateBid = { sellerBidId: sellerBid.sellerBidId, status: status };
    this.props.UpdateSellerBid(updateBid);
  };

  closeViewSeller = () => {
    this.setState({ viewSeller: false });
  };

  render() {
    let { sellerBid } = this.state;

    return (
      <div className="singleSellerBid">
        <div className="status" style={{ backgroundColor: "green" }}></div>
        <div className="details">
          <p style={{ marginTop: 2 }}>
            <b>Quantity:</b> {sellerBid.quantity} <b>Price:</b>{" "}
            {sellerBid.price}
          </p>
          <p>
            <b>Delivery Date:</b> {sellerBid.deliveryDate}
          </p>
          <p>
            <b>Validity:</b> {sellerBid.validityPeriod}
          </p>
        </div>
        <div className="buttons">
          <button name="viewSeller" onClick={this.handleChange}>
            View Seller
          </button>
          <button name="accept" onClick={this.handleChange}>
            Accept
          </button>
          <button name="reject" onClick={this.handleChange}>
            Reject
          </button>
          <button name="negotiate" onClick={this.handleChange}>
            Negotiate
          </button>
        </div>

        <Popup
          open={this.state.viewSeller}
          onClose={this.closeViewSeller}
          contentStyle={{ border: "none", backgroundColor: "inherit" }}
        >
          <ViewSellerPopup
            seller={this.props.users.find(
              ({ userId }) => userId === sellerBid.userId
            )}
            closePopup={this.closeViewSeller}
          />
        </Popup>
      </div>
    );
  }
}

const mapStateToProps = ({ sellerBids }) => ({ sellerBids });
export default connect(mapStateToProps, {
  UpdateSellerBid,
  DeleteSellerBid,
})(SellerPostedBids);
