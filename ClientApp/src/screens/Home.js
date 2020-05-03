import React, { Component } from "react";
import NavBar from "../components/Navbar";
import BuyerCreateBid from "../components/BuyerCreateBid";
import YourProfile from "../components/YourProfile";
import BuyerBids from "../components/BuyerBids";
import Header from "../components/Header";

import { connect } from "react-redux";
import { getAllUsers } from "../actions/userAction";
import { getBuyerBidsNotByUserId } from "../actions/BuyerBidActions";

import "../styles/Home.css";

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buyerBids: [],
      users: [],
    };
  }

  componentDidMount() {
    this.props.getBuyerBidsNotByUserId();
    this.props.getAllUsers();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.buyerBids.data !== this.props.buyerBids.data) {
      this.setState({ buyerBids: this.props.buyerBids.data });
    }
    if (prevProps.users.data !== this.props.users.data) {
      this.setState({ users: this.props.users.data });
    }
  }

  renderBuyerBidsComponent = (buyerBids, users) => {
    if (Array.isArray(buyerBids) && Array.isArray(users)) {
      return <BuyerBids buyerBidsList={buyerBids} usersList={users} />;
    }
  };

  render() {
    const buyerBidsList =
      this.props.buyerBids.loading || this.props.users.loading ? (
        <p>Loading...</p>
      ) : this.state.buyerBids.length === 0 || this.state.users.length === 0 ? (
        <p>No one has posted any bids yet...</p>
      ) : (
        this.renderBuyerBidsComponent(this.state.buyerBids, this.state.users)
      );

    return (
      <div>
        <Header />
        <NavBar />
        <h1>Welcome To Trade Portal</h1>
        <div className="container">
          <div className="profile">
            <YourProfile />
          </div>
          <div className="bids">{buyerBidsList}</div>
          <div className="createBids">
            <BuyerCreateBid />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ buyerBids, users }) => ({ buyerBids, users });

export default connect(mapStateToProps, {
  getBuyerBidsNotByUserId,
  getAllUsers,
})(Home);
