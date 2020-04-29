import React, { Component } from "react";
import IndividualBuyerBid from "./IndividualBuyerBid";

// import "./../styles/BuyerBids.css";

export class BuyerBids extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buyerBids: [],
      users: [],
    };
  }

  componentDidMount() {
    console.log("Props Buyerbids: ", this.props.buyerBidsList); // tbc
    console.log("Props Users: ", this.props.usersList); // tbc
    this.setState({
      buyerBids: this.props.buyerBidsList.filter(
        (buyerBid) => buyerBid.status !== "closed"
      ),
      users: this.props.usersList,
    });
  }

  renderAllPostedBuyerBids = (buyerBids, users) => {
    if (Array.isArray(buyerBids) && Array.isArray(users)) {
      return buyerBids.map((buyerBid) => (
        <IndividualBuyerBid
          key={buyerBid.buyerBidId}
          buyerBid={buyerBid}
          buyer={users.find(({ userId }) => userId === buyerBid.userId)}
        />
      ));
    }
  };

  render() {
    const { buyerBids, users } = this.state;
    let content =
      buyerBids.length === 0 || users.length === 0 ? (
        <p>No one has posted any buyer bids yet</p>
      ) : (
        this.renderAllPostedBuyerBids(buyerBids, users)
      );

    console.log("State:", this.state.buyerBids);
    return (
      <div>
        <h2>Dashboard</h2>
        <p>These organizations want to trade with you</p>
        <div>{content}</div>
      </div>
    );
  }
}

export default BuyerBids;
