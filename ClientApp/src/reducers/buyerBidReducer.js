import { bidConstants } from "../constants/bidConstants";

const INITIAL_STATE = {
  isLoading: false,
  hasError: false,
  error: null,
  data: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case bidConstants.BUYER_CREATE_BID_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case bidConstants.BUYER_CREATE_BID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case bidConstants.BUYER_DELETE_BID_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        error: action.payload
      };
    case bidConstants.BUYER_GET_ALL_BID_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case bidConstants.BUYER_GET_ALL_BID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case bidConstants.BUYER_GET_ALL_BID_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
  }
};
