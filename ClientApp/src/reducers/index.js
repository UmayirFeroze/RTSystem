import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import buyerBidReducer from "./buyerBidReducer";
import sellerBidReducer from "./sellerBidReducer";

const rootReducer = combineReducers({
  authUser: authReducer,
  users: userReducer,
  buyerBids: buyerBidReducer,
  sellerBids: sellerBidReducer,
});

export default rootReducer;
