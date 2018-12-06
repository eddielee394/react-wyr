import { API } from "../utils/api";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const VOTE_QUESTION_ANSWER = "VOTE_QUESTION_ANSWER";

/**
 * Receive Questions action type
 * @param questions
 * @return {{type: string, questions: *}}
 */
export const receiveQuestions = questions => ({
  type: RECEIVE_QUESTIONS,
  questions
});

export const voteQuestionAnswer = ({ authUser, questionId, answer }) => ({
  type: VOTE_QUESTION_ANSWER,
  authUser,
  questionId,
  answer
});

/**
 * Handles saving vote for a question answer
 * @param params
 */
export const handleVoteQuestionAnswer = params => dispatch => {
  return API.saveQuestionAnswer(params)
    .then(() => {
      dispatch(voteQuestionAnswer(params));
    })
    .catch(event => {
      console.warn("Error in handleVoteQuestionAnswer: ", event);
      dispatch(voteQuestionAnswer(params));
      //todo add toast notification
    });
};
