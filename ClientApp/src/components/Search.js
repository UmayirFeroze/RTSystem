import React, { Component } from "react";
import Popup from "reactjs-popup";
import { connect } from "react-redux";
import { getAllUsers } from "../actions/userAction";

class Search extends Component {
  constructor(props) {
    super(props);

    this.openSearchResults = this.openSearchResults.bind(this);
    this.closeSearchResults = this.closeSearchResults.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      users: [],
      searchCriteria: "",
      searchResults: false,
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

  openSearchResults = (event) => {
    event.preventDefault();
    this.setState({ searchResults: true }, this.renderSearchResults);
  };

  closeSearchResults = () => {
    this.setState({ searchResults: false });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: [event.target.value] });
  };

  renderSearchResults = () => {
    console.log(this.state.searchResults);
    function searchCriteria(user) {
      // this function will return an array that is sorted by the users search criteria
    }
    let result = this.state.searchCriteria.filter();
  };

  render() {
    console.log(this.state.users);
    return (
      <div className="search-container">
        <form className="search-container">
          <input
            type="text"
            name="searchCriteria"
            placeholder="Looking for Someone..."
            onChange={this.handleChange}
          />
          <button href="/search" onClick={this.openSearchResults}>
            Search
          </button>
        </form>
        <Popup
          modal
          open={this.state.searchResults}
          onClose={this.closeSearchResults}
        >
          <h1 style={{ color: "black" }}>Hey</h1>
        </Popup>
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => ({ users });
export default connect(mapStateToProps, { getAllUsers })(Search);
// export default Search;
