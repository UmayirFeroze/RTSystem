import React, { Component } from "react";
import Popup from "reactjs-popup";
import SellerCreateBid from "./SellerCreateBid";

import { connect } from "react-redux";
import { getAuthUser } from "../actions/authAction";
import "../styles/IndividualBuyerBids.css";

class IndividualBuyerBid extends Component {
  constructor(props) {
    super(props);

    this.openMakeBid = this.openMakeBid.bind(this);
    this.closeMakeBid = this.closeMakeBid.bind(this);

    this.state = {
      buyerBid: [],
      buyer: [],

      seller: [],
      sellerBid: [],
      makeBid: false,
    };
  }

  componentDidMount() {
    console.log("Buyer:", this.props.buyer); // to be cleaned
    this.setState({ buyerBid: this.props.buyerBid, buyer: this.props.buyer });
    this.props.getAuthUser();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.authUser.data !== this.props.authUser.data) {
      this.setState({ seller: this.props.authUser.data });
    }
  }

  openMakeBid = () => {
    this.setState({ makeBid: true });
  };
  closeMakeBid = () => {
    this.setState({ makeBid: false });
  };

  render() {
    // console.log("State Check: ", this.state); // to be cleaned
    const { buyerBid, buyer, seller } = this.state;
    return (
      <div className="buyerBid">
        <div className="bidDetails">
          <h3>{buyer.businessName}</h3> {/*to be handled*/}
          <p>
            <b>Quality:</b> {buyerBid.quality} <b>Quantity:</b>{" "}
            {buyerBid.quantity} <b>Price:</b> {buyerBid.price}{" "}
          </p>
          <p>
            <b>Payment In:</b> {buyerBid.paymentIn}
          </p>
        </div>
        <div>
          <button onClick={this.openMakeBid}>Make Bid</button>
        </div>

        <Popup
          open={this.state.makeBid}
          onClose={this.closeMakeBid}
          contentStyle={{ border: "none", backgroundColor: "inherit" }}
        >
          <div className="sellerBidComponent">
            <SellerCreateBid
              buyerBid={buyerBid}
              buyer={buyer}
              seller={seller}
              closeMakeBid={this.closeMakeBid}
            />
          </div>
        </Popup>
      </div>
    );
  }
}

const mapStateToProps = ({ authUser }) => ({ authUser });
export default connect(mapStateToProps, { getAuthUser })(IndividualBuyerBid);
