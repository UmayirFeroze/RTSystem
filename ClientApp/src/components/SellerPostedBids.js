import React, { Component } from "react";

import { connect } from "react-redux";
import { GetSellerBidByBuyerBid } from "../actions/SellerBidActions";

class SellerPostedBids extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sellerBids: [],
    };
  }

  componentDidMount() {
    const buyerBidId = this.props.buyerBid.buyerBidId;
    console.log("BuyerBidId: ", buyerBidId); // tbc
    // this.props.GetSellerBidByBuyerBid(buyerBidId);
  }

  //   componentDidUpdate(prevProps) {
  //     if (prevProps.sellerBids.data !== this.props.sellerBids.data) {
  //       this.setState({ sellerBids: this.props.sellerBids.data });
  //     }
  //   }

  renderPostedBids = () => {};

  render() {
    return (
      <div>
        <div>
          <h1> Bids </h1>
          <button>Edit</button>
          <button>Delete</button>
          <button>Close Bid</button>
        </div>
        {/* <div>{postedBids}</div> */}
      </div>
    );
  }
}

// const mapStateToProps = ({ sellerBids, buyerBids }) => ({
//   sellerBids,
//   buyerBids,
// });

// export default connect(mapStateToProps, { GetSellerBidByBuyerBid })(
//   SellerPostedBids
// );

export default SellerPostedBids;
