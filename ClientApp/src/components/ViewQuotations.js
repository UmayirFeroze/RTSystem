import React, { Component } from "react";
import SellerPostedBids from "../components/SellerPostedBids";
import "../styles/ViewQuotations.css";

class ViewQuotations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buyerBid: {},
      sellerBids: [],
      users: [],
    };
  }

  componentDidMount() {
    const { buyerBid, sellerBids, users } = this.props;
    this.setState({
      buyerBid: buyerBid,
      sellerBids: sellerBids.filter(
        (sellerBid) => sellerBid.buyerBidId === buyerBid.buyerBidId
      ),
      users: users,
    });
  }

  closeViewParent = () => {
    this.props.closePopup();
  };

  render() {
    const { buyerBid, sellerBids } = this.state;

    return (
      <div className="viewQuotations">
        <div className="header">
          <h2>All Quotations for Your Request</h2>
          <button onClick={this.closeViewParent}>&times;</button>
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
                users={this.props.users}
              ></SellerPostedBids>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ViewQuotations;
