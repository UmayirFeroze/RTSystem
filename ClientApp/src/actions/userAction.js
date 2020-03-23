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
