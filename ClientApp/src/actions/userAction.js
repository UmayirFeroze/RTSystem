import axios from "axios";
// import { history } from "../App";
import { userConstants } from "../constants/userConstants";

// Get all Users
const getAllUsersSuccess = (payload) => ({
  type: userConstants.GET_ALL_USERS_SUCCESS,
  payload,
});
const getAllUsersFailure = (payload) => ({
  type: userConstants.GET_ALL_USERS_FAILURE,
  payload,
});
export const getAllUsers = () => (dispatch) => {
  dispatch({ type: userConstants.GET_ALL_USERS_REQUEST });
  return axios
    .get("/api/user/getusers")
    .then((res) => {
      const response = res.data;
      dispatch(getAllUsersSuccess(response));
    })
    .catch((error) => {
      dispatch(getAllUsersFailure("Error: Failed to get all partners!"));
    });
};

// Get user by userId
const getUserByIdSuccess = (payload) => ({
  type: userConstants.GET_USER_BY_ID_SUCCESS,
  payload,
});
const getUserByIdFailure = (payload) => ({
  type: userConstants.GET_USER_BY_ID_FAILURE,
  payload,
});
export const getUserByUserId = (userId) => (dispatch) => {
  dispatch({ type: userConstants.GET_USER_BY_ID_REQUEST });
  return axios
    .get(`api/user/GetUsers/${userId}`)
    .then((res) => {
      const response = res.data;
      dispatch(getUserByIdSuccess(response));
    })
    .catch((error) => {
      dispatch(getUserByIdFailure(error));
    });
};
