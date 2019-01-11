import * as Actions from "../actions";

const initialState = {
  searchText: "",
  categoryFilter: 0
};

const filtersReducer = function(state = initialState, action) {
  switch (action.type) {
    case Actions.SET_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.payload
      };
    }
    case Actions.SET_CATEGORY_FILTER: {
      console.log("action.category", action.category);
      return {
        ...state,
        categoryFilter: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

export default filtersReducer;
