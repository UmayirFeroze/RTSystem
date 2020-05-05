import React, { Component } from "react";
import Popup from "reactjs-popup";
import ConfirmationPopup from "./ConfirmationPopup";
import SellerPostedBids from "./SellerPostedBids";

import { connect } from "react-redux";
import { GetAllSellerBids, UpdateSellerBid } from "../actions/SellerBidActions";
// import "../styles/IndividualBuyerRequestedBids.css";
import "../styles/IndividualBuyerBid.css";
import "../styles/ViewQuotations.css";

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
      viewQuotations: false,
      viewDelete: false,
      viewClose: false,
      value: "",
    };
  }

  componentDidMount() {
    let { buyerBid, users } = this.props;

    if (this.state.buyerBid !== buyerBid) {
      this.setState({ buyerBid: buyerBid });
    }

    this.setState({ users: users });

    this.props.GetAllSellerBids();
  }

  componentDidUpdate(prevProps) {
    if (this.state.buyerBid !== this.props.buyerBid) {
      this.setState({ buyerBid: this.props.buyerBid, viewQuotations: true });
    }

    if (
      prevProps.sellerBids.data !== this.props.sellerBids.data &&
      Array.isArray(this.props.sellerBids.data)
    ) {
      this.setState({
        sellerBids: this.props.sellerBids.data.filter(
          (sellerBid) => sellerBid.buyerBidId === this.props.buyerBid.buyerBidId
        ),
      });
    }
  }

  closeView = () => {
    this.setState({
      viewClose: false,
      viewDelete: false,
      viewQuotations: false,
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
      this.setState({ viewQuotations: true });
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

  handleSellerBidUpdate = (childData) => {
    const backupUpdate = this.state.sellerBids;
    backupUpdate.forEach((sellerBid) => {
      if (sellerBid.buyerBidId === childData.sellerBidId) {
        sellerBid.status = childData.status;
      }
    });
    this.props.UpdateSellerBid(childData);
    if (this.props.sellerBids.hasError) {
      this.setState({ sellerBids: backupUpdate });
    }
  };

  renderViewQuotations = (buyerBid, sellerBids) => {
    if (Array.isArray(sellerBids) && buyerBid !== null) {
      return (
        <div className="viewQuotations">
          <div className="header">
            <h2>All Quotations for Your Request</h2>
            <button onClick={this.closeView}>&times;</button>
          </div>

          <div className="container">
            <div className="buyerBidContainer">
              <h2>Your Request</h2>
              <p>
                <b>Quality:</b> {buyerBid.quality}
              </p>
              <p>
                <b>Quantity:</b> {buyerBid.quantity}
              </p>
              {buyerBid.price ? (
                <p>
                  <b>Price:</b> {buyerBid.price}
                </p>
              ) : null}
              <p>
                <b>Payment:</b> {buyerBid.paymentIn}
              </p>
            </div>

            <div className="vertical"></div>

            <div className="sellerBidContainer">
              {!sellerBids.length ? (
                <h2 style={{ textAlign: "center", marginTop: "auto" }}>
                  This bid does not have any quotations yet
                </h2>
              ) : (
                sellerBids.map((sellerBid) => (
                  <SellerPostedBids
                    key={sellerBid.sellerBidId}
                    sellerBid={sellerBid}
                    users={this.props.users}
                    updateSellerBid={this.handleSellerBidUpdate}
                  ></SellerPostedBids>
                ))
              )}
            </div>
          </div>
        </div>
      );
    }
  };

  render() {
    const {
      buyerBid,
      sellerBids,
      viewClose,
      viewDelete,
      viewQuotations,
    } = this.state;

    return (
      <div className="myRequestBuyerBid">
        {buyerBid.status === "open" ? (
          <div className="status" style={{ backgroundColor: "green" }}></div>
        ) : (
          <div className="status" style={{ backgroundColor: "grey" }}></div>
        )}
        <div className="bidDetails">
          <div>
            <p style={{ fontSize: 11 }}>Posted On:</p>
            <p>{new Date(buyerBid.timeStamp).toLocaleDateString()}</p>
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
          open={viewQuotations}
          onClose={this.closeView}
          contentStyle={{
            border: "none",
            backgroundColor: "inherit",
            width: "auto",
            height: "auto",
            position: "center",
          }}
        >
          {() => this.renderViewQuotations(buyerBid, sellerBids)}
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

const mapStateToProps = ({ sellerBids }) => ({ sellerBids });
export default connect(mapStateToProps, {
  GetAllSellerBids,
  UpdateSellerBid,
})(BuyerRequestBidIndividual);
