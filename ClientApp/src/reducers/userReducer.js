import { userConstants } from "../constants/userConstants";

const INITIAL_STATE = {
  loading: false,
  hasError: false,
  error: null,
  data: [],
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userConstants.GET_ALL_USERS_REQUEST: // Get All Users
      return { ...state, loading: true };
    case userConstants.GET_ALL_USERS_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case userConstants.GET_ALL_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        hasError: true,
        error: action.payload,
      };

    case userConstants.GET_USER_BY_ID_REQUEST: // Get User by Id
      return { ...state, loading: true, hasError: false };
    case userConstants.GET_USER_BY_ID_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case userConstants.GET_USER_BY_ID_FAILURE:
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
