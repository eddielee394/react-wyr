import categories from "./categories.reducer";
import category from "./category.reducer";
import filters from "./filters.reducer";
import questions from "./questions.reducer";
import { combineReducers } from "redux";

const reducer = combineReducers({
  categories,
  category,
  questions,
  filters
});

export default reducer;
