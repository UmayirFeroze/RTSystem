import {
  BUYER_GET_ALL_BID_REQUEST,
  BUYER_GET_ALL_BID_SUCCESS,
  BUYER_GET_ALL_BID_FAILURE,
  BUYER_CREATE_BID_REQUEST,
  BUYER_CREATE_BID_SUCCESS,
  BUYER_CREATE_BID_FAILURE,
  BUYER_BIDS_BY_USER_REQUEST,
  BUYER_BIDS_BY_USER_SUCCESS,
  BUYER_BIDS_BY_USER_FAILURE,
  BUYER_BIDS_POSTED_REQUEST,
  BUYER_BIDS_POSTED_SUCCESS,
  BUYER_BIDS_POSTED_FAILURE,
} from "../actions/BuyerBidActions";

const INITIAL_STATE = {
  loading: false,
  hasError: false,
  error: null,
  data: [],
};

const buyerBidReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BUYER_CREATE_BID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case BUYER_CREATE_BID_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case BUYER_CREATE_BID_FAILURE:
      return {
        ...state,
        loading: false,
        hasError: true,
        error: action.payload,
      };

    case BUYER_GET_ALL_BID_REQUEST:
      return {
        ...state,
        loading: true,
        hasError: false,
      };
    case BUYER_GET_ALL_BID_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case BUYER_GET_ALL_BID_FAILURE:
      return {
        ...state,
        loading: false,
        hasError: true,
        error: action.payload,
      };
    case BUYER_BIDS_BY_USER_REQUEST:
      return {
        ...state,
        loading: true,
        hasError: false,
      };
    case BUYER_BIDS_BY_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case BUYER_BIDS_BY_USER_FAILURE:
      return {
        ...state,
        loading: false,
        hasError: true,
        error: action.payload,
      };
    case BUYER_BIDS_POSTED_REQUEST:
      return {
        ...state,
        loading: true,
        hasError: false,
      };
    case BUYER_BIDS_POSTED_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case BUYER_BIDS_POSTED_FAILURE:
      return {
        ...state,
        loading: false,
        hasError: true,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default buyerBidReducer;
