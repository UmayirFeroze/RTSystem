import React, { Component } from "react";
import { connect } from "react-redux";
import { createBid } from "../actions/BuyerBidActions";
import "./../styles/CreateBid.css";

export class BuyerCreateBid extends Component {
  constructor(props) {
    super(props);

    this.setBidState = this.setBidState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      buyerBid: {
        userId: 0,
        quality: "",
        quantity: 0,
        price: 0,
        paymentIn: "",
        status: "",
      },
      user: 0,
    };
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.setState({ user: user.userId });
  }

  setBidState = (event) => {
    let { buyerBid } = this.state;
    this.setState({
      buyerBid: {
        ...buyerBid,
        userId: this.state.user,
        [event.target.name]:
          event.target.type === "number" && event.target.value >= 0
            ? parseFloat(event.target.value)
            : event.target.value,
        status: "open",
      },
    });
  };

  handleSubmit = (event) => {
    console.log(this.state.buyerBid); //to be cleaned
    event.preventDefault();
    this.props.createBid(this.state.buyerBid);
  };

  render() {
    return (
      <div className="createBid">
        <form id="createBidForm" onSubmit={this.handleSubmit}>
          <h2>Make A Request</h2>
          <select
            name="quality"
            onChange={this.setBidState}
            value={this.state.buyerBid.quality}
            required
          >
            <option disabled defaultValue="" value="">
              Quality
            </option>
            <option value="RSS 1">RSS 1</option>
            <option value="RSS 2">RSS 2</option>
            <option value="RSS 3">RSS 3</option>
            <option value="RSS 4">RSS 4</option>
            <option value="RSS 5">RSS 5</option>
            <option value="Bulk RSS 3/4/5">Bulk RSS 3/4/5</option>
            <option value="Bulk RSS 4/5">Bulk RSS 4/5</option>
          </select>

          <input
            type="number"
            step="any"
            name="quantity"
            placeholder="Quantity in Tonnes"
            onChange={this.setBidState}
            required
          />

          <input
            type="number"
            step="any"
            name="price"
            placeholder="Price in LKR/KG"
            onChange={this.setBidState}
          />

          <select
            name="paymentIn"
            onChange={this.setBidState}
            value={this.state.buyerBid.paymentIn}
            required
          >
            <option disabled value="" defaultValue="">
              Payment in
            </option>
            <option value="Payment on Delivery">Payment on Delivery</option>
            <option value="1 Week">1 Week</option>
            <option value="2 Weeks">2 Weeks</option>
            <option value="3 Weeks">3 Weeks</option>
            <option value="4 Weeks">4 Weeks</option>
          </select>
          <button>Create Bid</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ buyerBids }) => ({ buyerBids });
export default connect(mapStateToProps, { createBid })(BuyerCreateBid);
