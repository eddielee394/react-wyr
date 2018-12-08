import { API } from "utils";
import { showMessage } from "store/actions/fuse";

export const GET_QUESTION = "[POLLS] GET QUESTION";
export const SAVE_QUESTION = "[POLLS] SAVE QUESTION";
export const UPDATE_QUESTION = "[POLLS] UPDATE QUESTION";

export function getQuestion(params) {
  console.log("Actions.Question.getQuestion params: ", params);

  const request = API.getQuestion(params);
  console.log("Actions.Question.getQuestion request: ", request);

  return dispatch =>
    request.then(response => {
      console.log("Actions.Question.getQuestion response: ", response);
      dispatch({
        type: GET_QUESTION,
        payload: response.data
      });
    });
}

export function saveQuestion(data) {
  const request = API.saveQuestion(data);
  return dispatch =>
    request.then(response => {
      dispatch(showMessage({ message: "Question Saved" }));
      return dispatch({
        type: SAVE_QUESTION,
        payload: response.data
      });
    });
}

/**
 * Handles saving vote for a question answer
 * @param params
 */
// export const addVote = params => dispatch => {
//   return Api.saveQuestionAnswer(params)
//     .then(() => {
//       dispatch(voteQuestionAnswer(params));
//       dispatch(showMessage({ message: "Question Updated" }));
//     })
//     .catch(event => {
//       console.warn("Error in handleVoteQuestionAnswer: ", event);
//       dispatch(voteQuestionAnswer(params));
//       dispatch(showMessage({ message: "Error updating question: " + event }));
//     });
// };

export function updateQuestion(authUser, questionId, answerId) {
  const request = API.updateQuestion({ authUser, questionId, answerId });
  console.log("UpdateQuestion args: ", { authUser, questionId, answerId });

  return dispatch => {
    request
      .then(response => {
        dispatch(showMessage({ message: "Question Updated" }));
        return dispatch({
          type: UPDATE_QUESTION,
          payload: response.data
        });
      })
      .catch(event => {
        console.warn("Error in handleVoteQuestionAnswer: ", event);
        dispatch(showMessage({ message: "Error updating question: " + event }));
      });
  };
}
// export function updateQuestion(data) {
//   return (dispatch, getState) => {
//     const { id } = getState().questions.question;
//     const request = axios.post("/api/question/update", { id, ...data });
//
//     request.then(response => {
//       dispatch(showMessage({ message: "Question Updated" }));
//
//       return dispatch({
//         type: UPDATE_QUESTION,
//         payload: response.data
//       });
//     });
//   };
// }
