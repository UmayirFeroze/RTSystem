import axios from "axios";
import history from "../App";
import { bidConstants } from "../constants/bidConstants";

// Get all seller Bids

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

      window.location.reload(false);
    })
    .catch((error) => {
      dispatch(SellerBidByBuyerBidFailure(error));
    });
};

// Get all seller bids by user id

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

// Delete Seller Bid
