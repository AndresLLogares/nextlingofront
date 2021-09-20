import { combineReducers } from "redux";
import reducers from "./reducers";

const rootReducers = combineReducers({
  NextLingo: reducers,
});

export default rootReducers;
