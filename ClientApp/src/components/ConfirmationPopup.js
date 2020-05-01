import React, { Component } from "react";
import "../styles/ConfirmationPopup.css";
class ConfirmationPopup extends Component {
  handleYes = () => {
    this.props.yesFunction();
  };

  handleNo = () => {
    this.props.noFunction();
  };

  render() {
    return (
      <div className="confirmPopup">
        <h1>Are your sure you want to {this.props.status} this bid?</h1>
        <div className="buttons">
          <button onClick={this.handleYes} name="yes">
            Yes
          </button>
          <button onClick={this.handleNo} name="no">
            No
          </button>
        </div>
      </div>
    );
  }
}

export default ConfirmationPopup;
