import React, { Component } from "react";

class DetailedQuotationPopup extends Component {
  constructor(props) {
    super(props);

    this.state = { sellerBid: [], buyerBid: [], buyer: [] };
  }

  componentDidMount() {
    const { sellerBid, buyerBid, buyer } = this.props;
    this.setState({ sellerBid: sellerBid, buyerBid: buyerBid, buyer: buyer });
  }
  componentDidUpdate() {}

  render() {
    const { buyerBid, sellerBid, buyer } = this.props;
    return (
      <div className="viewBody">
        <div className="viewBuyerBid">
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
          <h3>Request Details: </h3>

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
            {" "}
            <b>Payment In:</b> {buyerBid.paymentIn}
          </p>
        </div>
        <div className="vertical"></div>

        <div className="viewSellerBid">
          <h3>Your Quotation: </h3>

          <p>
            <b>Quantity:</b> {sellerBid.quantity}
          </p>
          <p>
            <b>Price:</b> {sellerBid.price}
          </p>
          <p>
            <b>Delivery Date:</b> {sellerBid.deliveryDate}
          </p>
          <p>
            <b>Validity Period:</b> {sellerBid.validityPeriod}
          </p>
          <p>
            <b>Status:</b> {sellerBid.status}
          </p>
        </div>
      </div>
    );
  }
}

export default DetailedQuotationPopup;
