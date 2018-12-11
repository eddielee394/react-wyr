import { Api } from "../../utils";
import { questionConstants } from "../constants";

/**
 * Receive Questions action type
 * @param questions
 * @return {{type: string, questions: *}}
 */
export const receiveQuestions = questions => ({
  type: questionConstants.RECEIVE_QUESTIONS,
  questions
});

export const voteQuestionAnswer = ({ authUser, questionId, answer }) => ({
  type: questionConstants.VOTE_QUESTION_ANSWER,
  authUser,
  questionId,
  answer
});

/**
 * Handles saving vote for a question answer
 * @param params
 */
export const handleVoteQuestionAnswer = params => dispatch => {
  return Api.saveQuestionAnswer(params)
    .then(() => {
      dispatch(voteQuestionAnswer(params));
    })
    .catch(event => {
      console.warn("Error in handleVoteQuestionAnswer: ", event);
      dispatch(voteQuestionAnswer(params));
      //todo add toast notification
    });
};
