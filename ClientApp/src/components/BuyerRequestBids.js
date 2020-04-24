import React, { Component } from "react";
import BuyerRequestBidIndividual from "./BuyerRequestBidIndividual";

class BuyerRequestedBids extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buyerBids: [],
      sellerBids: [],
      users: [],
    };
  }

  componentDidMount() {
    const { buyerBidList, sellerBidList, userList } = this.props;
    const { buyerBids, sellerBids, users } = this.state;
    if (buyerBids !== buyerBidList) {
      this.setState({ buyerBids: buyerBidList });
    }
    if (sellerBids !== sellerBidList) {
      this.setState({ sellerBids: sellerBidList });
    }
    if (users !== userList) {
      this.setState({ users: userList });
    }
  }

  renderBuyerBids = (buyerBids, sellerBids, users) => {
    if (Array.isArray(buyerBids)) {
      return buyerBids.map((buyerBid) => (
        <BuyerRequestBidIndividual
          key={buyerBid.buyerBidId}
          sellerBids={sellerBids}
          buyerBid={buyerBid}
          users={users}
        />
      ));
    }
  };

  render() {
    const { buyerBids, sellerBids, users } = this.state;

    const buyerBidList =
      buyerBids.length === 0 ? (
        <p>You havent posted any requests</p>
      ) : sellerBids.length === 0 ? (
        <p>No has posted any quotations yet</p>
      ) : users.length === 0 ? (
        <p>Loading Users...</p>
      ) : (
        this.renderBuyerBids(buyerBids, sellerBids, users)
      );
    return <div>{buyerBidList}</div>;
  }
}

export default BuyerRequestedBids;
