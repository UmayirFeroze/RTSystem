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
        quality: "",
        quantity: 0,
        price: 0,
        paymentIn: "",
        status: ""
      }
    };
  }

  componentDidMount() {
    console.log(this.state.buyerBid); // to be cleaned
  }

  setBidState = event => {
    let { buyerBid } = this.state;
    this.setState({
      buyerBid: {
        ...buyerBid,
        [event.target.name]:
          event.target.type === "number" && event.target.value >= 0
            ? parseFloat(event.target.value)
            : event.target.value,
        status: "pending"
      }
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state.buyerBid); //to be cleaned
    const { buyerBid } = this.state;
    this.props.createBid(buyerBid);
  };

  render() {
    return (
      <div className="createBid">
        <h2>Create Bid Component</h2>
        <form onSubmit={this.handleSubmit}>
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
            // value={this.state.buyerBid.quantity}
            onChange={this.setBidState}
            required
          />

          <input
            type="number"
            step="any"
            name="price"
            placeholder="Price in LKR/KG"
            // value={this.state.buyerBid.price}
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
            <option value="2 Weeks">2 Weeks</option>
            <option value="4 Weeks">4 Weeks</option>
            <option value="6 Weeks">6 Weeks</option>
            <option value="8 Weeks">8 Weeks</option>
          </select>

          <button>Create Bid</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ state }) => ({
  state
});

export default connect(mapStateToProps, { createBid })(BuyerCreateBid);
