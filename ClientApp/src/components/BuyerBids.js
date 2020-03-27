import React, { Component } from "react";

class BuyerBids extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buyerBids: [],
      isLoading: true
    };
  }

  renderAllBuyerBids = () => {
    return (
      <div>
        <p>Hello</p>
      </div>
    );
  };

  render() {
    let content = this.renderAllBuyerBids();
    return (
      <div>
        <h1>All News</h1>
        {content}
      </div>
    );
  }
}

export default BuyerBids;
