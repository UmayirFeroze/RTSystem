import { bidConstants } from "../constants/bidConstants";

const INITIAL_STATE = {
  loading: false,
  hasError: false,
  error: null,
  data: [],
};

const buyerBidReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case bidConstants.BUYER_GET_ALL_BID_REQUEST: // Get all buyer bids
      return { ...state, loading: true, hasError: false };
    case bidConstants.BUYER_GET_ALL_BID_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case bidConstants.BUYER_GET_ALL_BID_FAILURE:
      return {
        ...state,
        loading: false,
        hasError: true,
        error: action.payload,
      };

    case bidConstants.BUYER_BID_BY_ID_REQUEST: // Get Buyer Bid By BuyerBidId
      return { ...state, loading: true, hasError: false };
    case bidConstants.BUYER_BID_BY_ID_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case bidConstants.BUYER_BID_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        hasError: true,
        error: action.payload,
      };

    case bidConstants.BUYER_CREATE_BID_REQUEST: // Create buyer Bid
      return { ...state, loading: true };
    case bidConstants.BUYER_CREATE_BID_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case bidConstants.BUYER_CREATE_BID_FAILURE:
      return {
        ...state,
        loading: false,
        hasError: true,
        error: action.payload,
      };

    case bidConstants.BUYER_EDIT_BID_REQUEST: // Edit Buyer bid
      return { ...state, loading: true };
    case bidConstants.BUYER_EDIT_BID_SUCCESS:
      return { ...state, laoding: false, data: action.payload };
    case bidConstants.BUYER_EDIT_BID_FAILURE:
      return {
        ...state,
        loading: false,
        hasError: true,
        error: action.payload,
      };

    case bidConstants.BUYER_BIDS_BY_USER_REQUEST: // Get buyer bids by user Id
      return { ...state, loading: true, hasError: false };
    case bidConstants.BUYER_BIDS_BY_USER_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case bidConstants.BUYER_BIDS_BY_USER_FAILURE:
      return {
        ...state,
        loading: false,
        hasError: true,
        error: action.payload,
      };

    case bidConstants.BUYER_BIDS_POSTED_REQUEST: // Get Buyer Bids posted by other users
      return { ...state, loading: true, hasError: false };
    case bidConstants.BUYER_BIDS_POSTED_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case bidConstants.BUYER_BIDS_POSTED_FAILURE:
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
