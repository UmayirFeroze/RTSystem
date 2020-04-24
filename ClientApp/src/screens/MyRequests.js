import React, { Component } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import BuyerRequestedBids from "../components/BuyerRequestBids";

import { connect } from "react-redux";
import { getAllUsers } from "../actions/userAction";
import { getBuyerBidsByUserId } from "../actions/BuyerBidActions";
import { GetAllSellerBids } from "../actions/SellerBidActions";

export class MyRequests extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buyerBids: [],
      sellerBids: [],
      users: [],
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

  // renderBuyerBids = (buyerBids, sellerBids, users) => {
  //   if (Array.isArray(buyerBids)) {
  //     return buyerBids.map((buyerBid) => (
  //       <BuyerRequestedBid
  //         key={buyerBid.buyerBidId}
  //         buyerBidId={buyerBid.buyerBidId}
  //         buyerBidList={buyerBids}
  //         sellerBids={sellerBids}
  //         users={users}
  //       />
  //     ));
  //   }
  // };

  render() {
    // console.log("Check BuyerBids: ", this.props.buyerBids); //tbc
    const { sellerBids, buyerBids, users } = this.state;
    const buyerBidsRendered = this.props.buyerBids.loading ? (
      <p>Loading...</p>
    ) : this.state.buyerBids.length === 0 ? (
      <p>You havent Posted Any Bids Yet</p>
    ) : this.state.sellerBids.length === 0 ? (
      <p>No ONe has posted any bids yet</p>
    ) : this.state.users.length === 0 ? (
      <p>Loading Users...</p>
    ) : (
      // this.renderBuyerBids(
      //   this.state.buyerBids,
      //   this.state.sellerBids,
      //   this.state.users
      // )
      <BuyerRequestedBids
        buyerBidList={buyerBids}
        sellerBidList={sellerBids}
        userList={users}
      />
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
            padding: "10px",
          }}
        >
          {buyerBidsRendered}
          {/* Bring the buyer Bid component over here and pass all the parameters through */}
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
