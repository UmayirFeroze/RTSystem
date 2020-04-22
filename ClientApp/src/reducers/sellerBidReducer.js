import { bidConstants } from "../constants/bidConstants";

const INITIAL_STATE = {
  loading: false,
  hasError: false,
  error: null,
  data: [],
};

const sellerBidReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case bidConstants.SELLER_CREATE_BID_REQUEST: // Create Seller Bid
      return { ...state, loading: true };
    case bidConstants.SELLER_CREATE_BID_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case bidConstants.SELLER_CREATE_BID_FAILURE:
      return {
        ...state,
        loading: false,
        hasError: true,
        error: action.payload,
      };

    case bidConstants.SELLER_UPDATE_BID_REQUEST: // Update Seller Bid
      return { ...state, loading: true, hasError: false };
    case bidConstants.SELLER_UPDATE_BID_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case bidConstants.SELLER_UPDATE_BID_FAILURE:
      return {
        ...state,
        loading: false,
        hasError: true,
        error: action.payload,
      };

    case bidConstants.SELLER_DELETE_BID_REQUEST: // Delete Seller Bid
      return { ...state, loading: true, hasError: false };
    case bidConstants.SELLER_DELETE_BID_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case bidConstants.SELLER_DELETE_BID_FAILURE:
      return {
        ...state,
        loading: false,
        hasError: true,
        error: action.payload,
      };

    case bidConstants.SELLER_GET_ALL_BID_REQUEST: // Get All Seller Bids
      return { ...state, loading: true, hasError: false };
    case bidConstants.SELLER_GET_ALL_BID_SUCCESS:
      return {
        ...state,
        loading: false,
        hasError: false,
        data: action.payload,
      };
    case bidConstants.SELLER_GET_ALL_BID_FAILURE:
      return {
        ...state,
        loading: false,
        hasError: true,
        error: action.payload,
      };

    case bidConstants.SELLER_GET_BID_BY_BUYERBID_ID_REQUEST: // Seller Bids by Buyer Bid ID
      return { ...state, loading: true, hasError: false };
    case bidConstants.SELLER_GET_BID_BY_BUYERBID_ID_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case bidConstants.SELLER_GET_BID_BY_BUYERBID_ID_FAILURE:
      return {
        ...state,
        loading: false,
        hasError: true,
        error: action.payload,
      };

    case bidConstants.SELLER_GET_BID_BY_USERID_REQUEST: // Seller Bids by User ID
      return { ...state, loading: true, hasError: false };
    case bidConstants.SELLER_GET_BID_BY_USERID_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case bidConstants.SELLER_GET_BID_BY_USERID_FAILURE:
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

export default sellerBidReducer;
