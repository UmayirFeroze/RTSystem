import React, { Component } from "react";
import { connect } from "react-redux";
import { disableAccount } from "../actions/authAction";

class DisableAccount extends Component {
  constructor(props) {
    super(props);

    this.handleDeactivate = this.handleDeactivate.bind(this);

    this.state = {
      error: "",
    };
  }

  componentDidMount() {}

  handleDeactivate = (event) => {
    event.preventDefault();
    this.props.disableAccount();
    if (this.props.users.error) {
      this.setState({ error: this.props.users.error });
    }
  };

  render() {
    return (
      <div>
        <button style={{ float: "rigth" }} onClick={this.props.close}>
          &times;
        </button>
        <div style={{ backgroundColor: "inherit", textAlign: "center" }}>
          <h1>Are you sure you want to disable your account?</h1>
          {this.props.users.error ? <div>{this.props.users.error}</div> : null}
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <button
              style={{ border: "1px solid red" }}
              onClick={this.handleDeactivate}
            >
              Yes
            </button>
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

const mapStateToProps = ({ users }) => ({ users });
export default connect(mapStateToProps, { disableAccount })(DisableAccount);
