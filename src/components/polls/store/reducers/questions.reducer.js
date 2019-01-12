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
    case Actions.GET_QUESTIONS_BY_CATEGORY_SUCCESS: {
      const categoryId = action.config.params.categoryId;

      let questions = state.data.filter(
        question => question.categoryId === categoryId
      );

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
