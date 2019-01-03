import { combineReducers } from "redux";
import fuse from "store/reducers/fuse";
import auth from "auth/store/reducers";
import questions from "components/polls/store/reducers/questions.reducer";
import question from "components/polls/store/reducers/question.reducer";
// import users from "./users.reducer";

/**
 * Root reducer
 * @param asyncReducers
 * @param history
 */
const createReducer = asyncReducers =>
  combineReducers({
    auth,
    fuse,
    polls: questions,
    poll: question,
    ...asyncReducers
  });

export default createReducer;
