import axios from "axios/index";
import { showMessage } from "store/actions/fuse";

export const GET_QUESTION = "[POLLS] GET QUESTION";
export const SAVE_QUESTION = "[POLLS] SAVE QUESTION";
export const UPDATE_QUESTION = "[POLLS] UPDATE QUESTION";


export function getQuestion(params) {
  const request = axios.get("/api/questions", { params });
  console.log("getQuestion params: ", params);
  return dispatch =>
    request.then(response => {
      console.log("getQuestion payload: ", response.data.question);
      dispatch({
        type: GET_QUESTION,
        payload: response.data.question
      });
    });
}

export function saveQuestion(data) {
  const request = axios.post("/api/question/save", data);

  return dispatch =>
    request.then(response => {
      dispatch(showMessage({ message: "Question Saved" }));

      return dispatch({
        type: SAVE_QUESTION,
        payload: response.data
      });
    });
}

export function updateQuestion(data) {
  return (dispatch, getState) => {
    const { id } = getState().questions.question;
    const request = axios.post("/api/question/update", { id, ...data });

    request.then(response => {
      dispatch(showMessage({ message: "Question Updated" }));

      return dispatch({
        type: UPDATE_QUESTION,
        payload: response.data
      });
    });
  };
}
