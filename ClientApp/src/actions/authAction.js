import axios from "axios";
import { history } from "../App";
import { userConstants } from "../constants/userConstants";

// Get user Id of auth user
export const getUserId = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (localStorage.getItem("user") == null) {
    history.push("/");
    window.location.reload();
  } else {
    return user.userId;
  }
};

// Login User
const loginSuccess = (payload) => ({
  type: userConstants.LOGIN_SUCCESS,
  payload,
});
const loginFailure = (payload) => ({
  type: userConstants.LOGIN_FAILURE,
  payload,
});
export const loginUser = (user) => (dispatch) => {
  dispatch({ type: userConstants.LOGIN_REQUEST });
  return axios
    .post("api/user/authenticate", user)
    .then((res) => {
      dispatch(loginSuccess(res.data));

      if (localStorage.getItem("user") === null) {
        localStorage.setItem("user", JSON.stringify(res.data)); // Set up local storage
      } else {
        localStorage.clear();
        localStorage.setItem("user", JSON.stringify(res.data));
      }
      console.log(localStorage.getItem("user", JSON.stringify(res.data)));
      history.push("/home");
      window.location.reload();
    })
    .catch((error) => {
      dispatch(loginFailure(error));
    });
};

// Logout User
export const logoutUser = () => (dispatch) => {
  dispatch({ type: userConstants.LOGOUT_USER });
  localStorage.clear();
};

//Regsiter User
const registerSuccess = (payload) => ({
  type: userConstants.REGISTER_USER_SUCCESS,
  payload,
});
const registerFailure = (payload) => ({
  type: userConstants.REGISTER_USER_FAILURE,
  payload,
});
export const resgisterUser = (user) => (dispatch) => {
  dispatch({ type: userConstants.REGISTER_USER_REQUEST });
  return axios
    .post("api/user/registeruser", user)
    .then((res) => {
      const response = res.data;
      dispatch(registerSuccess(response));
      history.push("/");
      window.location.reload();
    })
    .catch((error) => {
      dispatch(registerFailure(error));
      console.log("error", error);
      // history.push("/register"); //Must not relaoad, must wheo erorr messages by clesring data
    });
};

// Get user by Id

const getUserByIdSuccess = (payload) => ({
  type: userConstants.USER_BY_ID_SUCCESS,
  payload,
});
const getUserByIdFailure = (payload) => ({
  type: userConstants.USER_BY_ID_FAILURE,
  payload,
});
export const getAuthUser = () => (dispatch) => {
  dispatch({ type: userConstants.USER_BY_ID_REQUEST });
  const userId = getUserId();
  return axios
    .get(`/api/user/getusers/${userId}`)
    .then((res) => {
      dispatch(getUserByIdSuccess(res.data));
    })
    .catch((error) => {
      dispatch(getUserByIdFailure(error.data));
    });
};

// Update User Information
const headers = {
  "Content-Type": "multipart/form-data",
  type: "formData",
};

const UpdateUserSuccess = (payload) => ({
  type: userConstants.UPDATE_USER_SUCCESS,
  payload,
});
const UpdateUserFailure = (payload) => ({
  type: userConstants.UPDATE_USER_FAILURE,
  payload,
});
export const UpdateUser = (user) => (dispatch) => {
  const userId = getUserId();
  dispatch({ type: userConstants.UPDATE_USER_REQUEST });
  return axios
    .put(`api/user/updateUser/${userId}`, user, {
      headers: headers,
    })
    .then((res) => {
      const response = res.data;
      dispatch(UpdateUserSuccess(response));
      console.log("Password Updated!");
    })
    .catch((error) => {
      dispatch(UpdateUserFailure(error));
      console.log("Failed to Update");
    });
};

// Reset Password
const ResetPasswordSuccess = (payload) => ({
  type: userConstants.RESET_PASSWORD_SUCCESS,
  payload,
});
const ResetPasswordFailure = (payload) => ({
  type: userConstants.RESET_PASSWORD_FAILURE,
  payload,
});
export const ResetPassword = (passwords) => (dispatch) => {
  dispatch({ type: userConstants.RESET_PASSWORD_REQUEST });
  return axios
    .put()
    .then((res) => {
      const response = res.data;
      dispatch(ResetPasswordSuccess(response));
    })
    .catch((error) => dispatch(ResetPasswordFailure(error)));
};

//Disable user account
const DisableAccountSuccess = (payload) => ({
  type: userConstants.DISABLE_ACCOUNT_SUCCESS,
  payload,
});
const DisableAccountFailure = (payload) => ({
  type: userConstants.DISABLE_ACCOUNT_FAILURE,
  payload,
});
export const DisableAccount = () => (dispatch) => {
  const userId = getUserId();
  dispatch({ type: userConstants.DISABLE_ACCOUNT_REQUEST });
  return axios
    .put()
    .then((res) => {
      const response = res.data;
      dispatch(DisableAccountSuccess(response));
    })
    .catch((error) => {
      dispatch(DisableAccountFailure(error));
    });
};
