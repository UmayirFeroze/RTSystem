import React, { Component } from "react";
import "../styles/YourProfile.css";
import { connect } from "react-redux";
import { getAuthUser } from "../actions/authAction";

export class YourProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.props.getAuthUser();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.authUser.data !== this.props.authUser.data) {
      this.setState({ currentUser: this.props.authUser.data });
    }
  }

  render() {
    const { currentUser } = this.state;
    return (
      <div className="yourProfile">
        <img src={require("../Images/logo.jpg")} alt="CompanyLogo" />
        <div>
          <h2>{currentUser.businessName}</h2>
          <h4>{currentUser.businessDescription}</h4>
          <h5>
            {currentUser.businessPhone} / {currentUser.phone}
          </h5>
          <h5>{currentUser.email}</h5>
        </div>
        <a href="/Profile">View Profile</a>
      </div>
    );
  }
}

const mapStateToProps = ({ authUser }) => ({
  authUser,
});

export default connect(mapStateToProps, { getAuthUser })(YourProfile);
