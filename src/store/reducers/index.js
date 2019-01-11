import { combineReducers } from "redux";
import fuse from "store/reducers/fuse";
import auth from "auth/store/reducers";

/**
 * Root reducer
 * @param asyncReducers
 * @param history
 */
const createReducer = asyncReducers =>
  combineReducers({
    auth,
    fuse,
    ...asyncReducers
  });

export default createReducer;
