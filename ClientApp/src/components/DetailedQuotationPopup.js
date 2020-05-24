import React, { Component } from "react";
import { connect } from "react-redux";
import { UpdateSellerBid } from "../actions/SellerBidActions";
import "../styles/Register.css";
class DetailedQuotationPopup extends Component {
  constructor(props) {
    super(props);

    this.negotiateBid = this.negotiateBid.bind(this);

    this.state = {
      sellerBid: [],
      buyerBid: [],
      buyer: [],
      updateBid: {
        sellerBidId: 0,
        bestPrice: "",
      },
    };
  }

  componentDidMount() {
    const { sellerBid, buyerBid, buyer } = this.props;
    this.setState({ sellerBid: sellerBid, buyerBid: buyerBid, buyer: buyer });
  }

  handleChange = (event) => {
    const { updateBid } = this.state;
    this.setState({
      updateBid: {
        ...updateBid,
        sellerBidId: this.state.sellerBid.sellerBidId,
        bestPrice: event.target.value,
      },
    });
  };

  negotiateBid = () => {
    this.props.UpdateSellerBid(this.state.updateBid);
    window.location.reload();
  };

  render() {
    const { buyerBid, sellerBid, buyer } = this.props;
    return (
      <div className="viewBody">
        <div className="viewBuyerBid">
          <h2>{buyer.businessName}</h2>
          <h4>
            {buyer.firstName +
              " " +
              buyer.lastName +
              " | " +
              buyer.phone +
              " / " +
              buyer.businessPhone +
              " | " +
              buyer.email}
          </h4>
          <p>Posted On: {new Date(buyerBid.timeStamp).toLocaleDateString()}</p>
          <h3>Request Details: </h3>

          <p>
            <b>Quality:</b> {buyerBid.quality}
          </p>
          <p>
            <b>Quantity:</b> {buyerBid.quantity}
          </p>
          {buyerBid.price ? (
            <p>
              <b>Price:</b> {buyerBid.price}
            </p>
          ) : null}
          <p>
            <b>Payment In:</b> {buyerBid.paymentIn}
          </p>
        </div>

        {sellerBid.status === "accepted" ? (
          <div className="vertical" style={{ borderColor: "green" }}></div>
        ) : sellerBid.status === "rejected" ? (
          <div className="vertical" style={{ borderColor: "red" }}></div>
        ) : sellerBid.status === "pending" ? (
          <div className="vertical" style={{ borderColor: "white" }}></div>
        ) : sellerBid.status === "negotiated" ? (
          <div className="vertical" style={{ borderColor: "yellow" }}></div>
        ) : (
          <div className="vertical" style={{ borderColor: "grey" }}></div>
        )}

        <div className="viewSellerBid">
          <h3>Your Quotation: </h3>

          <p>
            <b>Quantity:</b> {sellerBid.quantity}
          </p>
          <p>
            <b>Price:</b> {sellerBid.price}
          </p>
          <p>
            <b>Delivery Date:</b>{" "}
            {new Date(sellerBid.deliveryDate).toLocaleDateString()}
          </p>
          <p>
            <b>Validity Period:</b>{" "}
            {new Date(sellerBid.validityPeriod).toLocaleDateString()}
          </p>
          {sellerBid.bestPrice === null ? (
            sellerBid.status === "negotiated" ? (
              <form onSubmit={this.negotiateBid}>
                <div>
                  <h5>What is You Best Price? </h5>
                  <div>
                    <input
                      type="number"
                      step="any"
                      name="BestPrice"
                      placeholder="Best Price in LKR"
                      onChange={this.handleChange}
                      required
                    />
                    <button>Negotiate</button>
                  </div>
                </div>
              </form>
            ) : null
          ) : (
            <div>
              <p>
                <b>Best Price: </b>
                {sellerBid.bestPrice}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ sellerBids }) => ({ sellerBids });
export default connect(mapStateToProps, { UpdateSellerBid })(
  DetailedQuotationPopup
);
