import React, { Component } from "react";
import NavBar from "../components/Navbar";
import { connect } from "react-redux";
import { getAllUsers } from "../actions/userAction";
import "../styles/OurPartners.css";
import Header from "../components/Header";

export class OurPartners extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      isLoading: true
    };
  }

  componentDidMount() {
    this.props.getAllUsers();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.users.data !== this.props.users.data) {
      this.setState({ users: this.props.users.data });
    }
  }

  renderUser = users => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          paddingRight: 20,
          paddingLeft: 20,
          color: "white"
        }}
      >
        <div className="sideNavBar">
          <span>All Partners</span>
          <span>Dealers</span>
          <span>Exporters</span>
          <span>Rubber Product Manufacturers</span>
        </div>
        <div
          style={{
            // marginRight: 150,
            // paddingLeft: 150,

            height: "100%",
            width: "100%",
            border: 1,
            borderStyle: "solid",
            borderColor: "pink"
          }}
        >
          {users.map(user => (
            <div
              key={user.userId}
              style={{
                display: "flex",
                flexDirection: "row",
                border: 1,
                backgroundColor: "#1f1e1e",
                borderStyle: "solid",
                borderColor: "white",
                marginBottom: 10
              }}
            >
              <div style={{ width: "25%" }}>
                <h2 style={{ margin: 3 }}>{user.businessName}</h2>
                <h4 style={{ marginTop: 10 }}>{user.businessDescription}</h4>
              </div>
              <div style={{ padding: 10 }}>
                <p>Business Type: {user.businessType}</p>
                <p>Owner: {user.firstName + " " + user.lastName}</p>
                <p>
                  Phone: {user.phone} / {user.businessPhone}
                </p>
                <p>Email: {user.email}</p>
                <p>Address: {user.businessAddress}</p>
              </div>
              <div>
                <a
                  href="/profile"
                  style={{ color: "white", textAlign: "center" }}
                >
                  Would you like to get to know more about {user.businessName} ?
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  render() {
    let content = this.props.users.isLoading ? (
      <p>Loading...</p>
    ) : (
      this.state.users.length && this.renderUser(this.state.users)
    );
    return (
      <div>
        <Header />
        <NavBar />
        <div>
          <h1>Our Partners</h1>
          <h2>All users details will come here</h2>
          <div>{content}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => ({
  users
});

export default connect(mapStateToProps, { getAllUsers })(OurPartners);
