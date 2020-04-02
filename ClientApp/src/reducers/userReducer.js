import { userConstants } from "../constants/userConstants";

const INITIAL_STATE = {
  loading: false,
  hasError: false,
  error: null,
  data: [],
  loggedIn: false,
  registered: false,
  currentUser: {}
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Login User
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        loggedIn: false
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: true,
        data: action.payload
        // currentUser: action.payload
      };
    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        loggedIn: false,
        error: action.payload
      };

    // Logout User
    case userConstants.LOG_OUT:
      return state;

    // Register user
    case userConstants.REGISTER_USER_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        registered: true,
        data: action.payload
      };
    case userConstants.REGISTER_USER_FAILURE:
      return {
        ...state,
        loading: false,
        registered: false,
        hasError: true,
        error: action.payload
      };

    // Get All Users
    case userConstants.GET_ALL_USERS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case userConstants.GET_ALL_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        hasError: true,
        error: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
