import React, { Component } from "react";
import Popup from "reactjs-popup";
import ViewSellerPopup from "./ViewSellerPopup";
import "../styles/IndividualSellerBid.css";

class SellerPostedBids extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.closeViewSeller = this.closeViewSeller.bind(this);
    this.updateStatus = this.updateStatus.bind(this);

    this.state = {
      sellerBid: [],
      viewSeller: false,
      status: "",
    };
  }
  componentDidMount() {
    if (this.state.sellerBid !== this.props.sellerBid) {
      this.setState({ sellerBid: this.props.sellerBid });
    }
  }

  handleChange = (event) => {
    event.preventDefault();
    const { sellerBid } = this.state;

    if (event.target.name === "viewSeller") {
      this.setState({ viewSeller: true });
    }
    if (event.target.name === "accept") {
      this.setState(
        {
          status: "accepted",
          sellerBid: {
            ...sellerBid,
            status: event.target.value,
            bestPrice: this.state.sellerBid.bestPrice,
          },
        },
        this.updateStatus
      );
    }

    if (event.target.name === "reject") {
      this.setState(
        {
          status: "rejected",
          sellerBid: {
            ...sellerBid,
            status: event.target.value,
            bestPrice: this.state.sellerBid.bestPrice,
          },
        },
        this.updateStatus
      );
    }

    if (event.target.name === "negotiate") {
      this.setState(
        {
          status: "negotiated",
          sellerBid: {
            ...sellerBid,
            status: event.target.value,
            bestPrice: this.state.sellerBid.bestPrice,
          },
        },
        this.updateStatus
      );
    }
  };

  updateStatus = () => {
    const { sellerBid, status } = this.state;
    let updateBid = {
      sellerBidId: sellerBid.sellerBidId,
      status: status,
      bestPrice: sellerBid.bestPrice,
    };
    this.props.updateSellerBid(updateBid);
  };

  closeViewSeller = () => {
    this.setState({ viewSeller: false });
  };

  render() {
    let { sellerBid } = this.state;

    return (
      <div className="sellerQuotation">
        {sellerBid.status === "accepted" ? (
          <div className="status" style={{ backgroundColor: "green" }}></div>
        ) : sellerBid.status === "rejected" ? (
          <div className="status" style={{ backgroundColor: "red" }}></div>
        ) : sellerBid.status === "negotiated" ? (
          <div className="status" style={{ backgroundColor: "yellow" }}></div>
        ) : sellerBid.status === "pending" ? (
          <div className="status" style={{ backgroundColor: "white" }}></div>
        ) : (
          <div className="status" style={{ backgroundColor: "grey" }}></div>
        )}

        <div className="details">
          <div>
            <p style={{ marginTop: 2 }}>
              Quantity:<b>{sellerBid.quantity} t</b> Price: Rs{" "}
              <b>{sellerBid.price}</b>
            </p>
            <p>
              Delivery Date:{" "}
              <b style={{ fontSize: 13 }}>
                {new Date(sellerBid.deliveryDate).toLocaleDateString()}
              </b>
            </p>
            <p>
              Validity:{" "}
              <b style={{ fontSize: 13 }}>
                {new Date(sellerBid.validityPeriod).toLocaleDateString()}
              </b>
            </p>
          </div>
          {sellerBid.bestPrice ? (
            <div className="bestPrice">
              <p>
                Best Price: Rs <b>{sellerBid.bestPrice}</b>
              </p>
            </div>
          ) : null}
        </div>

        <div className="buttons">
          <button name="viewSeller" onClick={this.handleChange}>
            View Seller
          </button>
          <button
            name="accept"
            value="accepted"
            onClick={this.handleChange}
            disabled={sellerBid.status === "invalid"}
          >
            Accept
          </button>
          <button
            name="reject"
            value="rejected"
            onClick={this.handleChange}
            disabled={sellerBid.status === "invalid"}
          >
            Reject
          </button>

          <button
            name="negotiate"
            value="negotiated"
            onClick={this.handleChange}
            disabled={
              sellerBid.status === "invalid" ||
              sellerBid.status === "negotiated"
            }
          >
            Negotiate
          </button>
        </div>

        <Popup
          open={this.state.viewSeller}
          onClose={this.closeViewSeller}
          contentStyle={{ border: "none", backgroundColor: "inherit" }}
        >
          <ViewSellerPopup
            seller={this.props.users.find(
              ({ userId }) => userId === sellerBid.userId
            )}
            closePopup={this.closeViewSeller}
          />
        </Popup>
      </div>
    );
  }
}

export default SellerPostedBids;
