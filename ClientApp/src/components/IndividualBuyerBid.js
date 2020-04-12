import React, { Component } from "react";
import Popup from "reactjs-popup";

import { getUserByUserId } from "../actions/userAction";
import SellerCreateBid from "./SellerCreateBid";
import { connect } from "react-redux";
import Modal from "react-modal";
class IndividualBuyerBid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buyerBid: [],
      user: [],
      sellerBid: [],
      showModal: false,
    };
  }

  componentDidMount() {
    const buyerBidTaken = this.props.buyerBid;
    this.setState({ buyerBid: buyerBidTaken });

    this.props.getUserByUserId(buyerBidTaken.userId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.users.data !== this.props.users.data) {
      this.setState({ user: this.props.users.data });
    }
  }

  openModal = () => {
    this.setState({ showModal: true });
    this.renderSellerBidModal();
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  renderSellerBidModal = () => {
    return (
      <div>
        {this.state.showModal ? (
          <div>
            <Modal show={this.state.showModal} close={this.closeModal()}>
              HI thid is a good good thing to do
            </Modal>
          </div>
        ) : null}
      </div>
    );
  };

  render() {
    const { buyerBid } = this.state;
    return (
      <div key={buyerBid.buyerBidId} className="buyerBid">
        <p>
          Quality: {buyerBid.quality} Quantity: {buyerBid.quantity} Price:{" "}
          {buyerBid.price}
        </p>
        <p>
          Payment In: {buyerBid.paymentIn} Status: {buyerBid.status}
        </p>
        <Popup modal trigger={<button>Make Bid</button>}>
          <SellerCreateBid buyerBid={buyerBid} user={this.state.user} />
        </Popup>
        {/* <button onClick={this.openModal}>Make Bid</button> */}
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => ({
  users,
});

export default connect(mapStateToProps, { getUserByUserId })(
  IndividualBuyerBid
);
