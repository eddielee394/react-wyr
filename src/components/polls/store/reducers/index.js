import { combineReducers } from "redux";
import questions from "./questions.reducer";
import question from "./question.reducer";

const reducer = combineReducers({
  questions,
  question
});

export default reducer;
