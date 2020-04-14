import React, { Component } from "react";
import Popup from "reactjs-popup";

import { getUserByUserId } from "../actions/userAction";
import { getAuthUser } from "../actions/authAction";
import SellerCreateBid from "./SellerCreateBid";
import { connect } from "react-redux";

class IndividualBuyerBid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buyerBid: [],
      user: [],
      sellerBid: [],
      showModal: false,
    };
  }

  componentDidMount() {
    const buyerBidTaken = this.props.buyerBid;
    this.setState({ buyerBid: buyerBidTaken });

    const user = this.props.getAuthUser();
    this.setState({ user: user });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.authUser.data !== this.props.authUser.data) {
      this.setState({ user: this.props.authUser.data });
    }
  }

  render() {
    const { buyerBid } = this.state;
    return (
      <div key={buyerBid.buyerBidId} className="buyerBid">
        <p>
          Quality: {buyerBid.quality} Quantity: {buyerBid.quantity} Price:{" "}
          {buyerBid.price}
        </p>
        <p>
          Payment In: {buyerBid.paymentIn} Status: {buyerBid.status}
        </p>
        <Popup
          modal
          trigger={<button>Make Bid</button>}
          closeOnDocumentClick
          contentStyle={{
            border: "none",
            padding: 0,
            border: 1,
            borderColor: "white",
            borderStyle: "solid",
          }}
        >
          <div className="sellerBidComponent">
            <div className="sellerBidComponentHeader">
              <p>Quote Your Offer</p>
              {/* <span>&times;</span> */}
            </div>
            <div>
              <SellerCreateBid buyerBid={buyerBid} user={this.state.user} />
            </div>
          </div>
        </Popup>
      </div>
    );
  }
}

const mapStateToProps = ({ authUser }) => ({
  authUser,
});

export default connect(mapStateToProps, { getAuthUser })(IndividualBuyerBid);
