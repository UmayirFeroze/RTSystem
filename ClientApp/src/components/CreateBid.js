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
      minPrice: ""
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
          <input
            type="text"
            name="quality"
            placeholder="Quality"
            onSubmit={this.setBidState}
            required
          />
          <br />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity in Kilograms"
            onSubmit={this.setBidState}
            required
          />
          <br />
          <input
            type="number"
            name="price"
            placeholder="Price in LKR"
            onSubmit={this.setBidState}
            required
          />
          <br />
          <input
            type="number"
            name="maxPrice"
            placeholder="Maxiumum Price in LKR"
            onSubmit={this.setBidState}
            required
          />
          <br />
          <input
            type="number"
            name="minPrice"
            placeholder="Minimum Price in LKR"
            onSubmit={this.setBidState}
            required
          />
          <br />
          <button>Create Bid</button>
        </form>
      </div>
    );
  }
}

export default CreateBid;
