import { combineReducers } from "redux";
import questions from "components/polls/store/reducers/questions.reducer";
import question from "components/polls/store/reducers/question.reducer";
import categories from "components/polls/store/reducers/categories.reducer";
import category from "components/polls/store/reducers/category.reducer";
import filters from "components/polls/store/reducers/filters.reducer";

const reducer = combineReducers({
  questions,
  question,
  categories,
  category,
  filters
});

export default reducer;
