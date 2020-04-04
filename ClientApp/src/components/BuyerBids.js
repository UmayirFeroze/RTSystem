import React, { Component } from "react";

import { connect } from "react-redux";
import { getAllBids } from "../actions/BuyerBidActions";
import "../reducers/buyerBidReducer";

// import axios from "axios";

import "./../styles/BuyerBids.css";

export class BuyerBids extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postedBuyerBids: [],
      loading: true,
      failed: false,
      error: ""
    };
  }

  componentDidMount() {
    this.props.getAllBids();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.buyerBids.data !== this.props.buyerBids.data) {
      this.setState({ postedBuyerBids: this.props.buyerBids.data });
    }
  }

  renderAllPostedBuyerBids = postedBuyerBids => {
    return (
      <div>
        {/* If condition comes here to accomodate negotiated seller bids and buyer posted bids */}
        {postedBuyerBids.map(buyerBid => (
          <div key={buyerBid.buyerBidId} className="buyerBid">
            <p>
              Quality: {buyerBid.quality} Quantity: {buyerBid.quantity} Price:{" "}
              {buyerBid.price}
            </p>
            <p>
              Payment In: {buyerBid.paymentIn} Status: {buyerBid.status}
            </p>
            <button>Make Bid</button>
          </div>
        ))}
      </div>
    );
  };

  render() {
    let content = this.props.buyerBids.loading ? (
      <p>Loading...</p>
    ) : this.state.failed ? (
      <p>{this.state.error}</p>
    ) : (
      this.state.postedBuyerBids.length &&
      this.renderAllPostedBuyerBids(this.state.postedBuyerBids)
    );
    return (
      <div>
        <h2>Dashboard</h2>
        <p>These organizations want to trade with you</p>
        {content}
      </div>
    );
  }
}

const mapStateToProps = ({ buyerBids }) => ({
  buyerBids
});

export default connect(mapStateToProps, { getAllBids })(BuyerBids);
