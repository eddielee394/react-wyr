import { combineReducers } from "redux";
import dialog from "./dialog.reducer";
import navbar from "./navbar.reducer";
import navigation from "./navigation.reducer";
import questions from "./questions.reducers";
import message from "./message.reducer";
import auth from "../../auth/store/reducers";
import users from "./users.reducer";
/**
 * Root reducer
 * @param asyncReducers
 */
const createReducer = asyncReducers =>
  combineReducers({
    auth,
    users,
    questions,
    navigation,
    navbar,
    message,
    dialog,
    ...asyncReducers
  });

export default createReducer;
