import React, { Component } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import BuyerRequestBidIndividual from "../components/BuyerRequestBidIndividual";

import { connect } from "react-redux";
import { getAllUsers } from "../actions/userAction";
import {
  getBuyerBidsByUserId,
  DeleteBuyerBid,
  EditBuyerBid,
} from "../actions/BuyerBidActions";
import "../styles/IndividualBuyerRequestedBids.css";

import "../styles/ThemePage.css";

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
        this.setState({ sellerBids: backupUpdate });
      }
    }
  };

  renderBuyerBids = (buyerBids, users) => {
    if (Array.isArray(buyerBids) && Array.isArray(users)) {
      return buyerBids.map((buyerBid) => (
        <BuyerRequestBidIndividual
          key={buyerBid.buyerBidId}
          parentCallback={this.callbackFunction}
          buyerBid={buyerBid}
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
      users,
      status,
    } = this.state;

    const propsLoadingCheck =
      this.props.buyerBids.loading || this.props.users.loading ? true : false;

    const propsLengthCheck =
      this.props.buyerBids.length || this.props.users.length ? true : false;

    const stateLengthCheck =
      Array.isArray(buyerBids) &&
      Array.isArray(openedBuyerBids) &&
      Array.isArray(closedBuyerBids) &&
      Array.isArray(users)
        ? buyerBids.length &&
          openedBuyerBids.length &&
          closedBuyerBids.length &&
          users.length
          ? true
          : false
        : false;

    const buyerBidsRendered = propsLoadingCheck ? (
      <p>Loading...</p>
    ) : propsLengthCheck && !stateLengthCheck ? (
      <p>You havent Posted Any Requests Yet</p>
    ) : status === "allBids" ? (
      this.renderBuyerBids(buyerBids, users)
    ) : status === "openedBids" ? (
      this.renderBuyerBids(openedBuyerBids, users)
    ) : (
      this.renderBuyerBids(closedBuyerBids, users)
    );

    return (
      <div className="themePage">
        <Header />
        <Navbar />
        <h1 style={{ paddingLeft: 10 }}>My Requested</h1>
        <div className="container">
          <div className="sideNav">
            <button name="allBids" value="allBids" onClick={this.handleClick}>
              All Requests
            </button>
            <button name="openedBids" value="open" onClick={this.handleClick}>
              Open
            </button>
            <button name="closedBids" value="closed" onClick={this.handleClick}>
              Closed
            </button>
          </div>

          <div className="data">{buyerBidsRendered}</div>
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
  getAllUsers,
  EditBuyerBid,
  DeleteBuyerBid,
})(MyRequests);
