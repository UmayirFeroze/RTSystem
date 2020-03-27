import React, { Component } from "react";
import NavBar from "../components/Navbar";
import { connect } from "react-redux";
import { getAllUsers } from "../actions/userAction";

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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "20%",
            border: 1,
            borderStyle: "solid",
            borderColor: "blue",
            marginRight: 100
            // height: "100%"
          }}
        >
          <button>All Partners</button>
          <button>Dealers</button>
          <button>Exporters</button>
          <button>Rubber Product Manufacturers</button>
        </div>
        <div
          style={{
            marginRight: 150,
            paddingLeft: 150,
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
                <h1>Image</h1>
              </div>
              <div style={{ padding: 10 }}>
                <h2 style={{ margin: 3 }}>{user.businessName}</h2>
                <h4 style={{ marginTop: 10 }}>{user.businessDescription}</h4>
                <p>Business Type: {user.businessType}</p>
                <p>Owner: {user.firstName + " " + user.lastName}</p>
                <p>
                  Phone: {user.phone} / {user.businessPhone}
                </p>
                <p>Email: {user.email}</p>
                <p>Address: {user.businessAddress}</p>
              </div>
              <div>
                <button>View Profile</button>
                <br />
                <button>Request Purchase</button>
                <br />
                <button>Complaint</button>
                <br />
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
