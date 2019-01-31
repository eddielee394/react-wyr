import _ from "@lodash";
import * as Actions from "app/components/polls/store/actions";

const initialState = {
  data: [],
  routeParams: {}
};

const questionsReducer = function(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_QUESTIONS_SUCCESS: {
      console.log("Actions.GET_QUESTIONS_SUCCESS", action);
      return {
        ...state,
        data: action.payload,
        routeParams: action.config.params
      };
    }
    case Actions.GET_QUESTIONS_BY_CATEGORY_SUCCESS: {
      console.log("GET_QUESTIONS_BY_CATEGORY_SUCCESS", action);
      return {
        ...state,
        data: action.payload,
        routeParams: action.config.params
      };
    }
    case Actions.STORE_QUESTION_SUCCESS: {
      return {
        ...state,
        data: [...state.data, { ...action.payload }]
      };
    }
    case Actions.UPDATE_QUESTION_SUCCESS: {
      const { questionId, answerId, userId } = action.config.params;

      const question = _.find(state.data, { id: questionId });

      const questionIndex = _.findIndex(state.data, { id: questionId });

      const updatedQuestion = {
        ...question,
        answers: {
          ...question.answers,
          [answerId]: {
            ...question.answers[answerId],
            votes: [...question.answers[answerId].votes, { id: userId }]
          }
        }
      };

      let updatedData = [];
      updatedData = [
        ...state.data.slice(0, questionIndex),
        {
          ...state.data[questionIndex],
          ...updatedQuestion
        },
        ...state.data.slice(questionIndex + 1)
      ];

      return {
        ...state,
        data: updatedData
      };
    }
    default: {
      return state;
    }
  }
};

export default questionsReducer;
