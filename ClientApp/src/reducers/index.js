import { combineReducers } from "redux";
import userRedcuer from "./userReducer";

const rootReducer = combineReducers({
  users: userRedcuer
});

export default rootReducer;
