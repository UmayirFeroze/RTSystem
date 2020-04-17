import React, { Component } from "react";
import NavBar from "../components/Navbar";
import Header from "../components/Header";

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
        {/* If condition comes here to accomodate negotiated seller bids and buyer posted bids */}
        {myBids.map((buyerBid) => (
          <div
            key={buyerBid.buyerBidId}
            className="buyerBid"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <p>Post Date will come here</p>
              <p>
                Quality: {buyerBid.quality} Quantity: {buyerBid.quantity}{" "}
              </p>
              <p>
                Price:
                {buyerBid.price} Payment In: {buyerBid.paymentIn}{" "}
              </p>
              <p>Status: {buyerBid.status}</p>
            </div>
            <div style={{ float: "right" }}>
              <button>View Bidders</button>
            </div>
          </div>
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
        <h1 style={{ color: "white" }}>My Bids</h1>
        <p style={{ color: "white" }}>
          All bids posted by buyer, and all bids posted by buyer for each seller
          bid
        </p>
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
