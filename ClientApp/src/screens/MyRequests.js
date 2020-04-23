import React, { Component } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import BuyerRequestedBid from "../components/BuyerRequestBid";

import { connect } from "react-redux";
import { getBuyerBidsByUserId } from "../actions/BuyerBidActions";
import { GetAllSellerBids } from "../actions/SellerBidActions";

export class MyRequests extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buyerBids: [],
      sellerBids: [],
    };
  }

  componentDidMount() {
    this.props.getBuyerBidsByUserId();
    this.props.GetAllSellerBids();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.buyerBids.data !== this.props.buyerBids.data) {
      this.setState({ buyerBids: this.props.buyerBids.data });
    }
    if (prevProps.sellerBids.data !== this.props.sellerBids.data) {
      this.setState({ sellerBids: this.props.sellerBids.data });
    }
  }

  renderBuyerBids = (buyerBids, sellerBids) => {
    if (Array.isArray(buyerBids)) {
      return buyerBids.map((buyerBid) => (
        <BuyerRequestedBid
          key={buyerBid.buyerBidId}
          buyerBid={buyerBid}
          sellerBids={sellerBids}
        />
      ));
    }
  };

  render() {
    const buyerBids = this.props.buyerBids.loading ? (
      <p>Loading...</p>
    ) : this.state.buyerBids.length === 0 ? (
      <p>You havent Posted Any Bids Yet</p>
    ) : this.state.sellerBids.length === 0 ? (
      <p>No ONe has posted any bids yet</p>
    ) : (
      this.renderBuyerBids(this.state.buyerBids, this.state.sellerBids)
    );

    return (
      <div>
        <Header />
        <Navbar />
        <h1>My Requested Bids</h1>
        <p>All the bids i posted along with the respective seller Bids</p>

        <div
          style={{
            border: "1px solid blue",
            width: "max",
            height: "100%",
            padding: "10px",
          }}
        >
          {buyerBids}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ buyerBids, sellerBids }) => ({
  buyerBids,
  sellerBids,
});

export default connect(mapStateToProps, {
  getBuyerBidsByUserId,
  GetAllSellerBids,
})(MyRequests);
