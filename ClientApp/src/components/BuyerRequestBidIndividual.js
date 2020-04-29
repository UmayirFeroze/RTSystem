import React, { Component } from "react";
import Popup from "reactjs-popup";
import SellerPostedBids from "./SellerPostedBids";

import { connect } from "react-redux";
import { DeleteBuyerBid, EditBuyerBid } from "../actions/BuyerBidActions";
import "../styles/IndividualBuyerRequestedBids.css";

class BuyerRequestBidIndividual extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.closeView = this.closeView.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.closeBid = this.closeBid.bind(this);

    this.state = {
      buyerBid: {},
      sellerBids: [],
      users: [],
      status: "",
      viewSellerBid: false,
      viewDelete: false,
      viewClose: false,
    };
  }

  componentDidMount() {
    let { buyerBid, sellerBids, users } = this.props;
    //   function to query seller bids by buyer bid Id
    function isValid(sellerBid) {
      if (sellerBid.buyerBidId === buyerBid.buyerBidId) {
        return true;
      }
    }
    if (this.state.buyerBid !== buyerBid) {
      this.setState({ buyerBid: buyerBid });
    }
    this.setState({ sellerBids: sellerBids.filter(isValid) });
    this.setState({ users: users });
  }

  renderSellerBids = (sellerBids, users) => {
    if (Array.isArray(sellerBids)) {
      if (sellerBids.length === 0) {
        return (
          <div style={{ color: "black" }}>
            <h2>This Request has No Quotations Yet</h2>
            <button onClick={this.closeView}>&times;</button>
          </div>
        );
      } else {
        return sellerBids.map((sellerBid) => (
          <SellerPostedBids
            key={sellerBid.sellerBidId}
            sellerBid={sellerBid}
            users={users}
          ></SellerPostedBids>
        ));
      }
    }
  };

  closeView = () => {
    this.setState({
      viewClose: false,
      viewDelete: false,
      viewSellerBid: false,
    });
  };

  handleChange = (event) => {
    if (event.target.name === "closebid") {
      this.setState({
        viewClose: true,
      });
    }
    if (event.target.name === "deletebid") {
      this.setState({ viewDelete: true });
    }
    if (event.target.name === "sellerbids") {
      this.setState({ viewSellerBid: true });
    }
  };

  closeBid = () => {
    const { buyerBid } = this.state;
    this.setState(
      { status: "closed", buyerBid: { ...buyerBid, status: "closed" } },
      this.updateStatus
    );
  };
  updateStatus = () => {
    const { buyerBid, status } = this.state;

    let updateBid = { buyerBidId: buyerBid.buyerBidId, status: status };
    this.props.EditBuyerBid(updateBid);

    console.log("BuyerBids Status: ", this.state.buyerBid.status);
    // window.location.reload();
  };

  handleDelete = () => {
    const { buyerBid } = this.state;
    console.log("Deleting Bid: ", buyerBid.buyerBidId);
    this.props.DeleteBuyerBid(buyerBid.buyerBidId);
    window.location.reload();
  };

  render() {
    const {
      buyerBid,
      sellerBids,
      users,
      viewClose,
      viewDelete,
      viewSellerBid,
    } = this.state;

    return (
      <div className="buyerRequestBid">
        <div className="bidDetails">
          <div>
            <p>
              <b>Status: </b> {buyerBid.status}
            </p>
          </div>
          <div>
            <p>
              <b>Posted on: {buyerBid.timeStamp}</b>
            </p>
          </div>
          <div>
            <p>
              <b>Quality: </b>
              {buyerBid.quality}
            </p>
            <p>
              <b>Quantity: </b>
              {buyerBid.quantity}
            </p>
          </div>
        </div>
        <div className="bidOperations">
          <button name="sellerbids" onClick={this.handleChange}>
            View Quotations
          </button>
          <button name="closebid" onClick={this.handleChange}>
            Close Bid
          </button>
          <button name="deletebid" onClick={this.handleChange}>
            Delete Bid
          </button>
        </div>

        <Popup open={viewSellerBid} onClose={this.closeView}>
          {() => this.renderSellerBids(sellerBids, users)}
        </Popup>

        <Popup
          open={viewClose}
          onClose={this.closeView}
          contentStyle={{ border: "none", backgroundColor: "#1f1e1e" }}
        >
          <div className="confirmPopup">
            <h1>Are your sure you want to Close this bid?</h1>
            <div className="buttons">
              <button onClick={this.closeBid} name="yes">
                Yes
              </button>
              <button onClick={this.closeView} name="no">
                No
              </button>
            </div>
          </div>
        </Popup>

        <Popup
          open={viewDelete}
          onClose={this.closeView}
          contentStyle={{
            border: "none",
            backgroundColor: "#1f1e1e",
          }}
        >
          <div className="confirmPopup">
            <h1>Are you sure you want to Delete?</h1>
            <div className="buttons">
              <button onClick={this.handleDelete} name="yes">
                Yes
              </button>
              <button onClick={this.closeView} name="no">
                No
              </button>
            </div>
          </div>
        </Popup>
      </div>
    );
  }
}

const mapStateToProps = ({ buyerBids }) => ({ buyerBids });
export default connect(mapStateToProps, { DeleteBuyerBid, EditBuyerBid })(
  BuyerRequestBidIndividual
);
