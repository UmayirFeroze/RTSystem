import React, { Component } from "react";
import Popup from "reactjs-popup";
import ViewSellerPopup from "./ViewSellerPopup";
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

  render() {
    const { user } = this.state;

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
        <div className="buttonOperation">
          <button name="viewUser" onClick={this.openViewUser}>
            View User
          </button>
        </div>
        <Popup
          open={this.state.viewUser}
          onClose={this.closeViewUser}
          contentStyle={{ border: "none", backgroundColor: "inherit" }}
        >
          <ViewSellerPopup seller={user} closePopup={this.closeViewUser} />
        </Popup>
      </div>
    );
  }
}

export default User;
