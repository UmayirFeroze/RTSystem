import React, { Component } from "react";
import IndividualBuyerBid from "./IndividualBuyerBid";

export class BuyerBids extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buyerBids: [],
      users: [],
    };
  }

  componentDidMount() {
    this.setState({
      buyerBids: this.props.buyerBidsList.filter(
        (buyerBid) => buyerBid.status !== "closed"
      ),
      users: this.props.usersList,
    });
  }

  renderAllPostedBuyerBids = (buyerBids, users) => {
    if (Array.isArray(buyerBids)) {
      if (Array.isArray(users)) {
        return buyerBids.map((buyerBid) => (
          <IndividualBuyerBid
            key={buyerBid.buyerBidId}
            buyerBid={buyerBid}
            buyer={users.find(({ userId }) => userId === buyerBid.userId)}
          />
        ));
      } else if (users !== null || users !== undefined) {
        return buyerBids.map((buyerBid) => (
          <IndividualBuyerBid
            key={buyerBid.buyerBidId}
            buyerBid={buyerBid}
            buyer={users}
          />
        ));
      }
    }
  };

  render() {
    const { buyerBids, users } = this.state;
    let content =
      buyerBids.length && (users.length || !users.length) ? (
        this.renderAllPostedBuyerBids(buyerBids, users)
      ) : (
        <p>No one has posted any buyer bids yet</p>
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

export default BuyerBids;
