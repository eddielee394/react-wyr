import * as Actions from "../actions";
import _ from "@lodash";

const initialState = {
  data: [],
  categories: [],
  category: {},
  searchText: "",
  categoryFilter: 0
};

const questionsReducer = function(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_QUESTIONS: {
      return {
        ...state,
        data: action.payload
      };
    }
    case Actions.GET_CATEGORIES: {
      return {
        ...state,
        categories: action.payload
      };
    }
    case Actions.GET_QUESTIONS_BY_CATEGORY: {
      return {
        ...state,
        data: action.questions,
        category: action.category
      };
    }
    case Actions.SET_QUESTIONS_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.searchText
      };
    }
    case Actions.SET_QUESTIONS_CATEGORY_FILTER: {
      return {
        ...state,
        categoryFilter: action.category
      };
    }
    default: {
      return state;
    }
  }
};

export default questionsReducer;
