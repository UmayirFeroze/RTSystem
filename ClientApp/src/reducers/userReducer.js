import { userConstants } from "../constants/userConstants";

const INITIAL_STATE = {
  isLoading: false,
  hasError: false,
  error: null,
  data: [],
  isLoggedin: false,
  isRegistered: false
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Get All Users
    case userConstants.GET_ALL_USERS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case userConstants.GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case userConstants.GET_ALL_USERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        error: action.payload
      };

    // Login User
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        isLoggedin: false
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedin: true,
        data: action.payload
      };
    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLoggedin: false,
        error: action.payload
      };

    // Logout User
    case userConstants.LOG_OUT:
      return state;

    // Register user
    case userConstants.REGISTER_USER_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case userConstants.REGISTER_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isRegistered: true,
        data: action.payload
      };
    case userConstants.REGISTER_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        error: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
