import React, { Component } from "react";
import NavBar from "../components/Navbar";
import axios from "axios";

class OurPartners extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      isLoading: true
    };
  }

  componentDidMount() {
    this.PopulateUsersData();
  }

  PopulateUsersData = () => {
    axios.get("/api/user/getusers").then(result => {
      const response = result.data;
      this.setState({ users: response, isLoading: false });
    });
  };

  renderUser = users => {
    return (
      <div
        style={{
          marginLeft: "200",
          marginRight: "200",
          padding: 100,
          height: "100%"
        }}
      >
        {users.map(user => (
          <div
            key={user.userId}
            style={{
              display: "flex",
              flexDirection: "row",
              border: 1,
              borderStyle: "solid",
              borderColor: "white",
              marginBottom: 10
            }}
          >
            <div style={{ width: "25%" }}>
              <img></img>
            </div>
            <div style={{ padding: 10 }}>
              <h2 style={{ margin: 3 }}>{user.businessName}</h2>
              <h4 style={{ marginTop: 10 }}>{user.businessDescription}</h4>
              <p>Owner: {user.firstName + " " + user.lastName}</p>
              <p>
                Phone: {user.phone} / {user.businessPhone}
              </p>
              <p>Email: {user.email}</p>
              <p>Address: {user.businessAddress}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  render() {
    let content = this.state.isLoading ? (
      <p>Loading...</p>
    ) : (
      this.renderUser(this.state.users)
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

export default OurPartners;
