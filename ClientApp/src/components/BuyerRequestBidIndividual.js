import React, { Component } from "react";
import Popup from "reactjs-popup";
import SellerPostedBids from "./SellerPostedBids";

import "../styles/IndividualBuyerRequestedBids.css";

class BuyerRequestBidIndividual extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.closeView = this.closeView.bind(this);
    this.closeBid = this.closeBid.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.state = {
      buyerBid: {},
      sellerBids: [],
      users: [],
      status: "",
      viewSellerBid: false,
      viewDelete: false,
      viewClose: false,
    };
  }

  componentDidMount() {
    let { buyerBid, sellerBids, users } = this.props;
    //   function to query seller bids by buyer bid Id
    function isValid(sellerBid) {
      if (sellerBid.buyerBidId === buyerBid.buyerBidId) {
        return true;
      }
    }
    if (this.state.buyerBid !== buyerBid) {
      this.setState({ buyerBid: buyerBid });
    }
    this.setState({ sellerBids: sellerBids.filter(isValid) });
    this.setState({ users: users });
  }

  renderSellerBids = (sellerBids, users, buyerBid) => {
    if (Array.isArray(sellerBids) && Array.isArray(users)) {
      if (sellerBids.length === 0) {
        return (
          <div style={{ color: "black" }}>
            <h2>This Request has No Quotations Yet</h2>
            <button onClick={this.closeView}>&times;</button>
          </div>
        );
      } else {
        return (
          <div className="sellerBidsPopup">
            <div className="header">
              <h2>All Quotations for You Request</h2>
              <button>&times;</button>
            </div>
            <div className="container">
              <div className="buyerBidContainer">
                <h2>Your Request</h2>
                <p>
                  <b>Quality:</b> {buyerBid.quality}
                </p>
                <p>
                  <b>Quantity:</b> {buyerBid.quantity}
                </p>
                {buyerBid.price ? (
                  <p>
                    <b>Price:</b> {buyerBid.price}
                  </p>
                ) : null}
                <p>
                  <b>Payment:</b> {buyerBid.paymentIn}
                </p>
              </div>
              <div className="vertical"></div>
              <div className="sellerBidContainer">
                {sellerBids.map((sellerBid) => (
                  <SellerPostedBids
                    key={sellerBid.sellerBidId}
                    sellerBid={sellerBid}
                    users={users}
                  ></SellerPostedBids>
                ))}
              </div>
            </div>
          </div>
        );
      }
    }
  };

  closeView = () => {
    this.setState({
      viewClose: false,
      viewDelete: false,
      viewSellerBid: false,
    });
  };

  handleChange = (event) => {
    if (event.target.name === "closebid") {
      this.setState({
        viewClose: true,
        status: "closed",
      });
    }
    if (event.target.name === "deletebid") {
      this.setState({ viewDelete: true, status: "delete" });
    }
    if (event.target.name === "sellerbids") {
      this.setState({ viewSellerBid: true });
    }
  };

  closeBid = () => {
    const { buyerBid, status } = this.state;
    let updateBid = { buyerBidId: buyerBid.buyerBidId, status: status };
    this.props.parentCallback(updateBid);
  };

  handleDelete = () => {
    const { buyerBid, status } = this.state;
    let deleteObject = { buyerBidId: buyerBid.buyerBidId, status: status };
    this.props.parentCallback(deleteObject);
  };

  render() {
    const {
      buyerBid,
      sellerBids,
      users,
      viewClose,
      viewDelete,
      viewSellerBid,
    } = this.state;

    return (
      <div className="buyerRequestBid">
        <div className="bidDetails">
          <div>
            <p>
              <b>Status: </b> {buyerBid.status}
            </p>
          </div>
          <div>
            <p>
              <b>Posted on: {buyerBid.timeStamp}</b>
            </p>
          </div>
          <div>
            <p>
              <b>Quality: </b>
              {buyerBid.quality}
            </p>
            <p>
              <b>Quantity: </b>
              {buyerBid.quantity}
            </p>
          </div>
        </div>
        <div className="bidOperations">
          <button name="sellerbids" onClick={this.handleChange}>
            View Quotations
          </button>
          <button name="closebid" onClick={this.handleChange}>
            Close Bid
          </button>
          <button name="deletebid" onClick={this.handleChange}>
            Delete Bid
          </button>
        </div>

        <Popup
          open={viewSellerBid}
          onClose={this.closeView}
          contentStyle={{
            border: "none",
            backgroundColor: "inherit",
            width: "1100px",
            height: "800px",
            position: "center",
          }}
        >
          {() => this.renderSellerBids(sellerBids, users, buyerBid)}
        </Popup>

        <Popup
          open={viewClose}
          onClose={this.closeView}
          contentStyle={{ border: "none", backgroundColor: "#1f1e1e" }}
        >
          <div className="confirmPopup">
            <h1>Are your sure you want to Close this bid?</h1>
            <div className="buttons">
              <button onClick={this.closeBid} name="yes">
                Yes
              </button>
              <button onClick={this.closeView} name="no">
                No
              </button>
            </div>
          </div>
        </Popup>

        <Popup
          open={viewDelete}
          onClose={this.closeView}
          contentStyle={{
            border: "none",
            backgroundColor: "#1f1e1e",
          }}
        >
          <div className="confirmPopup">
            <h1>Are you sure you want to Delete?</h1>
            <div className="buttons">
              <button onClick={this.handleDelete} name="yes">
                Yes
              </button>
              <button onClick={this.closeView} name="no">
                No
              </button>
            </div>
          </div>
        </Popup>
      </div>
    );
  }
}

export default BuyerRequestBidIndividual;
