import React, { Component } from "react";
import Popup from "reactjs-popup";
import SellerPostedBids from "../components/SellerPostedBids";

import { connect } from "react-redux";
import { DeleteBuyerBid, EditBuyerBid } from "../actions/BuyerBidActions";

class BuyerRequestedBid extends Component {
  constructor(props) {
    super(props);

    this.openView = this.openView.bind(this);
    this.closeView = this.closeView.bind(this);

    this.state = {
      buyerBid: [],
      sellerBids: [],
      users: [],

      status: "",

      viewSellerBid: false,
      viewDelete: false,
      viewClose: false,
    };
  }

  componentDidMount() {
    const { buyerBid, sellerBids, users } = this.props;
    if (this.state.sellerBids !== sellerBids) {
      this.setState({ buyerBid: buyerBid });
    }

    function isValid(sellerBid) {
      if (sellerBid.buyerBidId === buyerBid.buyerBidId) {
        return true;
      }
    }
    this.setState({ sellerBids: sellerBids.filter(isValid) });
    this.setState({ users: users });
  }

  renderSellerBids = (sellerBids, users) => {
    // console.log("SellerBids: ", sellerBids); // tbc

    if (Array.isArray(sellerBids)) {
      // Check for length and then display error if array is empty
      return sellerBids.map((sellerBid) => (
        <SellerPostedBids
          key={sellerBid.sellerBidId}
          sellerBid={sellerBid}
          users={users}
        ></SellerPostedBids>
      ));
    }
  };

  openView = (event) => {
    if (event.target.name === "close") {
      this.setState({ viewClose: true });
    }
    if (event.target.name === "delete") {
      this.setState({ viewDelete: true });
    }
    if (event.target.name === "sellerbids") {
      this.setState({ viewSellerBid: true });
    }
  };

  closeView = (event) => {
    this.setState({
      viewClose: false,
      viewDelete: false,
      viewSellerBid: false,
    });
  };

  renderDeleteBid = (buyerBidId) => {
    this.props.DeleteBuyerBid(buyerBidId);
    window.location.reload();
  };

  renderCloseBid = () => {
    this.setState({ status: "closed" }, this.closeBid());
  };

  closeBid = () => {
    let updateBid = {
      buyerBidId: this.state.buyerBid.buyerBidId,
      status: "closed",
    };
    this.props.EditBuyerBid(updateBid);
    // window.location.reload();
  };

  render() {
    const {
      buyerBid,
      sellerBids,
      users,
      viewSellerBid,
      viewClose,
      viewDelete,
    } = this.state;

    return (
      <div className="buyerBid" style={{ border: "1px solid red" }}>
        <p>
          {" ID:" +
            buyerBid.buyerBidId +
            " Quantity:" +
            buyerBid.quality +
            " Status:" +
            buyerBid.status}
        </p>

        <button name="sellerbids" onClick={this.openView}>
          View Quotations
        </button>
        <button name="close" onClick={this.openView}>
          Close Bid
        </button>
        <button name="delete" onClick={this.openView}>
          Delete Bid
        </button>

        <Popup open={viewSellerBid} onClose={this.closeView}>
          {() => this.renderSellerBids(sellerBids, users)}
        </Popup>

        <Popup open={viewClose} onClose={this.closeView}>
          <div>
            <h1 style={{ color: "black" }}>
              Are yoru sure you want to Close this bid?
            </h1>
            <button onClick={() => this.renderCloseBid(buyerBid.buyerBidId)}>
              Yes
            </button>
            <button onClick={this.closeView}>No</button>
          </div>
        </Popup>

        <Popup open={viewDelete} onClose={this.closeView}>
          <div>
            <h1 style={{ color: "black" }}>Are you sure you want to Delete?</h1>
            <button onClick={() => this.renderDeleteBid(buyerBid.buyerBidId)}>
              Yes
            </button>
            <button onClick={this.closeView}>No</button>
          </div>
        </Popup>
      </div>
    );
  }
}

const mapStateToProps = ({ buyerBids }) => ({ buyerBids });
export default connect(mapStateToProps, { DeleteBuyerBid, EditBuyerBid })(
  BuyerRequestedBid
);
