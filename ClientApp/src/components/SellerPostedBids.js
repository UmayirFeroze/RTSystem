import React, { Component } from "react";
import Popup from "reactjs-popup";

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
      seller: [],
      viewSeller: false,
      status: "",
    };
  }
  componentDidMount() {
    const { users, sellerBid } = this.props;
    this.setState({ sellerBid: sellerBid });
    this.setState({
      seller: users.find(({ userId }) => userId === sellerBid.userId),
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.users.data !== this.props.users.data) {
      this.setState({ user: this.props.users.data });
    }
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

  ViewSeller = (user) => {
    return (
      <div style={{ color: "black" }}>
        <div
          style={{
            border: "1px black solid",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <p>Quoted By: </p>
          <button onClick={this.closeViewSeller} style={{ marginLeft: "auto" }}>
            &times;
          </button>
        </div>
        <div
          style={{
            border: "1px red solid",
            display: "flex",
          }}
        >
          <div style={{ border: "1px blue solid", width: "40%" }}>
            <h1>Image</h1>
          </div>
          <div style={{ border: "1px yellow solid", width: "60%" }}>
            <h2>{user.businessName}</h2>
            <h4>{user.businessDescription}</h4>
            <p>
              {user.businessType + ": " + user.firstName + " " + user.lastName}
            </p>
            <p>{"Contact: " + user.phone + " / " + user.businessPhone}</p>
            <p>{"Email: " + user.email}</p>
            <p>{"Address:" + user.businessAddress}</p>
          </div>
        </div>
      </div>
    );
  };

  render() {
    let { sellerBid, seller } = this.state;
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

        <Popup open={this.state.viewSeller} onClose={this.closeViewSeller}>
          {this.ViewSeller(seller)}
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
