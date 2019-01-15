import { combineReducers } from "redux";
import questions from "components/polls/store/reducers/questions.reducer";
import categories from "components/polls/store/reducers/categories.reducer";
import category from "components/polls/store/reducers/category.reducer";
import filters from "components/polls/store/reducers/filters.reducer";

const reducer = combineReducers({
  categories,
  category,
  questions,
  filters
});

export default reducer;
