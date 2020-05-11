import React, { Component } from "react";

import { connect } from "react-redux";
import { CreateSellerBid } from "../actions/SellerBidActions";
import "../styles/SellerCreateBid.css";

export class SellerCreateBid extends Component {
  constructor(props) {
    super(props);

    this.SetBidState = this.SetBidState.bind(this);
    this.CreateSellerBid = this.CreateSellerBid.bind(this);

    this.state = {
      sellerBid: {
        userId: 0,
        buyerBidId: 0,
        quantity: 0,
        price: 0,
        deliveryDate: null,
        validityPeriod: null,
        status: "",
      },
      buyerBid: [],
      buyer: [],
      seller: [],
      today: "",
    };
  }
  componentDidMount() {
    const { buyerBid, buyer, seller } = this.props;
    this.setState({ buyerBid: buyerBid, buyer: buyer, seller: seller });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.sellerBids.data !== this.props.sellerBids.data) {
      this.setState({ sellerBid: this.props.sellerBids.data });
    }
  }

  renderBidDetails = (buyerBid) => {
    return (
      <div className="BidDetails">
        <h3>Quotation Criteria: </h3>
        <h4>Quality:</h4>
        <p>{buyerBid.quality}</p>
        <h4>Quantity: </h4>
        <p>{buyerBid.quantity}</p>
        <h4>Price:</h4>
        {buyerBid.price > 0 ? <p>{buyerBid.price}</p> : <p>Undefined</p>}
        <h4>Payment: </h4>
        <p>{buyerBid.paymentIn}</p>
      </div>
    );
  };

  SetBidState = (event) => {
    let { sellerBid } = this.state;
    this.setState({
      sellerBid: {
        ...sellerBid,
        userId: this.state.seller.userId,
        buyerBidId: this.state.buyerBid.buyerBidId,
        [event.target.name]:
          event.target.type === "number" && event.target.value >= 0
            ? parseFloat(event.target.value)
            : event.target.value,
        status: "pending",
      },
    });
  };

  CreateSellerBid = (event) => {
    event.preventDefault();
    this.props.CreateSellerBid(this.state.sellerBid);
    window.location.reload();
  };

  handleDates = (e) => ({
    _onFocus: function (e) {
      e.currentTarget.type = "date";
    },
    _onBlur: function (e) {
      e.currentTarget.type = "text";
      e.currentTarget.placeholder = "Enter a Date";
    },
  });

  renderForm = () => {
    console.log("State: ", this.props.sellerBids.data);
    return (
      <form className="form" onSubmit={this.CreateSellerBid}>
        <h3>Quote your Price</h3>
        <input
          type="number"
          step="any"
          name="quantity"
          placeholder="Quantity"
          onChange={this.SetBidState}
          required
        />
        <input
          type="number"
          step="any"
          name="price"
          placeholder="Price in LKR"
          onChange={this.SetBidState}
          required
        />
        <input
          type="date"
          name="validityPeriod"
          placeholder
          onChange={this.SetBidState}
          required
        />

        <input
          type="date"
          name="deliveryDate"
          placeholderText="Delivery Date"
          onChange={this.SetBidState}
          required
        />
        <button>Submit</button>
      </form>
    );
  };

  closePopup = () => {
    this.props.closeMakeBid();
  };

  render() {
    const { buyerBid, buyer } = this.props;
    console.log("BuyerBid Details: ", this.state.buyerBid);

    return (
      <div className="sellerBidComponent">
        <div className="sellerBidComponentHeader">
          <h2>Quote Your Offer</h2>
          <button name="closeCreateSellerBid" onClick={this.closePopup}>
            &times;
          </button>
        </div>

        <div className="quotation">
          <h1>{buyer.businessName}</h1>

          <p>
            {buyer.firstName + " " + buyer.lastName} | {buyer.phone} |{" "}
            {buyer.email}
          </p>

          <div className="Details">
            {this.renderBidDetails(buyerBid)}
            <div className="vertical"> </div>
            {this.renderForm()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ sellerBids }) => ({
  sellerBids,
});

export default connect(mapStateToProps, { CreateSellerBid })(SellerCreateBid);
