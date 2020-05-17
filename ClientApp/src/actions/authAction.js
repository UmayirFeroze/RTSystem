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

// Add Profile Picture
const AddPicSuccess = (payload) => ({
  type: userConstants.ADD_PROPIC_SUCCESS,
  payload,
});
const AddPicFailure = (payload) => ({
  type: userConstants.ADD_PROPIC_FAILURE,
  payload,
});
export const AddProPic = (image) => (dispatch) => {
  const userId = getUserId();
  dispatch({ type: userConstants.ADD_PROPIC_REQUEST });
  return axios
    .put(`api/user/${userId}/UploadImage`, image)
    .then((res) => {
      const response = res.data;
      dispatch(AddPicSuccess(response));
    })
    .catch((error) => {
      dispatch(AddPicFailure(error));
    });
};

// Update User Information
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
    .put(`api/user/updateUser/${userId}`, user)
    .then((res) => {
      const response = res.data;
      dispatch(UpdateUserSuccess(response));
      window.location.reload();
    })
    .catch((error) => {
      dispatch(UpdateUserFailure(error));
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
export const resetPassword = (passwords) => (dispatch) => {
  const userId = getUserId();
  dispatch({ type: userConstants.RESET_PASSWORD_REQUEST });
  return axios
    .put(`/api/user/${userId}/resetPassword`, passwords)
    .then((res) => {
      const response = res.data;
      dispatch(ResetPasswordSuccess(response));
    })
    .catch((error) => {
      dispatch(ResetPasswordFailure(error));
    });
};

// Disable user account
const DisableAccountSuccess = (payload) => ({
  type: userConstants.DISABLE_ACCOUNT_SUCCESS,
  payload,
});
const DisableAccountFailure = (payload) => ({
  type: userConstants.DISABLE_ACCOUNT_FAILURE,
  payload,
});
export const disableAccount = () => (dispatch) => {
  const userId = getUserId();
  dispatch({ type: userConstants.DISABLE_ACCOUNT_REQUEST });
  return axios
    .put(`/api/user/${userId}/deactivateAccount`)
    .then((res) => {
      const response = res.data;
      dispatch(DisableAccountSuccess(response));
      history.push("/");
      window.location.reload();
    })
    .catch((error) => {
      dispatch(DisableAccountFailure(error));
    });
};
