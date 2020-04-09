import { combineReducers } from "redux";
import userReducer from "./userReducer";
import buyerBidReducer from "./buyerBidReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  authUser: authReducer,
  users: userReducer,
  buyerBids: buyerBidReducer,
});

export default rootReducer;
