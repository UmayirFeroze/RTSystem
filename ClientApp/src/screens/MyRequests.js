import React, { Component } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

import { connect } from "react-redux";
import { getAllUsers } from "../actions/userAction";
import { getBuyerBidsByUserId } from "../actions/BuyerBidActions";
import { GetAllSellerBids } from "../actions/SellerBidActions";
import BuyerRequestBidIndividual from "../components/BuyerRequestBidIndividual";
import "../styles/IndividualBuyerRequestedBids.css";

export class MyRequests extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      buyerBids: [],
      openedBuyerBids: [],
      closedBuyerBids: [],
      sellerBids: [],
      users: [],
      status: "allBids",
    };
  }

  componentDidMount() {
    this.props.getBuyerBidsByUserId();
    this.props.GetAllSellerBids();
    this.props.getAllUsers();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.buyerBids.data !== this.props.buyerBids.data) {
      this.setState({ buyerBids: this.props.buyerBids.data });
    }
    if (prevProps.sellerBids.data !== this.props.sellerBids.data) {
      this.setState({ sellerBids: this.props.sellerBids.data });
    }
    if (prevProps.users.data !== this.props.users.data) {
      this.setState({ users: this.props.users.data });
    }
  }

  handleClick = (event) => {
    const { buyerBids } = this.state;

    // function to query buyer bids
    function isValid(buyerBid) {
      if (buyerBid.status === event.target.value) {
        return true;
      }
    }

    if (event.target.name === "allBids") {
      this.setState({ status: event.target.name });
    }
    if (event.target.name === "openedBids") {
      this.setState({
        status: event.target.name,
        openedBuyerBids: buyerBids.filter(isValid),
      });
    }
    if (event.target.name === "closedBids") {
      this.setState({
        status: event.target.name,
        closedBuyerBids: buyerBids.filter(isValid),
      });
    }
  };

  renderBuyerBids = (buyerBids, sellerBids, users) => {
    if (
      Array.isArray(buyerBids) &&
      Array.isArray(sellerBids) &&
      Array.isArray(users)
    ) {
      return buyerBids.map((buyerBid) => (
        <BuyerRequestBidIndividual
          key={buyerBid.buyerBidId}
          buyerBid={buyerBid}
          sellerBids={sellerBids}
          users={users}
        />
      ));
    }
  };

  render() {
    const {
      buyerBids,
      openedBuyerBids,
      closedBuyerBids,
      sellerBids,
      users,
      status,
    } = this.state;

    const buyerBidsRendered =
      this.props.buyerBids.loading ||
      this.props.sellerBids.loading ||
      this.props.users.loading ? (
        <p>Loading...</p>
      ) : buyerBids.length === 0 ||
        sellerBids.length === 0 ||
        users.length === 0 ? (
        <p>You havent Posted Any Bids Yet</p>
      ) : status === "allBids" ? (
        this.renderBuyerBids(buyerBids, sellerBids, users)
      ) : status === "openedBids" ? (
        this.renderBuyerBids(openedBuyerBids, sellerBids, users)
      ) : (
        this.renderBuyerBids(closedBuyerBids, sellerBids, users)
      );
    console.log("Test: ", this.state); // to be cleaned
    return (
      <div>
        <Header />
        <Navbar />
        <h1>My Requested Bids</h1>
        <div>
          <div className="sidenav">
            <button name="allBids" value="allBids" onClick={this.handleClick}>
              All My Bids
            </button>
            <button name="openedBids" value="open" onClick={this.handleClick}>
              Opened Bids
            </button>
            <button name="closedBids" value="closed" onClick={this.handleClick}>
              Closed Bids
            </button>
          </div>
          <div className="results">{buyerBidsRendered}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ buyerBids, sellerBids, users }) => ({
  buyerBids,
  sellerBids,
  users,
});

export default connect(mapStateToProps, {
  getBuyerBidsByUserId,
  GetAllSellerBids,
  getAllUsers,
})(MyRequests);
