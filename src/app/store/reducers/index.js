import auth from "app/auth/store/reducers";
import fuse from "app/store/reducers/fuse";
import { combineReducers } from "redux";

/**
 * Root reducer
 * @param asyncReducers
 */
const createReducer = asyncReducers =>
  combineReducers({
    auth,
    fuse,
    ...asyncReducers
  });

export default createReducer;
