import React, { Component } from "react";

class DisableAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <button style={{ float: "rigth" }} onClick={this.props.close}>
          &times;
        </button>
        <div style={{ backgroundColor: "inherit", textAlign: "center" }}>
          <h1>Are you sure you want to disable your account?</h1>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <button style={{ border: "1px solid red" }}>Yes</button>
            <button
              style={{ border: "1px solid blue" }}
              onClick={this.props.close}
            >
              No
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default DisableAccount;
