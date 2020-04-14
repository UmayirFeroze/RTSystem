import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_USER,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  USER_BY_ID_REQUEST,
  USER_BY_ID_SUCCESS,
  USER_BY_ID_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
} from "../actions/authAction";

const INITIAL_STATE = {
  loading: false,
  loggedIn: false,
  data: [],
  error: "",
};
const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: // Log In User
      return { ...state, loading: true, loggedIn: false };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: true,
        data: action.payload,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        laoding: false,
        loggedIn: false,
        error: action.payload,
      };

    case LOGOUT_USER: //Logout User
      return state;

    case REGISTER_USER_REQUEST: // Register user
      return { ...state, loading: true };
    case REGISTER_USER_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case REGISTER_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case USER_BY_ID_REQUEST: // Get Logged In User
      return { ...state, loading: true };
    case USER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: true,
        data: action.payload,
      };
    case USER_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        loggedIn: false,
        error: action.payload,
      };

    case UPDATE_USER_REQUEST: // Update User
      return { ...state, loading: true };
    case UPDATE_USER_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case UPDATE_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default authReducer;
