import React, { Component } from "react";
import Popup from "reactjs-popup";

import { getAuthUser } from "../actions/authAction";
import SellerCreateBid from "./SellerCreateBid";
import { connect } from "react-redux";

class IndividualBuyerBid extends Component {
  constructor(props) {
    super(props);

    this.OpenModal = this.OpenModal.bind(this);
    this.CloseModal = this.CloseModal.bind(this);

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

  OpenModal = () => {
    this.setState({ showModal: true });
  };

  CloseModal = () => {
    this.setState({ showModal: false });
  };

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
        <button onClick={this.OpenModal}>Make Bid</button>

        <Popup open={this.state.showModal}>
          <div className="sellerBidComponent">
            <div className="sellerBidComponentHeader">
              <p>Quote Your Offer</p>
              <span onClick={this.CloseModal}>&times;</span>
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
