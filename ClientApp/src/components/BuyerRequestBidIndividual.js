import React, { Component } from "react";
import Popup from "reactjs-popup";
import ViewQuotations from "./ViewQuotations";
import ConfirmationPopup from "./ConfirmationPopup";
import "../styles/IndividualBuyerRequestedBids.css";

class BuyerRequestBidIndividual extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.closeView = this.closeView.bind(this);
    this.closeBid = this.closeBid.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.state = {
      buyerBid: {},
      sellerBids: [],
      users: [],
      status: "",
      viewSellerBid: false,
      viewDelete: false,
      viewClose: false,
      value: "",
    };
  }

  componentDidMount() {
    let { buyerBid, sellerBids, users } = this.props;

    if (this.state.buyerBid !== buyerBid) {
      this.setState({ buyerBid: buyerBid });
    }
    this.setState({
      sellerBids: sellerBids.filter(
        (sellerBid) => sellerBid.buyerBidId === buyerBid.buyerBidId
      ),
    });
    this.setState({ users: users });
  }

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
        status: "closed",
        value: event.target.value,
      });
    }
    if (event.target.name === "deletebid") {
      this.setState({
        viewDelete: true,
        status: "delete",
        value: event.target.value,
      });
    }
    if (event.target.name === "sellerbids") {
      this.setState({ viewSellerBid: true });
    }
  };

  closeBid = () => {
    const { buyerBid, status } = this.state;
    let updateBid = { buyerBidId: buyerBid.buyerBidId, status: status };
    this.props.parentCallback(updateBid);
  };

  handleDelete = () => {
    const { buyerBid, status } = this.state;
    let deleteObject = { buyerBidId: buyerBid.buyerBidId, status: status };
    this.props.parentCallback(deleteObject);
  };

  render() {
    const {
      buyerBid,
      sellerBids,
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
          <button name="closebid" value="close" onClick={this.handleChange}>
            Close Bid
          </button>
          <button name="deletebid" value="delete" onClick={this.handleChange}>
            Delete Bid
          </button>
        </div>

        <Popup
          open={viewSellerBid}
          onClose={this.closeView}
          contentStyle={{
            border: "none",
            backgroundColor: "inherit",
            width: "auto",
            height: "auto",
            position: "center",
          }}
        >
          <ViewQuotations
            closePopup={this.closeView}
            buyerBid={buyerBid}
            sellerBids={sellerBids}
            users={this.props.users}
          />
        </Popup>

        <Popup
          open={viewClose}
          onClose={this.closeView}
          contentStyle={{ border: "none", backgroundColor: "#1f1e1e" }}
        >
          <ConfirmationPopup
            status={this.state.value}
            yesFunction={this.closeBid}
            noFunction={this.closeView}
          />
        </Popup>

        <Popup
          open={viewDelete}
          onClose={this.closeView}
          contentStyle={{
            border: "none",
            backgroundColor: "#1f1e1e",
          }}
        >
          <ConfirmationPopup
            status={this.state.value}
            yesFunction={this.handleDelete}
            noFunction={this.closeView}
          />
        </Popup>
      </div>
    );
  }
}

export default BuyerRequestBidIndividual;
