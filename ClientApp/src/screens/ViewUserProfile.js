import React, { Component } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import BuyerBids from "../components/BuyerBids";
import { connect } from "react-redux";
import { getUserByUserId } from "../actions/userAction";
import { getAllBids } from "../actions/BuyerBidActions";
import "../styles/ThemePage.css";
import "../styles/YourProfile.css";

class ViewUserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { user: [], buyerBids: [] };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getUserByUserId(id);
    this.props.getAllBids();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.users.data !== this.props.users.data) {
      this.setState({ user: this.props.users.data });
    }
    if (prevProps.buyerBids.data !== this.props.buyerBids.data) {
      this.setState({
        buyerBids: this.props.buyerBids.data.filter(
          (buyerBid) => buyerBid.userId === parseInt(this.props.match.params.id)
        ),
      });
    }
  }

  renderUser = (user) => {
    return (
      <div className="yourProfile">
        <img
          src={require("../Images/logo.jpg")}
          alt="profilePic"
          style={{ marginTop: 0 }}
        />

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
    if (Array.isArray(buyerBids)) {
      return <BuyerBids buyerBidsList={buyerBids} usersList={user} />;
    }
  };

  render() {
    const { buyerBids, user } = this.state;
    const userRendered =
      this.props.users.loading || this.props.buyerBids.loading ? (
        <p>Loading...</p>
      ) : (
        this.renderUser(user)
      );

    console.log(buyerBids);
    const buyerBidsRendered = this.props.buyerBids.loading ? (
      <p>Loading...</p>
    ) : !buyerBids.length ? (
      <p>This user has not posted any bids yet</p>
    ) : (
      this.renderBuyerBidsComponent(buyerBids, user)
    );

    return (
      <div className="themePage">
        <Header />
        <Navbar />
        <h1>{user.businessName}</h1>
        <div className="container">
          <div className="sideNav" style={{ paddingTop: 0 }}>
            {userRendered}
          </div>
          <div className="data">{buyerBidsRendered}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users, buyerBids }) => ({ users, buyerBids });
export default connect(mapStateToProps, {
  getUserByUserId,
  getAllBids,
})(ViewUserProfile);
