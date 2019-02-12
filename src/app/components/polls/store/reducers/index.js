import categories from "./categories.reducer";
import category from "./category.reducer";
import filters from "./filters.reducer";
import questions from "./questions.reducer";
import question from "./question.reducer";
import { combineReducers } from "redux";

const reducer = combineReducers({
  categories,
  category,
  questions,
  question,
  filters
});

export default reducer;
