import React, { Component } from "react";
import { connect } from "react-redux";
import { AddProPic } from "../actions/authAction";

class AddProfilePicture extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      image: null,
    };
  }

  handleChange = (event) => {
    this.setState({ image: event.target.files[0] });
    console.log(event.target.files[0]); // to be cleaned
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData();
    fd.append("image", this.state.image, this.state.image.name);
    this.props.AddProPic(fd);
  };

  render() {
    console.log(this.state.image);
    return (
      <div style={{ backgroundColor: "black" }}>
        <div>
          <p>Add Profile Picture</p>
          <button onClick={this.props.close}>&times;</button>
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              type="file"
              accept="image/*"
              onChange={this.handleChange}
            ></input>
            <button>Upload</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authUser }) => ({ authUser });
export default connect(mapStateToProps, { AddProPic })(AddProfilePicture);
