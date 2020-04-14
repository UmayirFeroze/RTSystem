import React, { Component } from "react";

import "../styles/SellerCreateBid.css";

import { connect } from "react-redux";
import { CreateSellerBid } from "../actions/SellerBidActions";

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
      user: [],
      today: "",
    };
  }
  componentDidMount() {
    const { user, buyerBid } = this.props;
    this.setState({ buyerBid: buyerBid, user: user });
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
        userId: this.state.user.userId,
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

  renderForm = () => {
    return (
      <form className="form" onSubmit={this.CreateSellerBid}>
        <h3>Quote your Price</h3>
        <input
          type="number"
          step="any"
          name="quantity"
          placeholder="Quantity"
          onChange={this.SetBidState}
        />
        <input
          type="number"
          step="any"
          name="price"
          placeholder="Price in LKR"
          onChange={this.SetBidState}
        />
        <input
          type="date"
          name="validityPeriod"
          placeholder="Validity Period"
          onChange={this.SetBidState}
        />
        <input
          type="date"
          name="deliveryDate"
          placeholder="Delivery Date"
          onChange={this.SetBidState}
        />
        <button>Submit</button>
      </form>
    );
  };

  render() {
    const { user, buyerBid } = this.props;
    console.log("BuyerBid Details: ", this.state.buyerBid);

    return (
      <div className="quotation">
        <h1>{user.businessName}</h1>
        <p>
          {user.firstName + " " + user.lastName} | {user.phone} | {user.email}
        </p>
        <div className="Details">
          {this.renderBidDetails(buyerBid)}
          <div className="vertical"> </div>
          {this.renderForm()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ sellerBids }) => ({
  sellerBids,
});

export default connect(mapStateToProps, { CreateSellerBid })(SellerCreateBid);
