import React, { Component } from "react";
import "../styles/ViewSellerPopup.css";

class ViewSellerPopup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seller: [],
    };
  }

  componentDidMount() {
    console.log("user@viewSeller", this.props.seller);
  }

  closeViewParent = () => {
    this.props.closePopup();
  };

  render() {
    const { seller } = this.props;
    return (
      <div className="viewSellerPopup">
        <div className="header">
          <h2>Quoted By:</h2>
          <button onClick={this.closeViewParent} style={{ marginLeft: "auto" }}>
            &times;
          </button>
        </div>

        <div className="sellerContainer">
          <div className="image">
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
              {seller.firstName + seller.lastName}
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
          <button>View Profile</button>{" "}
          {/* Redirect to Seller profile on Click*/}
        </div>
      </div>
    );
  }
}

export default ViewSellerPopup;
