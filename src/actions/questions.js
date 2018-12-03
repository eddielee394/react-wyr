export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";

/**
 * Receive Questions action type
 * @param questions
 * @return {{type: string, questions: *}}
 */
export const receiveQuestions = questions => ({
  type: RECEIVE_QUESTIONS,
  questions
});
