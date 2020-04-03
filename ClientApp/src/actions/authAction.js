import axios from "axios";
import { history } from "../App";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

const loginSuccess = payload => ({
  type: LOGIN_SUCCESS,
  payload
});
const loginFailure = payload => ({
  type: LOGIN_FAILURE,
  payload
});
export const loginUser = user => dispatch => {
  dispatch({ type: LOGIN_REQUEST });
  return axios
    .post("api/user/authenticate", user)
    .then(res => {
      dispatch(loginSuccess(res.data));

      if (localStorage.getItem("user") === null) {
        localStorage.setItem("user", JSON.stringify(res.data));
        console.log("User is logged in"); //To be cleaned
      } else {
        localStorage.removeItem("user");
        // localStorage.setItem("user", JSON.stringify(res.data));
        console.log("User is logged in ");
      }
      console.log(localStorage.getItem("user", JSON.stringify(res.data)));
      console.log("Response: ", res);

      history.push("/home");
      window.location.reload();
    })
    .catch(error => {
      dispatch(loginFailure(error));
    });
};

export const USER_BY_ID_REQUEST = "USER_BY_ID_REQUEST";
export const USER_BY_ID_SUCCESS = "USER_BY_ID_SUCCESS";
export const USER_BY_ID_FAILURE = "USER_BY_ID_FAILURE";

const getUserByIdSuccess = payload => ({
  type: USER_BY_ID_SUCCESS,
  payload
});
const getUserByIdFailure = payload => ({
  type: USER_BY_ID_FAILURE,
  payload
});
export const getUserById = userId => dispatch => {
  dispatch({ type: USER_BY_ID_REQUEST });
  return axios.post("api/user/getusers/{userId}", userId).then(res => {
    dispatch(getUserByIdSuccess(res.data));
    console.log("Successfully Got User: ", res.data);
  });
  // .catch(error => {
  //     dispatch({getUserByIdFailure(error)})
  //     // return Promise.reject({});
  // });
};
