import React, { Component } from "react";
import Popup from "reactjs-popup";
import SellerPostedBids from "./SellerPostedBids";
class RequestedBuyerBid extends Component {
  constructor(props) {
    super(props);

    this.OpenPopup = this.OpenPopup.bind(this);
    this.ClosePopup = this.ClosePopup.bind(this);

    this.state = {
      buyerBid: [],
      showModal: false,
    };
  }

  OpenPopup = () => {
    this.setState({ showModal: true });
  };
  ClosePopup = () => {
    this.setState({ showModal: false });
  };

  PopUp = () => {};

  render() {
    const { buyerBid } = this.props;
    return (
      <div>
        <div key={buyerBid.buyerBidId}>
          <p>
            Quality: {buyerBid.quality} Quantity: {buyerBid.quantity} Price:{" "}
            {buyerBid.price}
          </p>
          <p>
            Payment In: {buyerBid.paymentIn} Status: {buyerBid.status}
          </p>
          <button onClick={this.OpenPopup}>View Requests</button>
          <Popup open={this.state.showModal} close={this.ClosePopup}>
            <SellerPostedBids buyerBid={buyerBid} />
          </Popup>
        </div>
      </div>
    );
  }
}

export default RequestedBuyerBid;
