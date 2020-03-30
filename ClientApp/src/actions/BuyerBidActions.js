import axios from "axios";

// Buyer Get All Bids
export const BUYER_GET_ALL_BID_REQUEST = "BUYER_GET_ALL_BID_REQUEST";
export const BUYER_GET_ALL_BID_SUCCESS = "BUYER_GET_ALL_BID_SUCCESS";
export const BUYER_GET_ALL_BID_FAILURE = "BUYER_GET_ALL_BID_FAILURE";

const getAllBidsSuccess = payload => ({
  type: BUYER_GET_ALL_BID_SUCCESS,
  payload
});
const getAllBidsFailure = payload => ({
  type: BUYER_GET_ALL_BID_FAILURE,
  payload
});
export const getAllBids = () => dispatch => {
  dispatch({ type: BUYER_GET_ALL_BID_REQUEST });
  return axios
    .get("api/buyerbid/getbuyerbids")
    .then(result => {
      const response = result.data;
      dispatch(getAllBidsSuccess(response));
    })
    .catch(error => {
      dispatch(getAllBidsFailure("Something Went wrong!"));
      return Promise.reject({});
    });
};

// Buyer Create Bid
export const BUYER_CREATE_BID_REQUEST = "BUYER_CREATE_BID_REQUEST";
export const BUYER_CREATE_BID_SUCCESS = "BUYER_CREATE_BID_SUCCESS";
export const BUYER_CREATE_BID_FAILURE = "BUYER_CREATE_BID_FAILURE";

const createBidSuccess = payload => ({
  type: BUYER_CREATE_BID_SUCCESS,
  payload
});
const createBidFailure = payload => ({
  type: BUYER_CREATE_BID_FAILURE,
  payload
});
export const createBid = buyerBid => dispatch => {
  dispatch({ type: BUYER_CREATE_BID_REQUEST });
  axios
    .post("api/buyerbid/createbuyerbid", buyerBid)
    .then(result => {
      const response = result.data;
      dispatch(createBidSuccess(response));
      window.location.reload();
    })
    .catch(error => {
      dispatch(createBidFailure(error));
    });
};

// Buyer Edit Bid

// Buyer Delete Bid
