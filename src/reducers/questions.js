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
          //spread the state from the old object
          ...state[action.questionId],
          //find the answer object
          [action.answer]: {
            //spread the  state from the old answer object
            ...state[action.questionId][action.answer],
            //update the votes on the answer object with the new state
            votes:
              //if the user already voted, than do nothing,  otherwise add their vote
              state[action.questionId][action.answer].votes.concat([
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
