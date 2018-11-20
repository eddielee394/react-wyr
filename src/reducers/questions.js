import { RECEIVE_QUESTIONS, VOTE_QUESTION_ANSWER } from "../actions/questions";

/**
 * Questions Reducer
 * @param state
 * @param action
 * @return {Object}
 */
const questions = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        //spread the current state
        ...state,
        //merge the actions questions with the current state
        ...action.questions
      };
    case VOTE_QUESTION_ANSWER:
      return {
        ...state,
        //get the question id & build the new object
        [action.questionId]: {
          ...state[action.questionId],
          [action.answer]: {
            ...state[action.questionId][action.answer],
            votes: state[action.questionId][action.answer].votes.concat([
              action.authUser
            ])
          }
        }
      };
    default:
      return state;
  }
};

export default questions;
