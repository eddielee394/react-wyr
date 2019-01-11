import * as Actions from "../actions";
import _ from "@lodash";

const initialState = {};

const questionReducer = function(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_QUESTION: {
      return {
        ...state,
        ...action.payload
      };
    }
    case Actions.SAVE_QUESTION: {
      return {
        ...action.payload
      };
    }
    case Actions.UPDATE_QUESTION: {
      console.log("Actions.UPDATE_QUESTION Reducer: ", action.payload);
      //get the users that have already answered the question as an array from the prev state
      const question = state.data.find(
        (_question, index) => _question.id === action.payload.questionId
      );

      const userHasAnswered = question.answers[
        action.payload.answerId
      ].votes.includes(action.payload.authUser);
      console.log("Actions.UPDATE_QUESTION userHasAnswered: ", userHasAnswered);
      let questions = {};
      if (!userHasAnswered) {
        questions = {
          ...state.data
        };
      }
      console.log("Actions.UPDATE_QUESTION questions: ", questions);

      return {
        ...state,
        ...questions
      };
    }
    // case Actions.UPDATE_QUESTION: {
    //   console.log("Actions.UPDATE_QUESTION Reducer: ", state, action.payload);
    //   return {
    //     ...state,
    //     payload: action.payload
    //   };
    // }
    default: {
      return state;
    }
  }
};

export default questionReducer;
