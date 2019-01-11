import * as Actions from "../actions";
import _ from "@lodash";

const initialState = {
  data: []
};

const questionsReducer = function(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_QUESTIONS_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        routeParams: action.routeParams
      };
    }
    case Actions.GET_QUESTIONS_BY_CATEGORY: {
      console.log("Actions.GET_QUESTIONS_BY_CATEGORY", action, state);
      let questions = state.data.filter(
        question => question.categoryId === action.payload
      );
      console.log("Actions.GET_QUESTIONS_BY_CATEGORY", questions);
      return {
        ...state,
        // questions: action.payload
        data: questions
      };
    }
    default: {
      return state;
    }
  }
};

export default questionsReducer;
