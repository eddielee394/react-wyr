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
        data: action.payload
      };
    }
    case Actions.GET_QUESTIONS_BY_CATEGORY_SUCCESS: {
      const categoryId = action.config.params.categoryId;

      let questions = state.data.filter(
        question => question.categoryId === categoryId
      );

      return {
        ...state,
        data: questions
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
