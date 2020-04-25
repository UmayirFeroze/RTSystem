import React, { Component } from "react";
import Popup from "reactjs-popup";

import { getAuthUser } from "../actions/authAction";
import SellerCreateBid from "./SellerCreateBid";
import { connect } from "react-redux";

class IndividualBuyerBid extends Component {
  constructor(props) {
    super(props);

    this.openMakeBid = this.openMakeBid.bind(this);
    this.closeMakeBid = this.closeMakeBid.bind(this);

    this.state = {
      buyerBid: [],
      user: [],
      sellerBid: [],
      makeBid: false,
    };
  }

  componentDidMount() {
    this.setState({ buyerBid: this.props.buyerBid });

    const user = this.props.getAuthUser();
    this.setState({ user: user });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.authUser.data !== this.props.authUser.data) {
      this.setState({ user: this.props.authUser.data });
    }
  }

  openMakeBid = () => {
    this.setState({ makeBid: true });
  };
  closeMakeBid = () => {
    this.setState({ makeBid: false });
  };

  render() {
    const { buyerBid } = this.state;
    console.log("State Check: ", this.state);
    return (
      <div className="buyerBid">
        <p>
          Quality: {buyerBid.quality} Quantity: {buyerBid.quantity} Price:{" "}
          {buyerBid.price}
        </p>
        <p>
          Payment In: {buyerBid.paymentIn} Status: {buyerBid.status}
        </p>
        <button onClick={this.openMakeBid}>Make Bid</button>

        <Popup open={this.state.makeBid} onClose={this.closeMakeBid}>
          <div className="sellerBidComponent">
            <div className="sellerBidComponentHeader">
              <p>Quote Your Offer</p>
              <button onClick={this.closeMakeBid}>&times;</button>
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

const mapStateToProps = ({ authUser }) => ({ authUser });
export default connect(mapStateToProps, { getAuthUser })(IndividualBuyerBid);
