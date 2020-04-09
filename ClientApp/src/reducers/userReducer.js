import { userConstants } from "../constants/userConstants";

const INITIAL_STATE = {
  loading: false,
  hasError: false,
  error: null,
  data: [],
  loggedIn: false,
  registered: false,
  currentUser: {},
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Get All Users
    case userConstants.GET_ALL_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case userConstants.GET_ALL_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        hasError: true,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
