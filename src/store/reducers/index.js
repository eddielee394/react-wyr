import { combineReducers } from "redux";
import fuse from "./fuse";
import questions from "./questions.reducers";
import auth from "../../auth/store/reducers";
import users from "./users.reducer";
/**
 * Root reducer
 * @param asyncReducers
 */
const createReducer = asyncReducers =>
  combineReducers({
    auth,
    // users,
    questions,
    fuse,
    ...asyncReducers
  });

export default createReducer;
