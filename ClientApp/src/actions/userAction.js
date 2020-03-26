import axios from "axios";
import { userConstants } from "../constants/userConstants";
import { history } from "../App";

// Get all Users
const getAllUsersSuccess = payload => ({
  type: userConstants.GET_ALL_USERS_SUCCESS,
  payload
});

const getAllUsersFailure = payload => ({
  type: userConstants.GET_ALL_USERS_FAILURE,
  payload
});

export const getAllUsers = () => dispatch => {
  dispatch({ type: userConstants.GET_ALL_USERS_REQUEST });
  return axios
    .get("/api/user/getusers")
    .then(res => {
      const response = res.data;
      dispatch(getAllUsersSuccess(response));
    })
    .catch(error => {
      dispatch(getAllUsersFailure("Error: Failed to get all partners!"));
      return Promise.reject({});
    });
};

// Log in User
const loginSuccess = payload => ({
  type: userConstants.LOGIN_SUCCESS,
  payload
});

const loginFailure = payload => ({
  type: userConstants.LOGIN_FAILURE,
  payload
});

export const loginUser = user => dispatch => {
  dispatch({ type: userConstants.LOGIN_REQUEST });
  return axios
    .post("api/user/authenticate", user)
    .then(res => {
      const response = res.data;
      dispatch(loginSuccess(response));
      if (localStorage.getItem("userLogIn") === null) {
        localStorage.setItem("userLogIn", user);
        console.log("User is logged in"); //To be cleaned
      } else {
        localStorage.removeItem("userLogIn");
        localStorage.setItem("userLogIn", user);
        console.log("User is logged in ");
      }
      console.log(res); //To be cleaned
      history.push("/home");
      window.location.reload();
    })
    .catch(error => {
      dispatch(loginFailure(error));
      // history.push("/");  Must not reload, must show error messages by clearning data
    });
};

// Log out user
export const logoutUser = () => dispatch => {
  dispatch({ type: userConstants.LOG_OUT });
  if (localStorage.getItem("userLogIn") !== null) {
    localStorage.removeItem("userLogIn");
    console.log("logged out"); // To be cleaned
  } else {
    localStorage.clear();
    console.log("No logged in user to logout"); //To be cleaned
  }
  return {};
};

// Regsiter User
const registerSuccess = payload => ({
  type: userConstants.REGISTER_USER_SUCCESS,
  payload
});

const registerFailure = payload => ({
  type: userConstants.REGISTER_USER_FAILURE,
  payload
});

export const resgisterUser = user => dispatch => {
  dispatch({ type: userConstants.REGISTER_USER_REQUEST });
  return axios
    .post("api/user/registeruser", user)
    .then(res => {
      const response = res.data;
      dispatch(registerSuccess(response));
      console.log("repsonse: ", res);
      history.push("/");
      window.location.reload();
    })
    .catch(error => {
      dispatch(registerFailure(error));
      console.log("error", error);
      // history.push("/register"); //Must not relaoad, must wheo erorr messages by clesring data
    });
};