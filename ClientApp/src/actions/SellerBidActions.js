import axios from "axios";
import history from "../App";
import { bidConstants } from "../constants/bidConstants";
import { getUserId } from "../actions/authAction";

// Get all seller Bids
const GetAllSellerBidsSuccess = (payload) => ({
  type: bidConstants.SELLER_GET_ALL_BID_SUCCESS,
  payload,
});
const GetAllSellerBidsFailure = (payload) => ({
  type: bidConstants.SELLER_GET_ALL_BID_FAILURE,
  payload,
});
export const GetAllSellerBids = () => (dispatch) => {
  dispatch({ type: bidConstants.SELLER_GET_ALL_BID_REQUEST });
  return axios
    .get("api/sellerbid/getSellerBids")
    .then((res) => {
      const response = res.data;
      dispatch(GetAllSellerBidsSuccess(response));
    })
    .catch((error) => {
      dispatch(GetAllSellerBidsFailure(error));
    });
};

// Get seller bid by seller bid id
const SellerBidByIdSuccess = (payload) => ({
  type: bidConstants.SELLER_GET_BID_BY_ID_SUCCESS,
  payload,
});
const SellerBidByIdFailure = (payload) => ({
  type: bidConstants.SELLER_GET_BID_BY_ID_FAILURE,
  payload,
});
export const GetSellerBidById = (sellerBidId) => (dispatch) => {
  dispatch({ type: bidConstants.SELLER_GET_BID_BY_ID_REQUEST });
  return axios
    .get(`api/sellerbid/getsellerbids/${sellerBidId}`)
    .then((res) => {
      const response = res.data;
      dispatch(SellerBidByIdSuccess(response));
    })
    .catch((error) => {
      dispatch(SellerBidByIdFailure(error));
    });
};

// Get all seller bids by buyer bid id
const SellerBidByBuyerBidSuccess = (payload) => ({
  type: bidConstants.SELLER_GET_BID_BY_BUYERBID_ID_SUCCESS,
  payload,
});
const SellerBidByBuyerBidFailure = (payload) => ({
  type: bidConstants.SELLER_GET_BID_BY_BUYERBID_ID_FAILURE,
  payload,
});
export const GetSellerBidByBuyerBid = (buyerBidId) => (dispatch) => {
  dispatch({ type: bidConstants.SELLER_GET_BID_BY_BUYERBID_ID_REQUEST });
  axios
    .get(`api/sellerbid/getsellerbids/buyerbid/${buyerBidId}`)
    .then((res) => {
      const response = res.data;
      dispatch(SellerBidByBuyerBidSuccess(response));
    })
    .catch((error) => {
      dispatch(SellerBidByBuyerBidFailure(error));
    });
};

// Get all seller bids by user id
const GetSellerBidByUserIdSuccess = (payload) => ({
  type: bidConstants.SELLER_GET_BID_BY_USERID_SUCCESS,
  payload,
});
const GetSellerBidByUserIdFailure = (payload) => ({
  type: bidConstants.SELLER_GET_BID_BY_USERID_FAILURE,
  payload,
});
export const GetSellerBidsByUserId = () => (dispatch) => {
  dispatch({ type: bidConstants.SELLER_GET_BID_BY_USERID_REQUEST });
  const userId = getUserId();
  return axios
    .get(`api/sellerbid/getsellerbids/user/${userId}`)
    .then((res) => {
      const response = res.data;
      dispatch(GetSellerBidByUserIdSuccess(response));
      // console.log("Response: ", response); //tbc
      // console.log("Get State: ", store.getState()); //tbc
    })
    .catch((error) => {
      dispatch(GetSellerBidByUserIdFailure(error));
      // console.log("Error:", error); //tbc
      // return Promise.reject({});
    });
};

// Create seller Bid
const CreateSellerBidSuccess = (payload) => ({
  type: bidConstants.SELLER_CREATE_BID_SUCCESSS,
  payload,
});
const CreateSellerBidFailure = (payload) => ({
  type: bidConstants.SELLER_CREATE_BID_FAILURE,
  payload,
});
export const CreateSellerBid = (sellerBid) => (dispatch) => {
  dispatch({ type: bidConstants.SELLER_CREATE_BID_REQUEST });
  return axios
    .post(`api/sellerbid/createsellerbid`, sellerBid)
    .then((res) => {
      const response = res.data;
      dispatch(CreateSellerBidSuccess(response));
      history.push("/home");
      window.location.reload();
    })
    .catch((error) => {
      dispatch(CreateSellerBidFailure(error));
    });
};

// Edit Seller Bid
const UpdateSellerBidSuccess = (payload) => ({
  type: bidConstants.SELLER_UPDATE_BID_SUCCESS,
  payload,
});
const UpdateSellerBidFailure = (payload) => ({
  type: bidConstants.SELLER_UPDATE_BID_FAILURE,
  payload,
});
export const UpdateSellerBid = (sellerBid) => (dispatch) => {
  dispatch({ type: bidConstants.SELLER_UPDATE_BID_REQUEST });
  return axios
    .put(
      `api/sellerbid/updatesellerbid/${sellerBid.sellerBidId}`,
      sellerBid.status
    )
    .then((res) => {
      const response = res.data;
      dispatch(UpdateSellerBidSuccess(response));
    })
    .catch((error) => {
      dispatch(UpdateSellerBidFailure(error));
    });
};

// Delete Seller Bid
const DeleteSellerBidSuccess = (payload) => ({
  type: bidConstants.SELLER_DELETE_BID_SUCCESS,
  payload,
});
const DeleteSellerBidFailure = (payload) => ({
  type: bidConstants.SELLER_DELETE_BID_FAILURE,
  payload,
});
export const DeleteSellerBid = (sellerBidId) => (dispatch) => {
  dispatch({ type: bidConstants.SELLER_DELETE_BID_REQUEST });
  return axios
    .delete(`api/sellerBid/deleteSellerBid/${sellerBidId}`)
    .then((res) => {
      const response = res.data;
      dispatch(DeleteSellerBidSuccess(response));
      history.push("/quotations");
      window.location.reload();
    })
    .catch((error) => {
      dispatch(DeleteSellerBidFailure(error));
    });
};
