import { updateUserAnswer, updateUserQuestion } from "app/auth/store/actions";
import { CALL_API } from "app/middleware/api";
import { showMessage } from "app/store/actions/fuse";
import { API, Schemas } from "app/utils";

export const GET_QUESTION = "[POLLS] GET QUESTION";

export const UPDATE_QUESTION = "[POLLS] UPDATE QUESTION";
export const UPDATE_QUESTION_SUCCESS = "[POLLS] UPDATE QUESTION SUCCESS";
export const UPDATE_QUESTION_FAILURE = "[POLLS] UPDATE QUESTION FAILURE";

export const STORE_QUESTION = "[POLLS] STORE QUESTION";
export const STORE_QUESTION_SUCCESS = "[POLLS] STORE QUESTION SUCCESS";
export const STORE_QUESTION_FAILURE = "[POLLS] STORE QUESTION FAILURE";

export function getQuestion(params) {
  const request = API.getQuestion(params);

  return dispatch =>
    request.then(response => {
      dispatch({
        type: GET_QUESTION,
        payload: response.data
      });
    });
}

export const storeQuestion = data => (dispatch, getState) => {
  const author = getState().auth.user.id;

  const updatedData = Object.assign({}, data, { author: author });

  return dispatch({
    [CALL_API]: {
      types: [STORE_QUESTION, STORE_QUESTION_SUCCESS, STORE_QUESTION_FAILURE],
      endpoint: API.storeQuestion(),
      method: "POST",
      data: updatedData,
      schema: Schemas.questionsList
    }
  })
    .then(response => {
      return dispatch(
        updateUserQuestion({
          id: response.payload.id,
          author: response.payload.author.id
        })
      );
    })
    .then(() => {
      return dispatch(showMessage({ message: "Question Added" }));
    });
};

export const updateQuestion = data => dispatch => {
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
  })
    .then(() => dispatch(updateUserAnswer(data)))
    .then(() => {
      return dispatch(showMessage({ message: "Question Updated" }));
    });
};
