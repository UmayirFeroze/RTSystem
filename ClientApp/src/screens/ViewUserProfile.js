import React, { Component } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import BuyerBids from "../components/BuyerBids";
import { connect } from "react-redux";
import { getUserByUserId } from "../actions/userAction";
import { getBuyerBidsByUserId } from "../actions/BuyerBidActions";

class ViewUserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { user: [], buyerBids: [] };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    console.log(id);
    this.props.getUserByUserId(id);
    this.props.getBuyerBidsByUserId(id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.users.data !== this.props.users.data) {
      this.setState({ user: this.props.users.data });
    }
    if (prevProps.buyerBids.data !== this.props.buyerBids.data) {
      this.setState({ buyerBids: this.props.buyerBids.data });
    }
  }

  renderUser = (user) => {
    return (
      <div>
        <div>
          <img src={require("../Images/logo.jpg")} alt="profilePic" />
        </div>
        <div>
          <h2>{user.businessName}</h2>
          <h3>{user.businessDescription}</h3>

          <p>
            <b>Business Type: </b>
            {user.businessType}
          </p>
          <p>
            <b>Owner: </b>
            {user.firstName + " " + user.lastName}
          </p>

          <p>
            <b>Phone: </b>
            {user.phone + " / " + user.businessPhone}
          </p>

          <p>
            <b>Email: </b>
            {user.email}
          </p>

          <p>
            <b>Address: </b>
            {user.businessAddress}
          </p>
        </div>
      </div>
    );
  };

  renderBuyerBidsComponent = (buyerBids, user) => {
    // console.log("infunction:", buyerBids, Array.isArray(user));

    if (Array.isArray(buyerBids)) {
      // console.log(buyerBids, user); // at this point the array becomes empty

      return <BuyerBids buyerBidsList={buyerBids} usersList={user} />;
    }
  };

  render() {
    const { buyerBids, user } = this.state;
    const userRendered =
      this.props.users.loading || user.length === 0 ? (
        <p>Loading...</p>
      ) : (
        this.renderUser(user)
      );

    const buyerBidsRendered =
      this.props.buyerBids.loading || this.state.buyerBids.length === 0 ? (
        <p>Loading...</p>
      ) : (
        this.renderBuyerBidsComponent(buyerBids, user)
      );

    return (
      <div>
        <Header />
        <Navbar />
        <div style={{ border: "1px solid red", display: "flex" }}>
          <div style={{ border: "1px solid blue", width: "30%" }}>
            {userRendered}
          </div>
          <div style={{ border: "1px solid yellow", width: "70%" }}>
            {buyerBidsRendered}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users, buyerBids }) => ({ users, buyerBids });
export default connect(mapStateToProps, {
  getUserByUserId,
  getBuyerBidsByUserId,
})(ViewUserProfile);
