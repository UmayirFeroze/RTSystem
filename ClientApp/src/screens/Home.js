import React, { Component } from "react";
import NavBar from "../components/Navbar";
import BuyerCreateBid from "../components/BuyerCreateBid";
import YourProfile from "../components/YourProfile";
import BuyerBids from "../components/BuyerBids";
import Header from "../components/Header";

import "../styles/Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {},
      loading: false
    };
  }

  componentDidMount() {
    let user = localStorage.getItem("user");
    this.setState({
      loading: false,
      currentUser: localStorage.getItem("user")
    });
    console.log("Loaded Data: ", user);
  }

  render() {
    return (
      <div>
        <Header />
        <NavBar />
        <h1>Welcome To Trade Portal</h1>
        <div className="container">
          <div className="profile">
            <YourProfile />
          </div>
          <div className="bids">
            <BuyerBids />
          </div>
          <div className="createBids">
            <BuyerCreateBid />
          </div>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = ({ authUser }) => ({
//   authUser
// });

// export default connect(mapStateToProps)(Home);
