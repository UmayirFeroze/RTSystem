import { userConstants } from "../constants/userConstants";

const INITIAL_STATE = {
  isLoading: false,
  hasError: false,
  error: null,
  data: [],
  isLoggedin: false,
  isRegistered: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
    case userConstants.LOG_OUT:
      return {};

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
