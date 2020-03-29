import { combineReducers } from "redux";
import userReducer from "./userReducer";
import buyerBidReducer from "./buyerBidReducer";

const rootReducer = combineReducers({
  users: userReducer,
  buyerBids: buyerBidReducer
});

export default rootReducer;
