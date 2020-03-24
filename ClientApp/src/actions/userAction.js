import axios from "axios";
import { userConstants } from "../constants/userConstants";
import { history } from "../App";
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
        console.log("User is logged in");
      } else {
        localStorage.removeItem("userLogIn");
        localStorage.setItem("userLogIn", user);
        console.log("User is logged in ");
      }
      console.log(res);
      history.push("/home");
      window.location.reload();
    })
    .catch(error => {
      dispatch(loginFailure(error));
      history.push("/");
    });
};

export const logoutUser = () => dispatch => {
  dispatch({ type: userConstants.LOG_OUT });
  if (localStorage.getItem("userLogIn") !== null) {
    localStorage.removeItem("userLogIn");
    console.log("logged out");
  } else {
    localStorage.clear();
    console.log("Unable to log out");
  }
  return {};
};
