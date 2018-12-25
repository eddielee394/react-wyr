import { combineReducers } from "redux";
import fuse from "./fuse";
import auth from "../../auth/store/reducers";
import users from "./users.reducer";

/**
 * Root reducer
 * @param asyncReducers
 * @param history
 */
const createReducer = asyncReducers =>
  combineReducers({
    auth,
    users,
    fuse,
    ...asyncReducers
  });

export default createReducer;
