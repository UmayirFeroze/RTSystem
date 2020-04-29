import React, { Component } from "react";
import Popup from "reactjs-popup";
import IndividualBuyerBid from "./IndividualBuyerBid";
import "../styles/IndividualUserCard.css";

class User extends Component {
  constructor(props) {
    super(props);

    this.openViewUser = this.openViewUser.bind(this);
    this.closeViewUser = this.closeViewUser.bind(this);

    this.state = {
      user: [],
      buyerBids: [],

      viewUser: false,
    };
  }

  componentDidMount() {
    const { user, buyerBids } = this.props;
    //function to check for buyer bids by selected user
    function isValid(buyerBid) {
      if (buyerBid.userId === user.userId) {
        return true;
      }
    }
    this.setState({
      user: user,
      buyerBids: buyerBids.filter(isValid),
    });
  }

  openViewUser = () => {
    this.setState({ viewUser: true });
  };

  closeViewUser = () => {
    this.setState({ viewUser: false });
  };

  renderUserProfile = (user, buyerBids) => {
    return (
      <div style={{ display: "flex", flexDirection: "row", color: "black" }}>
        <div style={{ color: "black", border: "1px solid red", width: "50%" }}>
          {user.businessImage === null ? (
            <img
              src={require("../Images/avatar-profile.png")}
              alt="UserAvatar"
              style={{ width: "30%" }}
            />
          ) : null}
          <p>{user.businessName}</p>
          <p>{user.businessDescription}</p>
          <p>{"Email: " + user.email}</p>
          <p>{"Phone: " + user.businessPhone}</p>
          <p>{"Address: " + user.businessAddress}</p>
          {user.userImage === null ? (
            <img
              src={require("../Images/avatar-profile.png")}
              alt="UserAvatar"
              style={{ width: "30%" }}
            />
          ) : null}
          <p>{user.firstName + " " + user.lastName}</p>
          <p>{"Contact: " + user.phone}</p>
        </div>
        <div style={{ border: "1px solid blue", width: "50%" }}>
          {/* include overflow */}
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h4>Recent Requests</h4>
            <button onClick={this.closeViewUser}>&times;</button>
          </div>
          <div>
            {buyerBids.map((buyerBid) => (
              <IndividualBuyerBid
                key={buyerBid.buyerBidId}
                buyerBid={buyerBid}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { user, buyerBids, viewUser } = this.state;
    console.log("View", viewUser);
    return (
      <div className="userSingleCard">
        <div className="userDetails">
          <p>
            <b>{user.businessName}</b>
          </p>
          <p>
            <b>Type:</b>
            {user.businessType}
          </p>
          <p>
            <b>Contact:</b> {user.phone + " / " + user.businessPhone}{" "}
            <b>Address:</b> {user.businessAddress}
          </p>
        </div>
        <div>
          <button onClick={this.openViewUser}>View User</button>
          <Popup open={this.state.viewUser} onClose={this.closeViewUser}>
            {this.renderUserProfile(user, buyerBids)}
          </Popup>
        </div>
      </div>
    );
  }
}

export default User;
