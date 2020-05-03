import React, { Component } from "react";
import Popup from "reactjs-popup";

import { connect } from "react-redux";
import { DeleteSellerBid } from "../actions/SellerBidActions";
import DetailedQuotationPopup from "./DetailedQuotationPopup";

export class SellerQuotedBids extends Component {
  constructor(props) {
    super(props);

    this.deleteSellerBid = this.deleteSellerBid.bind(this);

    this.state = {
      mySellerBid: [],
      buyerBid: [],
      buyer: [],
      viewMore: false,
      deleteModal: false,
    };
  }

  componentDidMount() {
    const { sellerBid, buyerBids, users } = this.props;
    this.setState({
      mySellerBid: sellerBid,
      buyerBid: buyerBids.find(
        ({ buyerBidId }) => buyerBidId === sellerBid.buyerBidId
      ),
      buyer: users.find(
        ({ userId }) =>
          userId ===
          buyerBids.find(
            ({ buyerBidId }) => buyerBidId === sellerBid.buyerBidId
          ).userId
      ),
    });
  }

  viewMore = () => {
    this.setState({ viewMore: true });
  };

  closeView = () => {
    this.setState({ viewMore: false });
  };

  openDelete = () => {
    this.setState({ deleteModal: true });
  };

  closeDelete = () => {
    this.setState({ deleteModal: false });
  };

  deleteSellerBid = (sellerBidId) => {
    this.props.DeleteSellerBid(sellerBidId);
    window.location.reload();
  };

  render() {
    const { mySellerBid, buyerBid, buyer, viewMore, deleteModal } = this.state;
    return (
      <div className="singleQuotation">
        <div className="quotationDetail">
          <div>
            <p>
              <b>Status</b>
            </p>
            <p> {mySellerBid.status}</p>
          </div>
          <div>
            <p>
              <b>{buyer.businessName}</b>
            </p>
          </div>

          <div>
            <p>
              <b>Posted On:</b>
            </p>
            <p> {new Date(mySellerBid.timeStamp).toLocaleDateString()}</p>
          </div>

          <div>
            <p>
              <b>Quality:</b>
            </p>

            <p>{buyerBid.quality}</p>
          </div>
          <div>
            <p>
              <b>Quantity: </b>
            </p>
            <p>{mySellerBid.quantity}</p>
          </div>
          <div>
            <p>
              <b>Price: </b>
            </p>
            <p> {mySellerBid.price}</p>
          </div>
          <div>
            <p>
              <b>Expires on: </b>
            </p>
            <p>{new Date(mySellerBid.validityPeriod).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="quotationButtons">
          <button name="viewMore" onClick={this.viewMore}>
            View More
          </button>
          <button name="deleteBid" onClick={this.openDelete}>
            Delete Bid
          </button>
        </div>

        <Popup
          open={viewMore}
          onClose={this.closeView}
          contentStyle={{ border: "none", backgroundColor: "inherit" }}
        >
          <div className="viewPopup">
            <div className="viewPopupheader">
              <i>Status</i>
              <p>
                Posted On:{" "}
                {new Date(mySellerBid.timeStamp).toLocaleDateString()}
              </p>
              <button onClick={this.closeView}>&times;</button>
            </div>
            <DetailedQuotationPopup
              sellerBid={mySellerBid}
              buyerBid={buyerBid}
              buyer={buyer}
            />
          </div>
        </Popup>

        <Popup
          open={deleteModal}
          onClose={this.closeDelete}
          contentStyle={{ border: "none", backgroundColor: "inherit" }}
        >
          <div className="confirmPopup">
            <h2>Are You Sure You Want to Delete?</h2>
            <div className="buttons">
              <button
                name="yes"
                onClick={() => this.deleteSellerBid(mySellerBid.sellerBidId)}
              >
                Yes
              </button>
              <button name="no" onClick={this.closeDelete}>
                No
              </button>
            </div>
          </div>
        </Popup>
      </div>
    );
  }
}

const mapStateToProps = ({ sellerBids }) => ({ sellerBids });
export default connect(mapStateToProps, { DeleteSellerBid })(SellerQuotedBids);
