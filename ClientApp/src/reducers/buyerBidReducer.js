import {
  BUYER_GET_ALL_BID_REQUEST,
  BUYER_GET_ALL_BID_SUCCESS,
  BUYER_GET_ALL_BID_FAILURE,
  BUYER_CREATE_BID_REQUEST,
  BUYER_CREATE_BID_SUCCESS,
  BUYER_CREATE_BID_FAILURE
} from "../actions/BuyerBidActions";

const INITIAL_STATE = {
  loading: false,
  hasError: false,
  error: null,
  data: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BUYER_CREATE_BID_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case BUYER_CREATE_BID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case BUYER_CREATE_BID_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        error: action.payload
      };
    case BUYER_GET_ALL_BID_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case BUYER_GET_ALL_BID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        data: action.payload
      };
    case BUYER_GET_ALL_BID_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        error: action.payload
      };
    default:
      return state;
  }
};
