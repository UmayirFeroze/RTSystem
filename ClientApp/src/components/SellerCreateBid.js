import React, { Component } from "react";

import "../styles/SellerCreateBid.css";

class SellerCreateBid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sellerBid: {
        userId: 0,
        buyerBidId: 0,
        quantity: 0,
        price: 0,
        deliveryDate: "",
        validityPeriod: "",
        status: "",
      },
      buyerBid: {},
      user: [],
      today: "",
    };
  }
  componentDidMount() {}

  componentDidUpdate(prevProps) {}

  getCurrentDate = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    today = yyyy + "-" + mm + "-" + dd;
    this.setState({ today: today });
  };

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

  renderForm = () => {
    return (
      <form className="form">
        <h3>Quote your Price</h3>
        <input type="float" name="quantity" placeholder="Quantity" />
        <input type="float" name="price" placeholder="Price in LKR" />
        <input
          type="date"
          name="validityPeriod"
          min={this.state.today}
          placeholder="Validity Period"
        />
        <input type="date" name="deliveryDate" placeholder="Delivery Date" />
        <button>Submit</button>
      </form>
    );
  };

  render() {
    const { user, buyerBid } = this.props;
    console.log("BuyerBid Details: ", this.state.buyerBid);

    return (
      <div className="sellerBidComponent">
        <div className="sellerBidComponentHeader">
          <p>Quote Your Offer</p>
          <span>&times;</span>
        </div>
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
      </div>
    );
  }
}

export default SellerCreateBid;
