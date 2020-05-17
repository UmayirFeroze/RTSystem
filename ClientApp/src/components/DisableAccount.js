import React, { Component } from "react";
import { connect } from "react-redux";
import { disableAccount } from "../actions/authAction";
import "../styles/ConfirmationPopup.css";

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
      <div className="confirmPopup">
        <h1>Are you sure you want to disable your account?</h1>

        <div className="buttons">
          <button name="yes" onClick={this.handleDeactivate}>
            Yes
          </button>
          <button name="no" onClick={this.props.close}>
            No
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => ({ users });
export default connect(mapStateToProps, { disableAccount })(DisableAccount);
