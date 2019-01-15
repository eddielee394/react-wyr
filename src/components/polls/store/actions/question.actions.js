import { updateUserAnswer, updateUserQuestion } from "auth/store/actions";
import { CALL_API } from "middleware/api";
import { showMessage } from "store/actions/fuse";
import { API, Schemas } from "utils";

export const GET_QUESTION = "[POLLS] GET QUESTION";

export const UPDATE_QUESTION = "[POLLS] UPDATE QUESTION";
export const UPDATE_QUESTION_SUCCESS = "[POLLS] UPDATE QUESTION SUCCESS";
export const UPDATE_QUESTION_FAILURE = "[POLLS] UPDATE QUESTION FAILURE";

export const SAVE_QUESTION = "[POLLS] SAVE QUESTION";
export const SAVE_QUESTION_SUCCESS = "[POLLS] SAVE QUESTION SUCCESS";
export const SAVE_QUESTION_FAILURE = "[POLLS] SAVE QUESTION FAILURE";

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

export const saveQuestion = data => dispatch => {
  dispatch(updateUserQuestion(data));
  dispatch({
    [CALL_API]: {
      types: [SAVE_QUESTION, SAVE_QUESTION_SUCCESS, SAVE_QUESTION_FAILURE],
      endpoint: API.saveQuestion(),
      method: "POST",
      params: data,
      schema: Schemas.questionsList
    }
  });
  dispatch(showMessage({ message: "Question Updated" }));
};

export const updateQuestion = data => dispatch => {
  dispatch(updateUserAnswer(data));
  dispatch({
    [CALL_API]: {
      types: [
        UPDATE_QUESTION,
        UPDATE_QUESTION_SUCCESS,
        UPDATE_QUESTION_FAILURE
      ],
      endpoint: API.fetchQuestions(),
      method: "GET",
      params: data,
      schema: Schemas.questionsList
    }
  });
  dispatch(showMessage({ message: "Question Updated" }));
};
