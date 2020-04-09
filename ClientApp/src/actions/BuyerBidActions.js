import axios from "axios";
// import { history } from "../App";
import { getUserId } from "./authAction";

// Buyer Get All Bids
export const BUYER_GET_ALL_BID_REQUEST = "BUYER_GET_ALL_BID_REQUEST";
export const BUYER_GET_ALL_BID_SUCCESS = "BUYER_GET_ALL_BID_SUCCESS";
export const BUYER_GET_ALL_BID_FAILURE = "BUYER_GET_ALL_BID_FAILURE";

const getAllBidsSuccess = (payload) => ({
  type: BUYER_GET_ALL_BID_SUCCESS,
  payload,
});
const getAllBidsFailure = (payload) => ({
  type: BUYER_GET_ALL_BID_FAILURE,
  payload,
});
export const getAllBids = () => (dispatch) => {
  dispatch({ type: BUYER_GET_ALL_BID_REQUEST });
  return axios
    .get("api/buyerbid/getbuyerbids")
    .then((result) => {
      const response = result.data;
      dispatch(getAllBidsSuccess(response));
    })
    .catch((error) => {
      dispatch(getAllBidsFailure("Something Went wrong!"));
      return Promise.reject({});
    });
};

// Buyer Create Bid
export const BUYER_CREATE_BID_REQUEST = "BUYER_CREATE_BID_REQUEST";
export const BUYER_CREATE_BID_SUCCESS = "BUYER_CREATE_BID_SUCCESS";
export const BUYER_CREATE_BID_FAILURE = "BUYER_CREATE_BID_FAILURE";

const createBidSuccess = (payload) => ({
  type: BUYER_CREATE_BID_SUCCESS,
  payload,
});
const createBidFailure = (payload) => ({
  type: BUYER_CREATE_BID_FAILURE,
  payload,
});
export const createBid = (buyerBid) => (dispatch) => {
  dispatch({ type: BUYER_CREATE_BID_REQUEST });
  return axios
    .post("api/buyerbid/createbuyerbid", buyerBid)
    .then((result) => {
      const response = result.data;
      dispatch(createBidSuccess(response));
      // window.location.reload();
    })
    .catch((error) => {
      dispatch(createBidFailure(error));
    });
};

// Get Buyer Bids Posted by Authenticated User
export const BUYER_BIDS_BY_USER_REQUEST = "BUYER_BIDS_BY_USER_REQUEST";
export const BUYER_BIDS_BY_USER_SUCCESS = "BUYER_BIDS_BY_USER_SUCCESS";
export const BUYER_BIDS_BY_USER_FAILURE = "BUYER_BIDS_BY_USER_FAILURE";
const getBuyerBidsByUserIdSuccess = (payload) => ({
  type: BUYER_BIDS_BY_USER_SUCCESS,
  payload,
});
const getBuyerBidsByUserIdFailure = (payload) => ({
  type: BUYER_BIDS_BY_USER_FAILURE,
  payload,
});
export const getBuyerBidsByUserId = () => (dispatch) => {
  dispatch({ type: BUYER_BIDS_BY_USER_REQUEST }); // to be completed
  let userId = getUserId();
  return axios
    .get(`api/buyerbid/getbuyerbids/user/${userId}`)
    .then((result) => {
      const response = result.data;
      dispatch(getBuyerBidsByUserIdSuccess(response));
    })
    .catch((error) => {
      dispatch(getBuyerBidsByUserIdFailure(error.data));
      // Promise.reject({});
    });
};

// Get Buyer Bids Posted By Other Users
export const BUYER_BIDS_POSTED_REQUEST = "BUYER_BIDS_POSTED_REQUEST";
export const BUYER_BIDS_POSTED_SUCCESS = "BUYER_BIDS_POSTED_SUCCESS";
export const BUYER_BIDS_POSTED_FAILURE = "BUYER_BIDS_BY_USER_FAILURE";
const getBuyerBidsNotByUserIdSuccess = (payload) => ({
  type: BUYER_BIDS_POSTED_SUCCESS,
  payload,
});
const getBuyerBidsNotByUserIdFailure = (payload) => ({
  type: BUYER_BIDS_POSTED_FAILURE,
  payload,
});
export const getBuyerBidsNotByUserId = () => (dispatch) => {
  dispatch({ type: BUYER_BIDS_POSTED_REQUEST }); // to be completed
  const userId = getUserId();
  return axios
    .get(`api/buyerbid/getbuyerbids/usernot/${userId}`)
    .then((result) => {
      const response = result.data;
      dispatch(getBuyerBidsNotByUserIdSuccess(response));
    })
    .catch((error) => {
      dispatch(getBuyerBidsNotByUserIdFailure(error.data));
      // Promise.reject({});
    });
};

// Buyer Edit Bid

// Buyer Delete Bid
