import React, { Component } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import SellerQuotedBids from "../components/SellerQuotedBids";

import { connect } from "react-redux";
import { GetSellerBidsByUserId } from "../actions/SellerBidActions";
import { getAllUsers } from "../actions/userAction";
import { getAllBids } from "../actions/BuyerBidActions";
import "../styles/IndividualSellerQuotedBids.css";
export class MyQuotations extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      sellerBids: [],
      acceptedSellerBids: [],
      rejectedSellerBids: [],
      negotiatedSellerBids: [],
      invalidSellerBids: [],
      pendingSellerBids: [],
      buyerBids: [],
      users: [],

      status: "allSellerBids",
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

  handleClick = (event) => {
    const { sellerBids } = this.state;
    //  function to query data
    function isValid(sellerBid) {
      if (sellerBid.status === event.target.name) {
        return true;
      }
    }

    if (event.target.name === "allSellerBids") {
      this.setState({ status: event.target.name });
    }
    if (event.target.name === "accepted") {
      this.setState({
        status: event.target.name,
        acceptedSellerBids: sellerBids.filter(isValid),
      });
    }
    if (event.target.name === "rejected") {
      this.setState({
        status: event.target.name,
        rejectedSellerBids: sellerBids.filter(isValid),
      });
    }
    if (event.target.name === "negotiated") {
      this.setState({
        status: event.target.name,
        negotiatedSellerBids: sellerBids.filter(isValid),
      });
    }
    if (event.target.name === "pending") {
      this.setState({
        status: event.target.name,
        pendingSellerBids: sellerBids.filter(isValid),
      });
    }
    if (event.target.name === "invalid") {
      this.setState({
        status: event.target.name,
        invalidSellerBids: sellerBids.filter(isValid),
      });
    }
  };

  renderSellerBids = (sellerBids, buyerBids, users) => {
    if (
      Array.isArray(sellerBids) &&
      Array.isArray(buyerBids) &&
      Array.isArray(users)
    ) {
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
    const {
      sellerBids,
      acceptedSellerBids,
      rejectedSellerBids,
      negotiatedSellerBids,
      pendingSellerBids,
      invalidSellerBids,
      users,
      buyerBids,
      status,
    } = this.state;

    let content =
      this.props.sellerBids.loading ||
      this.props.users.loading ||
      this.props.buyerBids.loading ? (
        <p>Loading...</p>
      ) : sellerBids.length && buyerBids.length && users.length ? (
        status === "allSellerBids" ? (
          this.renderSellerBids(sellerBids, buyerBids, users)
        ) : status === "accepted" ? (
          this.renderSellerBids(acceptedSellerBids, buyerBids, users)
        ) : status === "rejected" ? (
          this.renderSellerBids(rejectedSellerBids, buyerBids, users)
        ) : status === "negotiated" ? (
          this.renderSellerBids(negotiatedSellerBids, buyerBids, users)
        ) : status === "pending" ? (
          this.renderSellerBids(pendingSellerBids, buyerBids, users)
        ) : (
          this.renderSellerBids(invalidSellerBids, buyerBids, users)
        )
      ) : (
        <p>You have no quotations yet</p>
      );

    return (
      <div>
        <Header />
        <Navbar />
        <h1>My Quotations</h1>
        <p>All the seller bids posted by the auth user will appear here</p>
        <div>
          <div className="sidenav">
            <button name="allSellerBids" onClick={this.handleClick}>
              All Bids
            </button>
            <button name="pending" onClick={this.handleClick}>
              Pending
            </button>
            <button name="accepted" onClick={this.handleClick}>
              Accepted Bids
            </button>
            <button name="rejected" onClick={this.handleClick}>
              Rejected Bids
            </button>
            <button name="negotiated" onClick={this.handleClick}>
              Negotiated Bids
            </button>
            <button name="invalid" onClick={this.handleClick}>
              Expired Bids
            </button>
          </div>
          <div className="results">{content}</div>
        </div>
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
