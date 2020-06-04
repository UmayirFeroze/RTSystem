import React, { Component } from "react";
import { history } from "../App";
import "../styles/ViewSellerPopup.css";

class ViewSellerPopup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seller: [],
    };
  }

  closeViewParent = () => {
    this.props.closePopup();
  };

  handleViewProfile = (userId) => {
    if (this.props.currentUser === userId) {
      history.push("/profile");
      window.location.reload();
    } else {
      history.push("/our-partners/" + userId);
      window.location.reload();
    }
  };

  render() {
    const { seller } = this.props;
    return (
      <div className="viewSellerPopup">
        <div className="header">
          <h2>User:</h2>
          <button onClick={this.closeViewParent} style={{ marginLeft: "auto" }}>
            &times;
          </button>
        </div>

        <div className="sellerContainer">
          <div className="image" style={{ border: "none" }}>
            {seller.businessImage ? (
              <img src={seller.businessImage} alt="userProfilePic" />
            ) : (
              <img
                src={require("../Images/avatar-profile.png")}
                alt="UserAvatar"
              />
            )}
          </div>
          <div className="sellerDetails">
            <h2>{seller.businessName}</h2>
            <h4>{seller.businessDescription}</h4>
            <p>
              <b> {seller.businessType} : </b>
              {seller.firstName + " " + seller.lastName}
            </p>

            <p>
              <b>Contact : </b>
              {seller.phone + " / " + seller.businessPhone}
            </p>
            <p>
              <b>Email : </b> {seller.email}
            </p>
            <p>
              <b>Address : </b>
              {seller.businessAddress}
            </p>
          </div>
          <button onClick={() => this.handleViewProfile(seller.userId)}>
            View Profile
          </button>
        </div>
      </div>
    );
  }
}

export default ViewSellerPopup;
