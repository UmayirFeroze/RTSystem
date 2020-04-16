import React, { Component } from "react";
import NavBar from "../components/Navbar";
import Header from "../components/Header";
import RequestedBuyerBid from "../components/RequestedBuyerBid";

import { getBuyerBidsByUserId } from "../actions/BuyerBidActions";
import { connect } from "react-redux";

class MyRequests extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myBids: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.props.getBuyerBidsByUserId();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.buyerBids.data !== this.props.buyerBids.data) {
      this.setState({ myBids: this.props.buyerBids.data });
    }
  }

  renderMyBids = (myBids) => {
    return (
      <div>
        {myBids.map((buyerBid) => (
          <RequestedBuyerBid key={buyerBid.buyerBidId} buyerBid={buyerBid} />
        ))}
      </div>
    );
  };

  render() {
    let content = this.props.buyerBids.loading ? (
      <p>Loading...</p>
    ) : this.state.myBids.length === 0 ? (
      <p>You haven't posted any Bids Yet</p>
    ) : (
      this.state.myBids.length > 0 && this.renderMyBids(this.state.myBids)
    );
    return (
      <div>
        <Header />
        <NavBar />
        <h1 style={{ color: "white" }}>My Requests</h1>
        <p style={{ color: "white" }}>
          All bids posted by buyer, and all bids posted by buyer for each seller
          bid
        </p>
        {/* Content comes here below */}
        <div
          style={{
            border: 1,
            borderColor: "red",
            borderStyle: "solid",
            padding: 20,
          }}
        >
          {content}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ buyerBids }) => ({
  buyerBids,
});

export default connect(mapStateToProps, { getBuyerBidsByUserId })(MyRequests);
