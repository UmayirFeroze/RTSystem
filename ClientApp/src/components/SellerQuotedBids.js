import React, { Component } from "react";
import Popup from "reactjs-popup";

import { connect } from "react-redux";
import { DeleteSellerBid } from "../actions/SellerBidActions";

export class SellerQuotedBids extends Component {
  constructor(props) {
    super(props);

    this.deleteSellerBid = this.deleteSellerBid.bind(this);

    this.state = {
      mySellerBid: [],
      buyerBid: [],
      buyer: [],
      viewMore: false,
      deleteModal: false,
    };
  }

  componentDidMount() {
    const { sellerBid, buyerBids, users } = this.props;
    this.setState({
      mySellerBid: sellerBid,
      buyerBid: buyerBids.find(
        ({ buyerBidId }) => buyerBidId === sellerBid.buyerBidId
      ),
      buyer: users.find(
        ({ userId }) =>
          userId ===
          buyerBids.find(
            ({ buyerBidId }) => buyerBidId === sellerBid.buyerBidId
          ).userId
      ),
    });
  }

  viewMore = () => {
    this.setState({ viewMore: true });
  };

  closeView = () => {
    this.setState({ viewMore: false });
  };

  renderViewMore = (sellerBid, buyerBid, buyer) => {
    console.log("Buyer Bid: ", buyerBid);
    return (
      <div style={{ border: "1px red solid", color: "black" }}>
        <div
          style={{
            border: "1px blue solid",
            color: "black",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <p>{buyer.businessName + " Status: " + sellerBid.status}</p>
          <div
            style={{
              border: "1px blue",
              borderRadius: "50%",
              height: "25px",
              width: "25px",
              backgroundColor: "yellow",
            }}
          ></div>
          <button onClick={this.closeView}>&times;</button>
        </div>
        <div
          style={{
            border: "1px blue solid",
            color: "black",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div>
            <h2>{buyer.businessName}</h2>
            <h4>
              {buyer.firstName +
                " " +
                buyer.lastName +
                " | " +
                buyer.phone +
                " / " +
                buyer.businessPhone +
                " | " +
                buyer.email}
            </h4>
            <p>Posted On: {buyerBid.timeStamp}</p>
            <h5>Request Details: </h5>
            <p>Quality: {buyerBid.quality}</p>
            <p>Quantity: {buyerBid.quantity}</p>
            {buyerBid.price ? <p>Price: {buyerBid.price}</p> : null}
            <p>Payment In: {buyerBid.paymentIn}</p>
          </div>
          <div className="vertical"></div>
          <div>
            <h4>Your Quotation: </h4>
            <p>Quantity: {sellerBid.quantity}</p>
            <p>Price: {sellerBid.price}</p>
            <p>Delivery Date: {sellerBid.deliveryDate}</p>
            <p>Validity Period: {sellerBid.validityPeriod}</p>
            <p>Status: {sellerBid.status}</p>
          </div>
        </div>
      </div>
    );
  };

  openDelete = () => {
    this.setState({ deleteModal: true });
  };

  closeDelete = () => {
    this.setState({ deleteModal: false });
  };

  deleteSellerBid = (sellerBidId) => {
    this.props.DeleteSellerBid(sellerBidId);
    window.location.reload();
  };

  render() {
    const { mySellerBid, buyerBid, buyer, viewMore, deleteModal } = this.state;
    return (
      <div style={{ border: "1px red solid" }}>
        <p>{buyer.businessName}</p>
        <p>{"Quality: " + buyerBid.quality}</p>
        <p>{"Quantity: " + mySellerBid.quantity}</p>
        <p>{"Price: " + mySellerBid.price}</p>
        <p>{"Validity: " + mySellerBid.validityPeriod}</p>
        <p>{"Status: " + mySellerBid.status}</p>
        <button onClick={this.viewMore}>View More</button>
        <button onClick={this.openDelete}>Delete Bid</button>

        <Popup open={viewMore} onClose={this.closeView}>
          {this.renderViewMore(mySellerBid, buyerBid, buyer)}
        </Popup>

        <Popup open={deleteModal} onClose={this.closeDelete}>
          <div style={{ color: "black", textAlign: "center" }}>
            <h2>Are You Sure You Want to Delete?</h2>
            <button
              onClick={() => this.deleteSellerBid(mySellerBid.sellerBidId)}
            >
              Yes
            </button>
            <button onClick={this.closeDelete}>No</button>
          </div>
        </Popup>
      </div>
    );
  }
}

const mapStateToProps = ({ sellerBids }) => ({ sellerBids });
export default connect(mapStateToProps, { DeleteSellerBid })(SellerQuotedBids);
