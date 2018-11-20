import { combineReducers } from "redux";
import questions from "./questions";
import users from "./users";

/**
 * Root reducer
 * @param questions
 * @param users
 */
export default combineReducers({
  questions,
  users
});
