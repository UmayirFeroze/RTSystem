import React, { Component } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import SellerQuotedBids from "../components/SellerQuotedBids";

import { connect } from "react-redux";
import { GetSellerBidsByUserId } from "../actions/SellerBidActions";
import { getAllUsers } from "../actions/userAction";
import { getAllBids } from "../actions/BuyerBidActions";

export class MyQuotations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sellerBids: [],
      buyerBids: [],
      users: [],
    };
  }

  componentDidMount() {
    this.props.GetSellerBidsByUserId();
    this.props.getAllBids();
    this.props.getAllUsers();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.sellerBids.data !== this.props.sellerBids.data) {
      this.setState({ sellerBids: this.props.sellerBids.data });
    }
    if (prevProps.buyerBids.data !== this.props.buyerBids.data) {
      this.setState({ buyerBids: this.props.buyerBids.data });
    }
    if (prevProps.users.data !== this.props.users.data) {
      this.setState({ users: this.props.users.data });
    }
  }

  renderSellerBids = (sellerBids, users, buyerBids) => {
    if (Array.isArray(sellerBids)) {
      return sellerBids.map((sellerBid) => (
        <SellerQuotedBids
          key={sellerBid.sellerBidId}
          sellerBid={sellerBid}
          buyerBids={buyerBids}
          users={users}
        />
      ));
    }
  };

  render() {
    const { sellerBids, users, buyerBids } = this.state;
    let content =
      this.props.sellerBids.loading ||
      this.props.users.loading ||
      this.props.buyerBids.loading ? (
        <p>Loading...</p>
      ) : sellerBids.length === 0 ||
        buyerBids.length === 0 ||
        users.length === 0 ? (
        <p>You have not Posted Any Seller Bid Yet</p>
      ) : (
        this.renderSellerBids(sellerBids, users, buyerBids)
      );

    return (
      <div>
        <Header />
        <Navbar />
        <h1>My Quotations</h1>
        <p>All the seller bids posted by the auth user will appear here</p>
        <div>{content}</div>
      </div>
    );
  }
}

const mapStateToProps = ({ sellerBids, buyerBids, users }) => ({
  sellerBids,
  buyerBids,
  users,
});

export default connect(mapStateToProps, {
  GetSellerBidsByUserId,
  getAllBids,
  getAllUsers,
})(MyQuotations);
