import React, { Component } from "react";
import Header from "../components/Header";
import NavBar from "../components/Navbar";
import User from "../components/User";

import { connect } from "react-redux";
import { getUserId } from "../actions/authAction";
import { getAllUsers } from "../actions/userAction";
import { getAllBids } from "../actions/BuyerBidActions";

import "../styles/ThemePage.css";

export class OurPartners extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      currentUser: {},
      users: [],
      dealers: [],
      exporters: [],
      manufacturers: [],
      buyerBids: [],
      status: "all",
      searchState: false,
      searchCriteria: "",
      searchResults: [],
    };
  }

  componentDidMount() {
    const userId = getUserId();
    this.setState({ currentUser: userId });

    this.props.getAllUsers();
    this.props.getAllBids();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.users.data !== this.props.users.data) {
      this.setState({ users: this.props.users.data });
    }
    if (prevProps.buyerBids.data !== this.props.buyerBids.data) {
      this.setState({ buyerBids: this.props.buyerBids.data });
    }
  }

  handleChange = (event) => {
    if (event.target.value) {
      const value = event.target.value.toLowerCase();
      this.setState({
        searchCriteria: event.target.value,
        searchState: true,
        searchResults: this.state.users.filter(
          (user) =>
            user.firstName.toLowerCase() === value ||
            user.lastName.toLowerCase() === value ||
            user.email.toLowerCase() === value ||
            user.phone === value ||
            user.businessName.toLowerCase() === value ||
            user.businessPhone === value ||
            user.businessAddress.toLowerCase() === value ||
            user.businessType.toLowerCase() === value
        ),
      });
    } else {
      this.setState({ searchCriteria: "", searchState: false });
    }
  };

  handleClick = (event) => {
    const { users } = this.state;

    if (event.target.name === "allUsers") {
      this.setState({ status: "all" });
    }
    if (event.target.name === "dealers") {
      this.setState({
        status: "dealers",
        dealers: users.filter(
          (user) => user.businessType === event.target.value
        ),
      });
    }
    if (event.target.name === "exporters") {
      this.setState({
        status: "exporters",
        exporters: users.filter(
          (user) => user.businessType === event.target.value
        ),
      });
    }
    if (event.target.name === "manufacturers") {
      this.setState({
        status: "manufacturers",
        manufacturers: users.filter(
          (user) => user.businessType === event.target.value
        ),
      });
    }
  };

  renderUser = (users, buyerBids) => {
    return users.map((user) => (
      <User
        key={user.userId}
        user={user}
        buyerBids={buyerBids}
        currentUser={this.state.currentUser}
      />
    ));
  };

  render() {
    const {
      users,
      dealers,
      exporters,
      manufacturers,
      status,
      buyerBids,
      searchState,
      searchResults,
    } = this.state;

    let content =
      this.props.users.loading || this.props.buyerBids.loading ? (
        <p>Loading...</p>
      ) : buyerBids.length === 0 ? (
        <p>No buyerBids Yet</p>
      ) : searchState ? (
        this.renderUser(searchResults, buyerBids)
      ) : status === "all" ? (
        this.renderUser(users, buyerBids)
      ) : status === "dealers" ? (
        this.renderUser(dealers, buyerBids)
      ) : status === "exporters" ? (
        this.renderUser(exporters, buyerBids)
      ) : (
        this.renderUser(manufacturers, buyerBids)
      );

    return (
      <div className="themePage">
        <Header /> <NavBar />
        <h1>Our Partners</h1>
        <div className="container">
          <div className="sideNav">
            <button name="allUsers" value="allUsers" onClick={this.handleClick}>
              All Partners
            </button>
            <button name="dealers" value="Dealer" onClick={this.handleClick}>
              Dealers
            </button>
            <button
              name="exporters"
              value="Exporter"
              onClick={this.handleClick}
            >
              Exporters
            </button>
            <button
              name="manufacturers"
              value="Rubber Product Manufacturer"
              onClick={this.handleClick}
            >
              Rubber Product Manufacturers
            </button>
          </div>

          <div className="data">
            <input
              type="text"
              name="searchBox"
              placeHolder="Looking for Someone...?"
              onChange={this.handleChange}
            />
            {content}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users, buyerBids }) => ({
  users,
  buyerBids,
});
export default connect(mapStateToProps, { getAllUsers, getAllBids, getUserId })(
  OurPartners
);
