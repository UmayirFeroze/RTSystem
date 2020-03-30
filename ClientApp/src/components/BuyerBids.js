import React, { Component } from "react";

import { connect } from "react-redux";
import { getAllBids } from "../actions/BuyerBidActions";

import axios from "axios";

import "./../styles/BuyerBids.css";

export default class BuyerBids extends Component {
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
    this.populateAllPostedBuyerBids();
    // this.props.getAllBids();
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.postedBuyerBids.data !== this.props.postedBuyerBids.data) {
  //     this.setState({ postedBuyerBids: this.props.postedBuyerBids.data });
  //   }
  // }

  populateAllPostedBuyerBids = () => {
    axios
      .get("/api/buyerbid/getbuyerbids")
      .then(result => {
        const response = result.data;
        this.setState({
          postedBuyerBids: response,
          loading: false,
          failed: false,
          error: ""
        });
      })
      .catch(error => {
        this.setState({
          postedBuyerBids: [],
          loading: false,
          failed: true,
          error: error
        });
      });
  };

  renderAllPostedBuyerBids = postedBuyerBids => {
    return (
      <div>
        {/* If condition comes here to accomodate negotiated seller bids and buyer posted bids */}
        {postedBuyerBids.map(postedBuyerbid => (
          <div key={postedBuyerbid.buyerBidId} className="buyerBid">
            <p>
              Quality: {postedBuyerbid.quality} Quantity:{" "}
              {postedBuyerbid.quantity} Price: {postedBuyerbid.price}
            </p>
            <p>
              Payment In: {postedBuyerbid.paymentIn} Status:{" "}
              {postedBuyerbid.status}
            </p>
          </div>
        ))}
      </div>
    );
  };

  render() {
    let content = this.state.loading ? (
      <p>Loading...</p>
    ) : this.state.failed ? (
      <p>{this.state.error}</p>
    ) : (
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

// const mapStateToProps = ({ trips }) => ({
//   trips
// });

// export default connect(mapStateToProps, { getAllBids })(BuyerBids);
