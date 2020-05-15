import axios from "axios";
import { bidConstants } from "../constants/bidConstants";
import { getUserId } from "./authAction";

// Buyer Get All Bids
const getAllBidsSuccess = (payload) => ({
  type: bidConstants.BUYER_GET_ALL_BID_SUCCESS,
  payload,
});
const getAllBidsFailure = (payload) => ({
  type: bidConstants.BUYER_GET_ALL_BID_FAILURE,
  payload,
});
export const getAllBids = () => (dispatch) => {
  dispatch({ type: bidConstants.BUYER_GET_ALL_BID_REQUEST });
  return axios
    .get("api/buyerbid/getbuyerbids")
    .then((result) => {
      const response = result.data;
      dispatch(getAllBidsSuccess(response));
    })
    .catch((error) => {
      dispatch(getAllBidsFailure(error));
    });
};

// Get Buyer Bid by Buyer Bid ID
const getBuyerBidByIdSuccess = (payload) => ({
  type: bidConstants.BUYER_BIDS_BY_USER_SUCCESS,
  payload,
});
const getBuyerBidByIdFailure = (payload) => ({
  type: bidConstants.BUYER_BIDS_BY_USER_FAILURE,
  payload,
});
export const getBuyerBidById = (buyerBidId) => (dispatch) => {
  dispatch({ type: bidConstants.BUYER_BIDS_BY_USER_REQUEST });
  return axios
    .get(`api/buyerbid/getbuyerbids/${buyerBidId}`)
    .then((result) => {
      const response = result.data;
      dispatch(getBuyerBidByIdSuccess(response));
    })
    .catch((error) => {
      getBuyerBidByIdFailure(error);
    });
};

// Buyer Create Bid
const createBidSuccess = (payload) => ({
  type: bidConstants.BUYER_CREATE_BID_SUCCESS,
  payload,
});
const createBidFailure = (payload) => ({
  type: bidConstants.BUYER_CREATE_BID_FAILURE,
  payload,
});
export const createBid = (buyerBid) => (dispatch) => {
  dispatch({ type: bidConstants.BUYER_CREATE_BID_REQUEST });
  return axios
    .post("api/buyerbid/createbuyerbid", buyerBid)
    .then((result) => {
      const response = result.data;
      dispatch(createBidSuccess(response));
      window.location.reload();
    })
    .catch((error) => {
      dispatch(createBidFailure(error));
    });
};

// Get Buyer Bids Posted by Authenticated User
const getBuyerBidsByUserIdSuccess = (payload) => ({
  type: bidConstants.BUYER_BIDS_BY_USER_SUCCESS,
  payload,
});
const getBuyerBidsByUserIdFailure = (payload) => ({
  type: bidConstants.BUYER_BIDS_BY_USER_FAILURE,
  payload,
});
export const getBuyerBidsByUserId = () => (dispatch) => {
  dispatch({ type: bidConstants.BUYER_BIDS_BY_USER_REQUEST });
  let userId = getUserId();
  return axios
    .get(`api/buyerbid/getbuyerbids/user/${userId}`)
    .then((result) => {
      const response = result.data;
      dispatch(getBuyerBidsByUserIdSuccess(response));
    })
    .catch((error) => {
      dispatch(getBuyerBidsByUserIdFailure(error.data));
    });
};

// Get Buyer Bids Posted By Other Users
const getBuyerBidsNotByUserIdSuccess = (payload) => ({
  type: bidConstants.BUYER_BIDS_POSTED_SUCCESS,
  payload,
});
const getBuyerBidsNotByUserIdFailure = (payload) => ({
  type: bidConstants.BUYER_BIDS_POSTED_FAILURE,
  payload,
});
export const getBuyerBidsNotByUserId = () => (dispatch) => {
  dispatch({ type: bidConstants.BUYER_BIDS_POSTED_REQUEST });
  const userId = getUserId();
  return axios
    .get(`api/buyerbid/getbuyerbids/usernot/${userId}`)
    .then((result) => {
      const response = result.data;
      dispatch(getBuyerBidsNotByUserIdSuccess(response));
    })
    .catch((error) => {
      dispatch(getBuyerBidsNotByUserIdFailure(error));
    });
};

// Buyer Edit Bid
const EditBuyerBidSuccess = (payload) => ({
  type: bidConstants.BUYER_EDIT_BID_SUCCESS,
  payload,
});
const EditBuyerBidFailure = (payload) => ({
  type: bidConstants.BUYER_EDIT_BID_FAILURE,
  payload,
});
export const EditBuyerBid = (buyerBid) => (dispatch) => {
  dispatch({ type: bidConstants.BUYER_EDIT_BID_REQUEST });
  const buyerBidId = buyerBid.buyerBidId;
  return axios
    .put(`api/buyerBid/updateBuyerBid/${buyerBidId}`, buyerBid)
    .then((res) => {
      const response = res.data;
      dispatch(EditBuyerBidSuccess(response));
    })
    .catch((error) => {
      dispatch(EditBuyerBidFailure(error));
    });
};

// Buyer Delete Bid
const DeleteBuyerBidSuccess = (payload) => ({
  type: bidConstants.BUYER_DELETE_BID_SUCCESS,
  payload,
});
const DeleteBuyerBidFailure = (payload) => ({
  type: bidConstants.BUYER_DELETE_BID_FAILURE,
  payload,
});
export const DeleteBuyerBid = (buyerBidId) => (dispatch) => {
  dispatch({ type: bidConstants.BUYER_DELETE_BID_REQUEST });
  return axios
    .delete(`api/buyerbid/deletebuyerbid/${buyerBidId}`)
    .then((res) => {
      const response = res.data;
      dispatch(DeleteBuyerBidSuccess(response));
      // history.push(`/requests`);
    })
    .catch((error) => {
      dispatch(DeleteBuyerBidFailure(error));
    });
};
