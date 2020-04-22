import axios from "axios";
import { history } from "../App";
// import { store } from "../index";

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
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

const loginSuccess = (payload) => ({
  type: LOGIN_SUCCESS,
  payload,
});
const loginFailure = (payload) => ({
  type: LOGIN_FAILURE,
  payload,
});
export const loginUser = (user) => (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  return axios
    .post("api/user/authenticate", user)
    .then((res) => {
      dispatch(loginSuccess(res.data));

      if (localStorage.getItem("user") === null) {
        localStorage.setItem("user", JSON.stringify(res.data)); // Set up local storage
        console.log("User is logged in"); //To be cleaned
      } else {
        localStorage.clear();
        localStorage.setItem("user", JSON.stringify(res.data));
        // console.log("User is logged in ");
      }
      console.log(localStorage.getItem("user", JSON.stringify(res.data)));
      // console.log("Response: ", res.data); //tbc
      // console.log("Get State: ", store.getState()); //tbc
      history.push("/home");
      window.location.reload();
    })
    .catch((error) => {
      dispatch(loginFailure(error));
    });
};

// Logout User
export const LOGOUT_USER = "LOGOUT_USER";
export const logoutUser = () => (dispatch) => {
  dispatch({ type: LOGOUT_USER });
  if (localStorage.getItem("user") !== null) {
    localStorage.removeItem("user");
    console.log("Logged Out User!"); // tbc
  } else {
    localStorage.clear();
    console.log("Clear All Login Sessions"); // tbc
  }
  return {};
};

//Regsiter User
export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAILURE = "REGISTER_USER_FAILURE";
const registerSuccess = (payload) => ({
  type: REGISTER_USER_SUCCESS,
  payload,
});
const registerFailure = (payload) => ({
  type: REGISTER_USER_FAILURE,
  payload,
});
export const resgisterUser = (user) => (dispatch) => {
  dispatch({ type: REGISTER_USER_REQUEST });
  return axios
    .post("api/user/registeruser", user)
    .then((res) => {
      const response = res.data;
      dispatch(registerSuccess(response));
      console.log("repsonse: ", res);
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
export const USER_BY_ID_REQUEST = "USER_BY_ID_REQUEST";
export const USER_BY_ID_SUCCESS = "USER_BY_ID_SUCCESS";
export const USER_BY_ID_FAILURE = "USER_BY_ID_FAILURE";

const getUserByIdSuccess = (payload) => ({
  type: USER_BY_ID_SUCCESS,
  payload,
});
const getUserByIdFailure = (payload) => ({
  type: USER_BY_ID_FAILURE,
  payload,
});
export const getAuthUser = () => (dispatch) => {
  dispatch({ type: USER_BY_ID_REQUEST });
  const userId = getUserId();
  // console.log("User Id: ", userId); //tbc
  return axios
    .get(`/api/user/getusers/${userId}`)
    .then((res) => {
      dispatch(getUserByIdSuccess(res.data));
      // console.log("Successfully Got User: ", res.data);
    })
    .catch((error) => {
      dispatch(getUserByIdFailure(error.data));
    });
};

// Update User Information
export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE";

const headers = {
  "Content-Type": "multipart/form-data",
  type: "formData",
};

const UpdateUserSuccess = (payload) => ({
  type: UPDATE_USER_SUCCESS,
  payload,
});
const UpdateUserFailure = (payload) => ({
  type: UPDATE_USER_FAILURE,
  payload,
});
export const UpdateUser = (user) => (dispatch) => {
  const userId = getUserId();
  dispatch({ type: UPDATE_USER_REQUEST });
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
