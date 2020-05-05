import React, { Component } from "react";
// import ReactSearchBox from "react-search-box";
import Search from "react-search";
import Header from "../components/Header";
import NavBar from "../components/Navbar";
import User from "../components/User";

import { connect } from "react-redux";
import { getAllUsers } from "../actions/userAction";
import { getAllBids } from "../actions/BuyerBidActions";
// import "../styles/OurPartners.css";
import "../styles/ThemePage.css";

export class OurPartners extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      users: [],
      dealers: [],
      exporters: [],
      manufacturers: [],
      buyerBids: [],
      status: "all",
      search: "",
    };
  }

  componentDidMount() {
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

  handleClick = (event) => {
    const { users } = this.state;
    //  function to query data
    function isValid(user) {
      if (user.businessType === event.target.value) {
        return true;
      }
    }

    if (event.target.name === "allUsers") {
      this.setState({ status: "all" });
    }
    if (event.target.name === "dealers") {
      this.setState({ status: "dealers", dealers: users.filter(isValid) });
    }
    if (event.target.name === "exporters") {
      this.setState({ status: "exporters", exporters: users.filter(isValid) });
    }
    if (event.target.name === "manufacturers") {
      this.setState({
        status: "manufacturers",
        manufacturers: users.filter(isValid),
      });
    }
  };

  renderUser = (users, buyerBids) => {
    return users.map((user) => (
      <User key={user.userId} user={user} buyerBids={buyerBids} />
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
    } = this.state;

    let content =
      this.props.users.loading || this.props.buyerBids.loading ? (
        <p>Loading...</p>
      ) : buyerBids.length === 0 ? (
        <p>No buyerBids Yet</p>
      ) : status === "all" ? (
        this.renderUser(users, buyerBids)
      ) : status === "dealers" ? (
        this.renderUser(dealers, buyerBids)
      ) : status === "exporters" ? (
        this.renderUser(exporters, buyerBids)
      ) : (
        this.renderUser(manufacturers, buyerBids)
      );

    let search = this.state.users;

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
          <div className="data">{content}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users, buyerBids }) => ({ users, buyerBids });
export default connect(mapStateToProps, { getAllUsers, getAllBids })(
  OurPartners
);
