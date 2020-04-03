import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  USER_BY_ID_REQUEST,
  USER_BY_ID_SUCCESS,
  USER_BY_ID_FAILURE
} from "../actions/authAction";

const INITIAL_STATE = {
  loading: false,
  loggedIn: false,
  data: [],
  error: ""
};
const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Log In User
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        loggedIn: false
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: true,
        data: action.payload
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        laoding: false,
        loggedIn: false,
        error: action.payload
      };

    // Get Logged In User
    case USER_BY_ID_REQUEST:
      return {
        ...state,
        loading: true
      };
    case USER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: true
      };
    case USER_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        loggedIn: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default authReducer;
