import * as Actions from "../actions";
import _ from "@lodash";

const initialState = {
  data: []
};

const questionsReducer = function(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_CATEGORIES_SUCCESS: {
      return {
        ...state,
        data: [...action.payload]
      };
    }
    default: {
      return state;
    }
  }
};

export default questionsReducer;
