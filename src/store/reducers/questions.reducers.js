import * as Actions from "../actions/index";

import { questionConstants } from "../constants";

/**
 * Questions Reducer
 * @param state
 * @param action
 * @return {Object}
 */
const questionsReducers = (state = {}, action) => {
  switch (action.type) {
    case questionConstants.RECEIVE_QUESTIONS:
      return {
        //spread the current state
        ...state,
        //merge the actions questions with the current state
        ...action.questions
      };
    case questionConstants.VOTE_QUESTION_ANSWER:
      //get the users that have already answered the question as an array from the prev state
      const usersAnswered = [...state[action.questionId][action.answer].votes];
      //check if the current user has answered the question already
      const userHasAnswered = usersAnswered.includes(action.authUser);
      //create an empty object to use later
      let setUserVote = {};
      //if user has NOT answered the question already
      if (!userHasAnswered) {
        //create a new object to pass to the store
        setUserVote = {
          //get the question id & build the new question object
          [action.questionId]: {
            //spread the state from the prev question object
            ...state[action.questionId],
            //find the answer object
            [action.answer]: {
              //spread the  state from the prev answer object
              ...state[action.questionId][action.answer],
              //update the votes on the answer object with the new state
              votes:
                //add the user's vote
                state[action.questionId][action.answer].votes.concat([
                  action.authUser
                ])
            }
          }
        };
      }
      return {
        ...state,
        ...setUserVote
      };
    default:
      return state;
  }
};

export default questionsReducers;
