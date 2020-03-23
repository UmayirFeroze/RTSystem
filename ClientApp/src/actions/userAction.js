import axios from "axios";
import { userConstants } from "../constants/userConstants";

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

export const loginUser = () => dispatch => {
  dispatch({ type: userConstants.LOGIN_REQUEST });
  return axios
    .post("api/user/authenticate")
    .then(res => {
      const response = res.data;
      dispatch(loginSuccess(response));
    })
    .catch(error => {
      dispatch(loginFailure(error));
    });
};
