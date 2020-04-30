import React, { Component } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import BuyerRequestBidIndividual from "../components/BuyerRequestBidIndividual";

import { connect } from "react-redux";
import { getAllUsers } from "../actions/userAction";
import { GetAllSellerBids } from "../actions/SellerBidActions";
import {
  getBuyerBidsByUserId,
  DeleteBuyerBid,
  EditBuyerBid,
} from "../actions/BuyerBidActions";
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
    let buyerBidsList = this.props.buyerBids.data;

    if (prevProps.buyerBids.data !== this.props.buyerBids.data) {
      if (Array.isArray(buyerBidsList)) {
        this.setState({
          buyerBids: this.props.buyerBids.data,
          openedBuyerBids: buyerBidsList.filter(
            (buyerBid) => buyerBid.status === "open"
          ),
          closedBuyerBids: buyerBidsList.filter(
            (buyerBid) => buyerBid.status === "closed"
          ),
        });
      }
    }
    if (prevProps.sellerBids.data !== this.props.sellerBids.data) {
      this.setState({ sellerBids: this.props.sellerBids.data });
    }
    if (prevProps.users.data !== this.props.users.data) {
      this.setState({ users: this.props.users.data });
    }
  }

  handleClick = (event) => {
    if (event.target.name === "allBids") {
      this.setState({ status: event.target.name });
    }
    if (event.target.name === "openedBids") {
      this.setState({
        status: event.target.name,
      });
    }
    if (event.target.name === "closedBids") {
      this.setState({
        status: event.target.name,
      });
    }
  };

  callbackFunction = (childData) => {
    const { buyerBids, openedBuyerBids, closedBuyerBids } = this.state;

    if (childData.status === "delete") {
      const backUpDeleteAllBids = buyerBids; // state before deleting anything
      const backUpDeleteOpen = openedBuyerBids;
      const backUpDeleteClosed = closedBuyerBids;

      this.setState({
        // state after item deleted
        buyerBids: backUpDeleteAllBids.filter(
          (buyerBid) => buyerBid.buyerBidId !== childData.buyerBidId
        ),
        openedBuyerBids: backUpDeleteOpen.filter(
          (buyerBid) => buyerBid.buyerBidId !== childData.buyerBidId
        ),
        closedBuyerBids: backUpDeleteClosed.filter(
          (buyerBid) => buyerBid.buyerBidId !== childData.buyerBidId
        ),
      });

      this.props.DeleteBuyerBid(childData.buyerBidId);
      if (this.props.buyerBids.hasError) {
        this.setState({ buyerBids: backUpDeleteAllBids });
      }
    }

    if (childData.status === "closed") {
      const backupUpdate = buyerBids;
      const backupUpdateOpen = openedBuyerBids;

      // In all Bids
      backupUpdate.forEach((buyerBid) => {
        if (buyerBid.buyerBidId === childData.buyerBidId) {
          buyerBid.status = childData.status;
        }
      });
      // remove item if it is closed
      this.setState({
        openedBuyerBids: backupUpdateOpen.filter(
          (buyerBid) => buyerBid.buyerBidId !== childData.buyerBidId
        ),
        closedBuyerBids: backupUpdate.filter(
          (buyerBid) => buyerBid.status === "closed"
        ),
      });

      this.props.EditBuyerBid(childData);
      if (this.props.buyerBids.hasError) {
        this.setState({ buyerBids: backupUpdate });
      }
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
          parentCallback={this.callbackFunction}
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

    const propsLoadingCheck =
      this.props.buyerBids.loading ||
      this.props.sellerBids.loading ||
      this.props.users.loading
        ? true
        : false;

    const propsLengthCheck =
      this.props.buyerBids.length ||
      this.props.sellerBids.length ||
      this.props.users.length
        ? true
        : false;

    const stateLengthCheck =
      Array.isArray(buyerBids) &&
      Array.isArray(openedBuyerBids) &&
      Array.isArray(closedBuyerBids) &&
      Array.isArray(users) &&
      Array.isArray(sellerBids)
        ? buyerBids.length &&
          openedBuyerBids.length &&
          closedBuyerBids.length &&
          users.length &&
          sellerBids.length
          ? true
          : false
        : false;

    const buyerBidsRendered = propsLoadingCheck ? (
      <p>Loading...</p>
    ) : propsLengthCheck && stateLengthCheck ? (
      <p>You havent Posted Any Bids Yet</p>
    ) : status === "allBids" ? (
      this.renderBuyerBids(buyerBids, sellerBids, users)
    ) : status === "openedBids" ? (
      this.renderBuyerBids(openedBuyerBids, sellerBids, users)
    ) : (
      this.renderBuyerBids(closedBuyerBids, sellerBids, users)
    );

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
  EditBuyerBid,
  DeleteBuyerBid,
})(MyRequests);
