import { bidConstants } from "../constants/bidConstants";
import axios from "axios";

// Buyer Get Bid by Id
const getAllBidsSuccess = payload => ({
  type: bidConstants.BUYER_GET_ALL_BID_SUCCESS,
  payload
});
const getAllBidsFailure = payload => ({
  type: bidConstants.BUYER_GET_ALL_BID_FAILURE,
  payload
});
export const getAllBids = () => dispatch => {
  dispatch({ type: bidConstants.BUYER_GET_ALL_BID_REQUEST });
  return axios
    .get("api/buyerbid/getbuyerbids")
    .then(result => {
      const response = result.data;
      dispatch(getAllBidsSuccess(response));
    })
    .catch(error => {
      return getAllBidsFailure(error);
    });
};

// Buyer Create Bid
const createBidSuccess = payload => ({
  type: bidConstants.BUYER_CREATE_BID_SUCCESS,
  payload
});
const createBidFailure = payload => ({
  type: bidConstants.BUYER_DELETE_BID_FAILURE,
  payload
});
export const createBid = () => dispatch => {
  dispatch({ type: bidConstants.BUYER_DELETE_BID_REQUEST });
  axios
    .post("api/buyerbid/createbuyerbid")
    .then(result => {
      const response = result.data;
      dispatch(createBidSuccess(response));
    })
    .catch(error => {
      return createBidFailure(error);
    });
};

// Buyer Edit Bid

// Buyer Delete Bid
