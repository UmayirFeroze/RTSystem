import React, { Component } from "react";
import "./../styles/CreateBid.css";

class CreateBid extends Component {
  constructor(props) {
    super(props);

    this.setBidState = this.setBidState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      quality: "",
      quantity: "",
      price: "",
      maxPrice: "",
      minPrice: "",
      paymentIn: ""
    };
  }

  setBidState = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);
  };

  render() {
    return (
      <div className="createBid">
        <h2>Create Bid Component</h2>
        <form onSubmit={this.handleSubmit}>
          <select
            name="quality"
            onChange={this.setBidState}
            value={this.state.quality}
            required
          >
            <option disabled selected value="">
              Quality
            </option>
            <option value="RSS 1">RSS 1</option>
            <option value="RSS 2">RSS 2</option>
            <option value="RSS 3">RSS 3</option>
            <option value="RSS 4">RSS 4</option>
            <option value="RSS 5">RSS 5</option>
          </select>

          <input
            type="number"
            name="quantity"
            placeholder="Quantity in Tonnes"
            value={this.state.quantity}
            onChange={this.setBidState}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price in LKR/KG"
            value={this.state.price}
            onChange={this.setBidState}
            required
          />

          <input
            type="number"
            name="maxPrice"
            placeholder="Maxiumum Price in LKR/KG"
            value={this.state.maxPrice}
            onChange={this.setBidState}
            required
          />

          <input
            type="number"
            name="minPrice"
            placeholder="Minimum Price in LKR/KG"
            value={this.state.minPrice}
            onChange={this.setBidState}
            required
          />

          <select
            name="paymentIn"
            onChange={this.setBidState}
            value={this.state.paymentIn}
            required
          >
            <option selected disabled value="">
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

export default CreateBid;
